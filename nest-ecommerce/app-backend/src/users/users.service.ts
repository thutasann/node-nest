import {
	Inject,
	Injectable,
	Logger,
	UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
	comparePassword,
	generateAuthToken,
	generateHashPassword,
} from 'src/shared/utils';
import { userTypes } from 'src/shared/schema/user.schema';
import { UserRespository } from 'src/shared/repositories/user.repository';
import { ConfigService } from '@nestjs/config';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class UsersService {
	private readonly _logger = new Logger(UsersService.name);

	constructor(
		@Inject(UserRespository) private readonly _userRepo: UserRespository,
		private readonly config: ConfigService,
		private readonly emailService: EmailService,
	) {}

	/** account create */
	async create(createUserDto: CreateUserDto) {
		try {
			createUserDto.password = await generateHashPassword(
				createUserDto.password,
			);

			// check is it for admin
			if (
				createUserDto.type === userTypes.ADMIN &&
				createUserDto.secretToken !==
					this.config.get<string>('adminSecretToken')
			) {
				throw new Error('Not allowed to create admin');
			} else if (createUserDto.type !== userTypes.CUSTOMER) {
				createUserDto.isVerified = true;
			}

			// check user is already existed
			const user = await this._userRepo.findOne({
				email: createUserDto.email,
			});

			if (user) throw new Error('User already exist!');

			const otp = Math.floor(Math.random() * 900000) + 100000;
			const otpExpiryTime = new Date();
			otpExpiryTime.setMinutes(otpExpiryTime.getMinutes() + 10);

			const newUser = await this._userRepo.create({
				...createUserDto,
				otp: otp.toString(),
				otpExpiryTime,
			});

			this._logger.log(`new user email -> ${newUser.email}`);

			if (newUser.type !== userTypes.ADMIN) {
				await this.emailService.sendEmail({
					email: newUser.email,
					subject: 'Activate your account!',
					template: './activation-mail',
					name: newUser.name,
					activationCode: otp.toString(),
				});
			}

			return {
				success: true,
				message:
					newUser.type === userTypes.ADMIN
						? 'Admin created successfully'
						: 'Please activate your account by verifying your email. We have sent you a wmail with the otp',
				result: { email: newUser.email },
			};
		} catch (error) {
			throw error;
		}
	}

	/** account login */
	async login(email: string, password: string) {
		try {
			const userExists = await this._userRepo.findOne({
				email,
			});

			if (!userExists) {
				throw new Error('User not found');
			}
			if (!userExists.isVerified) {
				throw new Error('Please verify your email');
			}
			const isPasswordMatch = await comparePassword(
				password,
				userExists.password,
			);
			if (!isPasswordMatch) {
				throw new UnauthorizedException('Please verify your email');
			}

			const token = generateAuthToken(userExists._id.toString());

			return {
				success: true,
				message: 'Login successful',
				result: {
					user: {
						name: userExists.name,
						email: userExists.email,
						type: userExists.type,
						id: userExists._id.toString(),
					},
					token,
				},
			};
		} catch (error) {
			throw error;
		}
	}

	/** verify email */
	async verifyEmail(otp: string, email: string) {
		try {
			const user = await this._userRepo.findOne({
				email,
			});
			if (!user) {
				throw new Error('User not found');
			}
			if (user.otp !== otp) {
				throw new Error('OTP Expired');
			}
			await this._userRepo.updateOne(
				{
					email,
				},
				{
					isVerified: true,
				},
			);
			return {
				success: true,
				message: 'Email verified successfully. you can login now',
			};
		} catch (error) {
			throw error;
		}
	}

	/** send otp email */
	async sendOtpEmail(email: string) {
		try {
			const user = await this._userRepo.findOne({
				email,
			});
			if (!user) {
				throw new Error('User not found');
			}
			if (user.isVerified) {
				throw new Error('Email already verified');
			}
			const otp = Math.floor(Math.random() * 900000) + 100000;

			const otpExpiryTime = new Date();
			otpExpiryTime.setMinutes(otpExpiryTime.getMinutes() + 10);

			await this._userRepo.updateOne(
				{
					email,
				},
				{
					otp,
					otpExpiryTime,
				},
			);

			await this.emailService.sendEmail({
				email: user.email,
				subject: 'Activate your account!',
				template: './activation-mail',
				name: user.name,
				activationCode: otp.toString(),
			});

			return {
				success: true,
				message: 'Otp sent successfully',
				result: { email: user.email },
			};
		} catch (error) {}
	}

	/** get users */
	async findAll(type: string) {
		try {
			const users = await this._userRepo.find({
				type,
			});
			return {
				success: true,
				result: users,
				message: 'Users fetched successfully',
			};
		} catch (error) {
			throw error;
		}
	}

	/** forgot password */
	async forgotPassword(email: string) {
		try {
			const user = await this._userRepo.findOne({ email });
			if (!user) {
				throw new Error('User not found');
			}
			let password = Math.random().toString(36).substring(2, 12);
			const tempPassword = password;
			password = await generateHashPassword(password);
			await this._userRepo.updateOne({ _id: user.id }, { password });

			// TODO: send email

			return {
				success: true,
				message: 'Password sent to your email',
				result: { email: user.email, password: tempPassword },
			};
		} catch (error) {
			throw error;
		}
	}

	/** update password or name */
	async updatePasswordOrName(
		id: string,
		updatePasswordOrNameDto: UpdateUserDto,
	) {
		try {
			const { oldPassword, newPassword, name } = updatePasswordOrNameDto;

			if (!name && !newPassword) {
				throw new Error('Please provide name or password');
			}

			const user = await this._userRepo.findOne({
				_id: id,
			});

			if (!user) {
				throw new Error('User not found');
			}

			if (newPassword) {
				const isPasswordMatch = await comparePassword(
					oldPassword,
					user.password,
				);
				if (!isPasswordMatch) {
					throw new Error('Invalid correct password!');
				}

				const password = await generateHashPassword(newPassword);

				await this._userRepo.updateOne(
					{
						_id: id,
					},
					{ password },
				);
			}

			if (name) {
				await this._userRepo.updateOne(
					{
						_id: id,
					},
					{ name },
				);
			}

			return {
				success: true,
				message: 'User updated successfully',
				result: {
					name: user.name,
					email: user.email,
					type: user.type,
					id: user._id.toString(),
				},
			};
		} catch (error) {
			throw error;
		}
	}

	/** delete user */
	async deleteUser(_id: string) {
		await this._userRepo.deleteUser(_id);
		return {
			success: true,
			message: 'Removed user successfully',
		};
	}
}

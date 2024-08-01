import { Inject, Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { generateHashPassword } from 'src/shared/utils';
import { userTypes } from 'src/shared/schema/user.schema';
import { UserRespository } from 'src/shared/repositories/user.repository';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
	private readonly _logger = new Logger(UsersService.name);

	constructor(
		@Inject(UserRespository) private readonly _userRepo: UserRespository,
		private readonly config: ConfigService,
	) {}

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
				otp,
				otpExpiryTime,
			});

			console.log('newUser', newUser);

			if (newUser.type !== userTypes.ADMIN) {
				// TODO: send email
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

	findAll() {
		return `This action returns all users`;
	}

	findOne(id: number) {
		return `This action returns a #${id} user`;
	}

	update(id: number, updateUserDto: UpdateUserDto) {
		return `This action updates a #${id} user`;
	}

	remove(id: number) {
		return `This action removes a #${id} user`;
	}
}

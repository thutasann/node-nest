import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService, JwtVerifyOptions } from '@nestjs/jwt';
import {
	ActivationDto,
	ForgotPasswordDto,
	LoginDto,
	RegisterDto,
	ResetPasswordDto,
} from './core/dto/user.dto';
import { type Response } from 'express';
import { PrismaService } from '../../../prisma/prisma.service';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { UserData } from './core/types/global.types';
import { EmailService } from './email/email.service';
import { TokenSender } from './core/utils/send-token';
import {
	ForgotPasswordResponse,
	ResetPasswordResponse,
} from './core/types/user.type';

@Injectable()
export class UsersService {
	private readonly logger = new Logger(UsersService.name);

	constructor(
		private readonly jwtService: JwtService,
		private readonly prisma: PrismaService,
		private readonly emailService: EmailService,
		private readonly confgiService: ConfigService,
	) {}

	/** user register */
	async register(registerDto: RegisterDto, response: Response) {
		const { name, email, password, phone_number } = registerDto;

		const isEmailExists = await this.prisma.user.findFirst({
			where: {
				email,
			},
		});

		if (isEmailExists) {
			throw new BadRequestException('Users already exist with this email!');
		}

		const isPhoneNumberExist = await this.prisma.user.findUnique({
			where: {
				phone_number,
			},
		});

		if (isPhoneNumberExist) {
			throw new BadRequestException(
				'Users already exist with this phone number!',
			);
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const user = {
			name,
			email,
			password: hashedPassword,
			phone_number,
		};

		const activationToken = await this.createActivationToken(user);
		const activation_token = activationToken.token;
		const activationCode = activationToken.activationCode;

		await this.emailService.sendEmail({
			email,
			subject: 'Activate your account!',
			template: './activation-mail',
			name,
			activationCode,
		});

		return { activation_token, response };
	}

	/** user login */
	async login(loginDto: LoginDto) {
		const { email, password } = loginDto;

		const user = await this.prisma.user.findUnique({
			where: {
				email,
			},
		});

		if (user && (await this.comparePassword(password, user.password))) {
			const tokenSender = new TokenSender(this.confgiService, this.jwtService);
			return tokenSender.sendToken(user);
		} else {
			return {
				user: null,
				accessToken: null,
				refreshToken: null,
				error: {
					message: 'Invalid email or password',
				},
			};
		}
	}

	/** get users */
	async getUsers(): Promise<User[]> {
		return this.prisma.user.findMany();
	}

	/** activation user */
	async activateUser(activationDto: ActivationDto, response: Response) {
		const { activationToken, activationCode } = activationDto;

		const newUser: { user: UserData; activationCode: string } =
			this.jwtService.verify(activationToken, {
				secret: this.confgiService.get<string>('ACTIVATION_SECRET'),
			} as JwtVerifyOptions) as { user: UserData; activationCode: string };

		if (newUser.activationCode !== activationCode) {
			throw new BadRequestException('Invalid activation code');
		}

		const { name, email, password, phone_number } = newUser.user;

		const existUser = await this.prisma.user.findUnique({
			where: {
				email,
			},
		});

		if (existUser) {
			throw new BadRequestException('User already exist with this email');
		}

		const user = await this.prisma.user.create({
			data: {
				name,
				email,
				password,
				phone_number,
			},
		});

		return {
			user,
			response,
		};
	}

	/** get loggedin user */
	async getLoggedInUser(req: any) {
		const user = req.user as User;
		const refreshToken = req.refreshtoken as string;
		const accessToken = req.accesstoken as string;
		this.logger.log({ user, refreshToken, accessToken });
		return { user, refreshToken, accessToken };
	}

	/** forgot password */
	async forgotPassword(
		forgotPasswordDto: ForgotPasswordDto,
	): Promise<ForgotPasswordResponse> {
		const { email } = forgotPasswordDto;
		const user = await this.prisma.user.findUnique({
			where: {
				email,
			},
		});

		if (!user) {
			throw new BadRequestException('User not found with this email!');
		}

		const forgotPasswordToken = await this.generateForgotPasswordLink(user);

		const resetPasswordUrl =
			this.confgiService.get<string>('CLIENT_SIDE_URI') +
			`/reset-password?verify=${forgotPasswordToken}`;

		await this.emailService.sendEmail({
			email,
			subject: 'Reset your Password!',
			template: './forgot-password',
			name: user.name,
			activationCode: resetPasswordUrl,
		});

		return { message: `Your forgot password request succesful!` };
	}

	/** reset password */
	async resetPassword(
		resetPasswordDto: ResetPasswordDto,
	): Promise<ResetPasswordResponse> {
		const { password, activationToken } = resetPasswordDto;

		const decoded = this.jwtService.decode(activationToken);
		console.log('decoded exp ->', decoded.exp);

		if (!decoded || decoded?.exp * 1000 < Date.now()) {
			throw new BadRequestException('Invalid token!');
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const user = await this.prisma.user.update({
			where: {
				id: decoded.user.id,
			},
			data: {
				password: hashedPassword,
			},
		});

		return { user };
	}

	/** logout user */
	async logout(req: any) {
		req.user = null;
		req.refreshtoken = null;
		req.accesstoken = null;
		return { message: 'Logged out succesfully!' };
	}

	/**  generate forgot password link */
	private async generateForgotPasswordLink(user: User): Promise<string> {
		const forgotPasswordToken = this.jwtService.sign(
			{
				user,
			},
			{
				secret: this.confgiService.get<string>('FORGOT_PASSWORD_SECRET'),
				expiresIn: '5m',
			},
		);
		return forgotPasswordToken;
	}

	/** create activation token */
	private async createActivationToken(user: UserData) {
		const activationCode = Math.floor(1000 + Math.random() * 9000).toString();

		const token = this.jwtService.sign(
			{
				user,
				activationCode,
			},
			{
				secret: this.confgiService.get<string>('ACTIVATION_SECRET'),
				expiresIn: '5m',
			},
		);

		return { token, activationCode };
	}

	/** compare with hash password */
	private async comparePassword(
		password: string,
		hashedPassword: string,
	): Promise<boolean> {
		return await bcrypt.compare(password, hashedPassword);
	}
}

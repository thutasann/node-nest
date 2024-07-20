import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService, JwtVerifyOptions } from '@nestjs/jwt';
import { ActivationDto, LoginDto, RegisterDto } from './dto/user.dto';
import { type Response } from 'express';
import { PrismaService } from '../../../prisma/prisma.service';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { UserData } from './types/global.types';
import { EmailService } from './email/email.service';

@Injectable()
export class UsersService {
	private readonly logger = new Logger(UsersService.name);

	constructor(
		private readonly jwtService: JwtService,
		private readonly prisma: PrismaService,
		private readonly emailService: EmailService,
		private readonly confgiService: ConfigService,
	) {}

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

	async login(loginDto: LoginDto) {
		const { email, password } = loginDto;
		const user = { email, password };
		return user;
	}

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
}

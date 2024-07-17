import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { LoginDto, RegisterDto } from './dto/user.dto';
import { type Response } from 'express';
import { PrismaService } from '../../../prisma/prisma.service';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { IUserData } from './dto/user.interface';

@Injectable()
export class UsersService {
	private readonly logger = new Logger(UsersService.name);

	constructor(
		private readonly jwtService: JwtService,
		private readonly prisma: PrismaService,
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
		const activationCOde = activationToken.activationCode;

		this.logger.log('activationCOde', activationCOde);

		// await this.prisma.user.create({
		// 	data: {
		// 		name,
		// 		email,
		// 		password: hashedPassword,
		// 		phone_number,
		// 	},
		// });

		return { user, response };
	}

	async login(loginDto: LoginDto) {
		const { email, password } = loginDto;
		const user = { email, password };
		return user;
	}

	async getUsers(): Promise<User[]> {
		return this.prisma.user.findMany();
	}

	/** create activation token */
	private async createActivationToken(user: IUserData) {
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

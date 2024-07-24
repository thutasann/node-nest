import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { EmailService } from './email/email.service';
import { IRestaurant, RegisterDto } from './core/dto/restaurant.dto';
import * as bcrypt from 'bcrypt';
import type { Response } from 'express';

@Injectable()
export class RestaurantsService {
	constructor(
		private readonly jwtService: JwtService,
		private readonly prisma: PrismaService,
		private readonly configService: ConfigService,
		private readonly emailService: EmailService,
	) {}

	/** register restaurant */
	async registerRestaurant(registerDto: RegisterDto, response: Response) {
		const { name, country, city, address, email, phone_number, password } =
			registerDto as IRestaurant;

		const isEmailExist = await this.prisma.restaurant.findUnique({
			where: {
				email,
			},
		});

		if (isEmailExist) {
			throw new BadRequestException(
				'Restaurant already exist with this email ',
			);
		}

		const usersWithPhoneNumber = await this.prisma.restaurant.findUnique({
			where: {
				phone_number,
			},
		});

		if (usersWithPhoneNumber) {
			throw new BadRequestException(
				'Restaurant already exist with this phone number!',
			);
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const restaurant: IRestaurant = {
			name,
			country,
			city,
			address,
			email,
			phone_number,
			password: hashedPassword,
		};

		const activationToken = await this.createActivationToken(restaurant);
		const client_side_uri = this.configService.get<string>('CLIENT_SIDE_URI');
		const activation_token = `${client_side_uri}/activate-account/${activationToken}`;

		await this.emailService.sendMail({
			email,
			subject: 'Activate your restaurant account!',
			template: './restaurant-activation-mail',
			name,
			activation_token,
		});

		return {
			message: 'Please check your email to activate your account',
			response,
		};
	}

	/** create activation token */
	private async createActivationToken(restaurant: IRestaurant) {
		const activationToken = this.jwtService.sign(
			{
				restaurant,
			},
			{
				secret: this.configService.get<string>('ACTIVATION_SECRET'),
				expiresIn: '5m',
			},
		);
		return activationToken;
	}
}

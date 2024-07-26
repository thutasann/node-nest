import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { JwtService, JwtVerifyOptions } from '@nestjs/jwt';
import { PrismaService } from '../../../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { EmailService } from './email/email.service';
import {
	ActivationDto,
	IRestaurant,
	LoginDto,
	RegisterDto,
} from './core/dto/restaurant.dto';
import * as bcrypt from 'bcrypt';
import type { Response } from 'express';
import { TokenSender } from './core/utils/send-token';

@Injectable()
export class RestaurantsService {
	private readonly logger = new Logger(RestaurantsService.name);

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
		this.logger.log(`activationToken : ${activationToken}`);

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

	/** activate restaurant */
	async activateRestaurant(activateDto: ActivationDto, resposne: Response) {
		const { activationToken } = activateDto;

		const newRestaurant: {
			exp: number;
			restaurant: IRestaurant;
			activationToken: string;
		} = this.jwtService.verify(activationToken, {
			secret: this.configService.get<string>('ACTIVATION_SECRET'),
		} as JwtVerifyOptions);

		if (newRestaurant?.exp * 1000 < Date.now()) {
			throw new BadRequestException('Invalid activation code');
		}

		const { name, country, city, phone_number, password, email, address } =
			newRestaurant.restaurant;

		const exitRestaurant = await this.prisma.restaurant.findUnique({
			where: {
				email,
			},
		});

		if (exitRestaurant) {
			throw new BadRequestException(
				'Restaurant already exist with this email!',
			);
		}

		const restaurant = await this.prisma.restaurant.create({
			data: {
				name,
				email,
				address,
				country,
				city,
				phone_number,
				password,
			},
		});

		return {
			restaurant,
			resposne,
		};
	}

	/** login restaurant */
	async loginRestaurant(loginDto: LoginDto) {
		const { email, password } = loginDto;

		const restaurant = await this.prisma.restaurant.findUnique({
			where: {
				email,
			},
		});

		if (
			restaurant &&
			(await this.comparePassword(password, restaurant.password))
		) {
			const tokenSender = new TokenSender(this.configService, this.jwtService);
			return tokenSender.sendToken(restaurant);
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

	/** logout restaurant */
	async logout(req: any) {
		req.restaurant = null;
		req.refreshtoken = null;
		req.accesstoken = null;
		return { message: 'Logged out successfully!' };
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

	/** compare password */
	private async comparePassword(
		password: string,
		hashedPassword: string,
	): Promise<boolean> {
		return await bcrypt.compare(password, hashedPassword);
	}
}

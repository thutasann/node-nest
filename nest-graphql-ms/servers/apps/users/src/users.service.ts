import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { LoginDto, RegisterDto } from './dto/user.dto';
import { type Response } from 'express';
import { PrismaService } from '../../../prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
	constructor(
		private readonly jwtService: JwtService,
		private readonly prisma: PrismaService,
		private readonly confgiService: ConfigService,
	) {}

	async register(registerDto: RegisterDto, response: Response) {
		const { name, email, password } = registerDto;

		const isEmailExists = await this.prisma.user.findFirst({
			where: {
				email,
			},
		});

		if (isEmailExists) {
			throw new BadRequestException('Users already exist with this email!');
		}

		const user = await this.prisma.user.create({
			data: {
				name,
				email,
				password,
			},
		});

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
}

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { LoginDto, RegisterDto } from './dto/user.dto';
import type { Response } from 'express';

@Injectable()
export class UsersService {
	constructor(
		private readonly jwtService: JwtService,
		private readonly confgiService: ConfigService,
	) {}

	async register(registerDto: RegisterDto, reponse?: Response) {
		const { name, email, password } = registerDto;
		const user = { name, email, password };
		return user;
	}

	async login(loginDto: LoginDto) {
		const { email, password } = loginDto;
		const user = { email, password };
		return user;
	}

	async getUsers() {
		const users = [
			{
				id: '123',
				name: 'test',
				email: 'test@gmail.com',
				password: '****',
			},
		];
		return users;
	}
}

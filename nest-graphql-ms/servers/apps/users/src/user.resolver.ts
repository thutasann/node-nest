import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { RegisterResponse } from './types/user.type';
import { RegisterDto } from './dto/user.dto';
import type { Response } from 'express';
import { BadRequestException, Logger } from '@nestjs/common';
import { User } from './entities/user.entity';

@Resolver('User')
export class UserResolver {
	private readonly logger = new Logger(UserResolver.name);

	constructor(private readonly userService: UsersService) {}

	@Mutation(() => RegisterResponse)
	async register(
		@Args('registerInput') registerDto: RegisterDto,
		@Context() context: { res: Response },
	): Promise<RegisterResponse> {
		if (!registerDto.name || !registerDto.email || !registerDto.password) {
			throw new BadRequestException('Invalid Request');
		}

		const res = await this.userService.register(registerDto, context.res);
		this.logger.debug(`register user : ${res.user}`);
		return { user: res.user };
	}

	@Query(() => [User])
	async getUsers() {
		return this.userService.getUsers();
	}
}

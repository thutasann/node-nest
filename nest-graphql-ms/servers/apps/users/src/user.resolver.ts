import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UsersService } from './users.service';
import {
	ActivationResponse,
	ForgotPasswordResponse,
	LoginResponse,
	LogoutResponse,
	RegisterResponse,
	ResetPasswordResponse,
} from './core/types/user.type';
import {
	ActivationDto,
	ForgotPasswordDto,
	RegisterDto,
	ResetPasswordDto,
} from './core/dto/user.dto';
import type { Response } from 'express';
import { BadRequestException, Logger, UseGuards } from '@nestjs/common';
import { User } from './core/entities/user.entity';
import { AuthGuard } from './core/guards/auth.guard';

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

		const { activation_token } = await this.userService.register(
			registerDto,
			context.res,
		);
		this.logger.debug(`activation_token  : ${activation_token}`);
		return { activation_token };
	}

	@Mutation(() => ActivationResponse)
	async activateUser(
		@Args('activationInput') activationDto: ActivationDto,
		@Context() context: { res: Response },
	): Promise<ActivationResponse> {
		return await this.userService.activateUser(activationDto, context.res);
	}

	@Query(() => LoginResponse)
	@UseGuards(AuthGuard)
	async getLoggedInUser(@Context() context: { req: Request }) {
		return await this.userService.getLoggedInUser(context.req);
	}

	@Mutation(() => LoginResponse)
	async Login(
		@Args('email') email: string,
		@Args('password') password: string,
	): Promise<LoginResponse> {
		console.log('email', email);
		return await this.userService.login({ email, password });
	}

	@Mutation(() => ForgotPasswordResponse)
	async forgotPassword(
		@Args('forgotPasswordDto') forgotPasswordDto: ForgotPasswordDto,
	): Promise<ForgotPasswordResponse> {
		return await this.userService.forgotPassword(forgotPasswordDto);
	}

	@Mutation(() => LogoutResponse)
	async logoutUser(@Context() context: { req: Request }) {
		return await this.userService.logout(context.req);
	}

	@Mutation(() => ResetPasswordResponse)
	async resetPassword(
		@Args('resetPasswordDto') resetPasswordDto: ResetPasswordDto,
	): Promise<ResetPasswordResponse> {
		return await this.userService.resetPassword(resetPasswordDto);
	}

	@Query(() => [User])
	async getUsers() {
		return this.userService.getUsers();
	}
}

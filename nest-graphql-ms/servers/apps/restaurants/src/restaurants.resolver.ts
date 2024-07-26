import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { RestaurantsService } from './restaurants.service';
import {
	ActivationResponse,
	LoginResponse,
	LogoutResposne,
	RegisterResponse,
} from './core/types/restaurant.type';
import { ActivationDto, RegisterDto } from './core/dto/restaurant.dto';
import type { Response, Request } from 'express';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from './core/guards/auth.guard';

@Resolver('Restaurant')
export class RestaurantResolver {
	constructor(private readonly restaurantService: RestaurantsService) {}

	@Mutation(() => RegisterResponse)
	async registerRestaurant(
		@Args('registerDto') registerDto: RegisterDto,
		@Context() context: { res: Response },
	): Promise<RegisterResponse> {
		const { message } = await this.restaurantService.registerRestaurant(
			registerDto,
			context.res,
		);
		return { message };
	}

	@Mutation(() => ActivationResponse)
	async activateRestaurant(
		@Args('activationDto') activationDto: ActivationDto,
		@Context() context: { res: Response },
	): Promise<ActivationResponse> {
		return this.restaurantService.activateRestaurant(
			activationDto,
			context.res,
		);
	}

	@Mutation(() => LoginResponse)
	async loginRestaurant(
		@Args('email') email: string,
		@Args('password') password: string,
	): Promise<LoginResponse> {
		return await this.restaurantService.loginRestaurant({ email, password });
	}

	@Query(() => LogoutResposne)
	@UseGuards(AuthGuard)
	async logoutRestaurant(@Context() context: { req: Request }) {
		return await this.restaurantService.logout(context.req);
	}
}

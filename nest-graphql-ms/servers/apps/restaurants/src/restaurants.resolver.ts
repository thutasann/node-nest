import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { RestaurantsService } from './restaurants.service';
import { RegisterResponse } from './core/types/restaurant.type';
import { RegisterDto } from './core/dto/restaurant.dto';
import type { Response, Request } from 'express';

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
}

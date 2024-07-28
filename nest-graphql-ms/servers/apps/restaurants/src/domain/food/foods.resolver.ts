import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { FoodsService } from './foods.service';
import type { Request, Response } from 'express';
import { CreateFoodResponse } from '../../core/types/foods.type';
import { CreateFoodDto } from '../../core/dto/foods.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../core/guards/auth.guard';

@Resolver('Foods')
export class FoodsResolver {
	constructor(private readonly foodsService: FoodsService) {}

	@Mutation(() => CreateFoodResponse)
	@UseGuards(AuthGuard)
	async createFood(
		@Context() context: { req: Request; res: Response },
		@Args('createFoodDto') createFoodDto: CreateFoodDto,
	) {
		return await this.foodsService.createFood(
			createFoodDto,
			context.req,
			context.res,
		);
	}
}

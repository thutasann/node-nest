import { Field, ObjectType } from '@nestjs/graphql';
import { ErrorType } from './restaurant.type';
import { Food } from '../entities/foods.entities';
import { Foods } from '@prisma/client';

@ObjectType()
export class CreateFoodResponse {
	@Field()
	message: string;

	@Field(() => ErrorType, { nullable: true })
	error?: ErrorType;
}

@ObjectType()
export class LoggedInRestaurantFoodResponse {
	@Field(() => [Food], { nullable: true })
	foods: Foods;

	@Field(() => ErrorType, { nullable: true })
	error?: ErrorType;
}

@ObjectType()
export class DeleteFoodResponse {
	@Field()
	message: string;

	@Field(() => ErrorType, { nullable: true })
	error?: ErrorType;
}

/**
 * Images Interface
 */
export interface IImages {
	public_id: string;
	url: string;
}

/**
 * Food interface
 */
export interface IFood {
	name: string;
	description: string;
	price: number;
	estimatedPrice: number;
	category: string;
	images: IImages[] | any;
}

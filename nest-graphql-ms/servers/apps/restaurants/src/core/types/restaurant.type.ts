import { ObjectType, Field } from '@nestjs/graphql';
import { Restaurant } from '../entities/restaurant.entities';
import { IRestaurant } from '../dto/restaurant.dto';

@ObjectType()
export class ErrorType {
	@Field()
	message: string;

	@Field({ nullable: true })
	code?: string;
}

@ObjectType()
export class RegisterResponse {
	@Field()
	message: string;

	@Field(() => ErrorType, { nullable: true })
	error?: ErrorType;
}

@ObjectType()
export class ActivationResponse {
	@Field(() => Restaurant)
	restaurant: Restaurant | unknown;

	@Field(() => ErrorType, { nullable: true })
	error?: ErrorType;
}

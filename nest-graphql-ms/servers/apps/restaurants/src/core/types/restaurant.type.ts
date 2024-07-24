import { ObjectType, Field } from '@nestjs/graphql';
import { Restaurant } from '../entities/restaurant.entities';

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

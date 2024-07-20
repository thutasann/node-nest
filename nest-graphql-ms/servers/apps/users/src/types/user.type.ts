import { ObjectType, Field } from '@nestjs/graphql';
import { User } from '../entities/user.entity';

/**
 * Error Type
 */
@ObjectType()
export class ErrorType {
	@Field()
	message: string;

	@Field({ nullable: true })
	code?: string;
}

/**
 * Register Response
 */
@ObjectType()
export class RegisterResponse {
	@Field()
	activation_token: string;

	@Field(() => ErrorType, { nullable: true })
	error?: ErrorType;
}

/**
 * Login Response
 */
@ObjectType()
export class LoginResponse {
	@Field(() => User)
	user: User;

	@Field(() => ErrorType, { nullable: true })
	error?: ErrorType;
}

/**
 * User Activation Response
 */
@ObjectType()
export class ActivationResponse {
	@Field(() => User)
	user: User | unknown;

	@Field(() => ErrorType, { nullable: true })
	error?: ErrorType;
}

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
	@Field(() => User, { nullable: true })
	user?: User | any;

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

import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

/**
 * Register Dto
 */
@InputType()
export class RegisterDto {
	@Field()
	@IsNotEmpty({ message: 'Name is Requried' })
	@IsString({ message: 'Name must need to be one string' })
	name: string;

	@Field()
	@IsNotEmpty({ message: 'Email is required' })
	@IsEmail({}, { message: 'Email is invalid' })
	email: string;

	@Field()
	@IsNotEmpty({ message: 'password is required' })
	@MinLength(8, { message: 'Password must be at least 8 characters' })
	password: string;
}

/**
 * Login Dto
 */
@InputType()
export class LoginDto {
	@Field()
	@IsNotEmpty({ message: 'Email is required' })
	@IsEmail({}, { message: 'Email is invalid' })
	email: string;

	@Field()
	@IsNotEmpty({ message: 'password is required' })
	@MinLength(8, { message: 'Password must be at least 8 characters' })
	password: string;
}

import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsEmail, IsDefined } from 'class-validator';

/**
 * Create user Dto
 */
export class CreateUserDto {
	@ApiProperty({
		description: 'email',
		example: 'test@gmail.com',
		required: true,
	})
	@IsDefined()
	@IsEmail()
	email: string;

	@ApiProperty({
		description: 'username',
		example: 'Dev',
		required: true,
	})
	@IsDefined()
	@IsString()
	username: string;
}

/**
 * Create User Response Dto
 */
export class CreateUserResponseDto {
	@ApiResponseProperty({
		example: 'da9b9f51-23b8-4642-97f7-52537b3cf53b',
		format: 'v4',
	})
	public id: string;

	@ApiResponseProperty({
		example: 'user@gmail.com',
	})
	public email: string;

	@ApiResponseProperty({
		example: 'user',
	})
	public username: string;
}

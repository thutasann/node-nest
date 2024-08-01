import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { userTypes } from 'src/shared/schema/user.schema';

/** Create User Dto */
export class CreateUserDto {
	@IsNotEmpty()
	@IsString()
	@ApiProperty({
		description: 'name',
		example: 'johndoe',
		required: true,
	})
	name: string;

	@IsNotEmpty()
	@IsString()
	@ApiProperty({
		description: 'email',
		example: 'johndoe@gmail.com',
		required: true,
	})
	email: string;

	@IsNotEmpty()
	@IsString()
	@ApiProperty({
		description: 'password',
		example: 'test@123',
		required: true,
	})
	password: string;

	@IsNotEmpty()
	@IsString()
	@IsIn([userTypes.ADMIN, userTypes.CUSTOMER])
	@ApiProperty({
		description: 'type',
		example: 'customer',
		required: true,
	})
	type: string;

	@IsString()
	@IsOptional()
	secretToken?: string;

	isVerified?: boolean;
}

export class LoginUserDto {
	@IsNotEmpty()
	@IsString()
	@ApiProperty({
		description: 'email',
		example: 'johndoe@gmail.com',
		required: true,
	})
	email: string;

	@IsNotEmpty()
	@IsString()
	@ApiProperty({
		description: 'email',
		example: 'test@123',
		required: true,
	})
	password: string;
}

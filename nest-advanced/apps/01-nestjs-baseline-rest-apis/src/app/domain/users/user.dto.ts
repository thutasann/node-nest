import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';
import {
	IsString,
	IsEmail,
	IsDefined,
	IsOptional,
	IsArray,
	ArrayMinSize,
	ValidateNested,
} from 'class-validator';
import { Transform, Type as ValidateType } from 'class-transformer';

/**
 * API Query Dto for User controller
 */
export class UserQueryDto {
	@ApiProperty({
		description: 'email',
		example: 'test@gmail.com',
		required: true,
	})
	@IsDefined()
	@IsEmail()
	email: string;

	@ApiProperty({
		description: 'pass ids comma separated',
		example: '1,2,3,4,5,6',
		required: true,
	})
	@IsOptional()
	@Transform(({ value }: any) =>
		typeof value === 'string' ? value.split(',') : value,
	)
	@IsString({ each: true })
	ids: string[];
}

/**
 * Address Info Dto
 */
export class AddressInfoDto {
	@ApiProperty({
		description: 'city',
		example: 'Singapore',
		required: true,
	})
	@IsString()
	city: string;

	@ApiProperty({
		description: 'state',
		example: 'Yishun',
		required: true,
	})
	@IsString()
	state: string;
}

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

	@ApiProperty({
		description: 'address',
		example: [
			{
				city: 'Singapore',
				state: 'Yishun',
			},
		],
		required: false,
	})
	@IsOptional()
	@IsArray()
	@ArrayMinSize(1)
	@ValidateNested()
	@ValidateType(() => AddressInfoDto)
	address: AddressInfoDto[];
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

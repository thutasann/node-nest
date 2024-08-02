import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { IsString } from 'class-validator';

/**
 * Update User Dto
 */
export class UpdateUserDto extends PartialType(CreateUserDto) {
	@IsString()
	@ApiProperty({
		description: 'name',
		example: 'johndoe',
	})
	name?: string;

	@IsString()
	@ApiProperty({
		description: 'old password',
		example: 'test@123',
	})
	oldPassword?: string;

	@IsString()
	@ApiProperty({
		description: 'new password',
		example: 'new@123',
	})
	newPassword?: string;
}

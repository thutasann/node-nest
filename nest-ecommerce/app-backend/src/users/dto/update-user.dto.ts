import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

/**
 * Update User Dto
 */
export class UpdateUserDto extends PartialType(CreateUserDto) {
	name?: string;

	oldPassword?: string;

	newPassword?: string;
}

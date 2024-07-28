import { ApiProperty } from '@nestjs/swagger';

/** User Events Enum */
export enum UserEvents {
	created = 'user.creted',
}

/** Create User Request Dto */
export class CreateUserRequest {
	@ApiProperty({ example: 'john@gmail.com' })
	email: string;

	@ApiProperty({ example: 'test123' })
	password: string;
}

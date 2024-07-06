import type { Request } from 'express';
import {
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Req,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
import {
	ApiTags,
	ApiBearerAuth,
	ApiOkResponse,
	ApiOperation,
	ApiConsumes,
} from '@nestjs/swagger';
import { UserService } from './user.service';
import { UsersEntity } from './user.entity';
import { CreateUserResponseDto } from './user.dto';

@ApiTags('users')
@Controller('users')
@ApiBearerAuth('authorization')
@UsePipes(
	new ValidationPipe({
		whitelist: true,
		transform: true,
	}),
)
export class UserController {
	constructor(private readonly userService: UserService) {}

	@HttpCode(HttpStatus.OK)
	@ApiOkResponse({
		type: [CreateUserResponseDto],
		description: 'user fetched successfully',
	})
	@ApiOperation({ description: 'user fetch api' })
	@ApiConsumes('application/json')
	@Get()
	async findAll(): Promise<UsersEntity[]> {
		return await this.userService.fetchUsers();
	}
}

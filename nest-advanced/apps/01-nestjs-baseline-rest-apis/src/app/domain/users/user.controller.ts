import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Post,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
import {
	ApiTags,
	ApiBearerAuth,
	ApiOkResponse,
	ApiOperation,
	ApiConsumes,
	ApiCreatedResponse,
} from '@nestjs/swagger';
import { UserService } from './user.service';
import { UsersEntity } from './user.entity';
import { CreateUserDto, CreateUserResponseDto } from './user.dto';

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

	@HttpCode(HttpStatus.CREATED)
	@ApiCreatedResponse({
		type: CreateUserResponseDto,
		description: 'user created successfully',
	})
	@ApiOperation({ description: 'user create api' })
	@ApiConsumes('application/json')
	@Post()
	async create(@Body() body: CreateUserDto): Promise<UsersEntity> {
		return await this.userService.createUser(body);
	}
}

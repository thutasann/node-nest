import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Logger,
	Post,
	Query,
	UseGuards,
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
import { CreateUserDto, CreateUserResponseDto, UserQueryDto } from './user.dto';
import { AuthGuard } from 'src/app/core/guard/api-guard';
import { RoleAllowed } from 'src/app/core/decorators/role-allowed';
import { User } from 'src/app/core/decorators/user';

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
	private readonly logger = new Logger(UserController.name);

	constructor(private readonly userService: UserService) {}

	@UseGuards(AuthGuard)
	@RoleAllowed('admin', 'user')
	@HttpCode(HttpStatus.OK)
	@ApiOkResponse({
		type: [CreateUserResponseDto],
		description: 'user fetched successfully',
	})
	@ApiOperation({ description: 'user fetch api' })
	@ApiConsumes('application/json')
	@Get()
	async findAll(
		@User() user: any,
		@Query() query: UserQueryDto,
	): Promise<UsersEntity[]> {
		this.logger.log(`query : ${query.email}`);
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

import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	HttpCode,
	HttpStatus,
	Res,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, LoginUserDto } from './dto/create-user.dto';
import type { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Post()
	create(@Body() createUserDto: CreateUserDto) {
		return this.usersService.create(createUserDto);
	}

	@Post('/login')
	@HttpCode(HttpStatus.OK)
	async login(
		@Body() loginUser: LoginUserDto,
		@Res({ passthrough: true }) response: Response,
	) {
		const loginRes = await this.usersService.login(
			loginUser.email,
			loginUser.password,
		);
		if (loginRes.success) {
			response.cookie('_digi_auth_token', loginRes.result?.token, {
				httpOnly: true,
			});
		}
		delete loginRes.result?.token;
		return loginRes;
	}
}

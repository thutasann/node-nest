import {
	Controller,
	Get,
	Post,
	Body,
	HttpCode,
	HttpStatus,
	Res,
	Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import {
	CreateUserDto,
	LoginUserDto,
	VerifyUserDto,
} from './dto/create-user.dto';
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

	@Get()
	// TODO: Roles Guard
	async getUsers(@Query('type') type: string) {
		return this.usersService.findAll(type);
	}

	@Post('/verify-email')
	@HttpCode(HttpStatus.OK)
	async verifyEmail(@Body() payload: VerifyUserDto) {
		const { otp, email } = payload;
		return this.usersService.verifyEmail(otp, email);
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

	@Post('/logout')
	async logout(@Res() res: Response) {
		res.clearCookie('_digi_auth_token');
		return res.status(HttpStatus.OK).json({
			success: true,
			message: 'Logout Successfully',
		});
	}
}

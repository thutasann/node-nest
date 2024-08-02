import {
	Controller,
	Get,
	Post,
	Body,
	HttpCode,
	HttpStatus,
	Res,
	Query,
	Param,
} from '@nestjs/common';
import { UsersService } from './users.service';
import {
	CreateUserDto,
	LoginUserDto,
	VerifyUserDto,
} from './dto/create-user.dto';
import type { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/core/decorators/role.decorators';
import { userTypes } from 'src/shared/schema/user.schema';

@Controller('users')
@ApiTags('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Post()
	create(@Body() createUserDto: CreateUserDto) {
		return this.usersService.create(createUserDto);
	}

	@Get()
	@Roles(userTypes.ADMIN)
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

	@Get('send-otp-email/:email')
	async sendOtpEmail(@Param('email') email: string) {
		return await this.usersService.sendOtpEmail(email);
	}

	@Get('forgot-password/:email')
	async forgotPassword(@Param('email') email: string) {
		return await this.usersService.forgotPassword(email);
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

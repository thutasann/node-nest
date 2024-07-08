import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from './user.entity';
import { Repository } from 'typeorm/repository/Repository';
import { CreateUserDto } from './user.dto';
import { ApiMockType } from './user.module';
import { AuthService } from '../auth/auth.service';
import { HTTP_CLIENT_TOKEN, HttpClientService } from '@dev/http';
import { privateDecrypt } from 'crypto';
import { MyLoggerService } from '@dev/logger';

@Injectable()
export class UserService {
	constructor(
		@Inject(HTTP_CLIENT_TOKEN)
		private readonly apiService: HttpClientService,
		private readonly logger: MyLoggerService,
		@Inject('TEST_API_TOKEN') private token: ApiMockType,
		@InjectRepository(UsersEntity) private usersRepo: Repository<UsersEntity>,
		@Inject(forwardRef(() => AuthService))
		private readonly auithService: AuthService,
	) {}

	async fetchUsers(): Promise<UsersEntity[]> {
		console.log('mock_token -> ', this.token.data);
		try {
			this.logger.log('handling fetch users with http client module');
			await this.apiService.fetch('get', {});
		} catch (error) {
			console.log('error fetch users :', error.message);
		}
		this.auithService.test();
		return await this.usersRepo.find({});
	}

	async createUser(body: CreateUserDto) {
		return await this.usersRepo.save(body);
	}
}

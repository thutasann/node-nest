import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from './user.entity';
import { Repository } from 'typeorm/repository/Repository';
import { CreateUserDto } from './user.dto';

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(UsersEntity) private usersRepo: Repository<UsersEntity>,
	) {}

	async fetchUsers(): Promise<UsersEntity[]> {
		return await this.usersRepo.find({});
	}

	async createUser(body: CreateUserDto) {
		return await this.usersRepo.save(body);
	}
}

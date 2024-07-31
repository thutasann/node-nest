import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserRespository } from 'src/shared/repositories/user.repository';

@Module({
	controllers: [UsersController],
	providers: [UsersService, UserRespository],
})
export class UsersModule {}

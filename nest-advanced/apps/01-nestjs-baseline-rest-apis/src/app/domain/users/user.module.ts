import { AppLoggerModule } from '@dev/logger';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from './user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

/**
 * User Module
 */
@Module({
	imports: [AppLoggerModule, TypeOrmModule.forFeature([UsersEntity])],
	controllers: [UserController],
	providers: [UserService],
	exports: [UserService],
})
export class UserModule {}

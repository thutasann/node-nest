import {
	MiddlewareConsumer,
	Module,
	NestModule,
	RequestMethod,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserRespository } from 'src/shared/repositories/user.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Users, UserSchema } from 'src/shared/schema/user.schema';
import { AuthMiddleware } from 'src/core/middleware/auth.middleware';
import { APP_GUARD } from '@nestjs/core';

@Module({
	imports: [
		MongooseModule.forFeature([
			{
				name: Users.name,
				schema: UserSchema,
			},
		]),
	],
	controllers: [UsersController],
	providers: [UsersService, UserRespository],
})
export class UsersModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(AuthMiddleware).forRoutes({
			path: '/users',
			method: RequestMethod.GET,
		});
	}
}

// TODO: RoleGuard

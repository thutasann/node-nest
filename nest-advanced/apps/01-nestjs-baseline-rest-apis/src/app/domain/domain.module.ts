import { DBModule } from '@dev/database';
import {
	MiddlewareConsumer,
	Module,
	NestModule,
	RequestMethod,
} from '@nestjs/common';
import { UsersEntity } from './users/user.entity';
import { UserModule } from './users/user.module';
import { LoggerMiddleware } from '../core/middleware/log.middleware';
import { AppLoggerMiddleware } from '../core/middleware/app-log.middleware';
import { UserController } from './users/user.controller';
import { RouteInfo } from '@nestjs/common/interfaces';
import { AuthMiddleware } from '../core/middleware/auth.middleware';

/** Global Prefix */
export const GLOBAL_PREFIX = '/api/v1';

/**
 * Domain Module 🚀
 */
@Module({
	imports: [
		UserModule,
		DBModule.forRoot({
			entities: [UsersEntity],
		}),
	],
	providers: [],
	controllers: [],
})
export class DomainModoule implements NestModule {
	public authRoutes: Array<RouteInfo> = [
		{
			path: '*',
			method: RequestMethod.ALL,
		},
	];

	public publicRoutes: Array<RouteInfo> = [
		{
			path: `${GLOBAL_PREFIX}/health`,
			method: RequestMethod.GET,
		},
	];

	configure(consumer: MiddlewareConsumer) {
		consumer
			.apply(AuthMiddleware)
			.exclude(...this.publicRoutes)
			.forRoutes(...this.authRoutes);

		consumer.apply(AppLoggerMiddleware).forRoutes(UserController);
	}
}

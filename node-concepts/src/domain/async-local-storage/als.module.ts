import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AsyncLocalStorage } from 'async_hooks';
import { ALSController } from './als.controller';
import { AlsMiddleware } from 'src/core/middleware/als.middleware';

/**
 * Async Local Storage Module
 */
@Module({
	providers: [
		{
			provide: AsyncLocalStorage,
			useValue: new AsyncLocalStorage(),
		},
	],
	controllers: [ALSController],
	exports: [AsyncLocalStorage],
})
export class ALSModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(AlsMiddleware).forRoutes('*');
	}
}

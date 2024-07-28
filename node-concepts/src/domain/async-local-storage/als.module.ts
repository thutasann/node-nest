import { Module } from '@nestjs/common';
import { AsyncLocalStorage } from 'async_hooks';
import { ALSController } from './als.controller';

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
export class ALSModule {}

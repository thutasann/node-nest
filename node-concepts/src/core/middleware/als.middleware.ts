import { Injectable, NestMiddleware } from '@nestjs/common';
import { AsyncLocalStorage } from 'async_hooks';
import type { Request, Response, NextFunction } from 'express';

/** store type sample */
export type StoreProps = {
	correlationKey?: string | string[];
	authentication?: string | string[];
	userId?: string | string[];
};

/**
 * Async Local Storage Middleware
 */
@Injectable()
export class AlsMiddleware implements NestMiddleware {
	constructor(private readonly als: AsyncLocalStorage<StoreProps>) {}

	use(req: Request, res: Response, next: NextFunction) {
		console.log('req.headers', req.headers['x-correlation-key']);
		const store: StoreProps = {
			correlationKey: req.headers['x-correlation-key'],
			authentication: req.headers['Authentication'],
			userId: req.headers['x-user-id'],
		};

		this.als.run(store, () => {
			next();
		});
	}
}

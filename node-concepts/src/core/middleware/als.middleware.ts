import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
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
	private readonly logger = new Logger(AlsMiddleware.name);

	constructor(private readonly als: AsyncLocalStorage<StoreProps>) {}

	use(req: Request, res: Response, next: NextFunction) {
		this.logger.log(
			`req.headers - ${req.headers['x-correlation-key'] || 'correlationKey not found'}`,
		);
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

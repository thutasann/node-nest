import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import type { Request, Response, NextFunction } from 'express';

@Injectable()
export class ResponseTimeMiddleware implements NestMiddleware {
	private readonly logger = new Logger(ResponseTimeMiddleware.name);

	constructor() {
		this.use = this.use.bind(this);
	}

	use(req: Request, res: Response, next: NextFunction) {
		const start = Date.now();

		res.on('finish', () => {
			const end = Date.now();
			const responseTime = end - start;

			if (req.originalUrl.includes('/graphql')) {
				const graphqlQuery = req.body?.query;
				const operationName = req.body?.operationName || 'Unnamed Operation';

				if (operationName !== 'IntrospectionQuery') {
					this.logger.debug(
						`GraphQL ${operationName} [${res.statusCode}] - ${responseTime}ms\nQuery: ${graphqlQuery}`,
					);
				}
			} else {
				this.logger?.debug(
					`${req.method} ${req.originalUrl} [${res.statusCode}] - ${responseTime}ms`,
				);
			}
		});

		next();
	}
}

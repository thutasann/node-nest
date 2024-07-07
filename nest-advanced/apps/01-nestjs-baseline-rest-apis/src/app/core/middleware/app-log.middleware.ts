import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import type { Request, Response, NextFunction } from 'express';

/**
 * app logger middleware (for middleware testing purpose)
 */
@Injectable()
export class AppLoggerMiddleware implements NestMiddleware {
	private logger = new Logger(`HTTP`);

	use(req: Request, res: Response, next: NextFunction) {
		this.logger.log(
			`Logging HTTP request ${req.method} ${req.url} ${res.statusCode}`,
		);
		next();
	}
}

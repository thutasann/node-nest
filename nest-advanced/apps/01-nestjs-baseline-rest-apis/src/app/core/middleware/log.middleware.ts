import type { Request, Response, NextFunction } from 'express';
import { Injectable, Logger, NestMiddleware } from '@nestjs/common';

/**
 * Logger Middleware (for middleware testing purpose)
 */
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
	private logger = new Logger(`HTTP`);

	use(req: Request, res: Response, next: NextFunction) {
		this.logger.log('Request....');
		next();
	}
}

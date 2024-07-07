import {
	HttpException,
	HttpStatus,
	Injectable,
	NestMiddleware,
} from '@nestjs/common';
import type { Request, Response, NextFunction } from 'express';
import { MetadataAlreadyExistsError } from 'typeorm';

export const MISSING_AUTH_HEADER = 'Missing Authorization Header';

/**
 * Auth Middleware
 */
@Injectable()
export class AuthMiddleware implements NestMiddleware {
	constructor() {}

	use(req: Request, res: Response, next: NextFunction) {
		const tag = 'AuthMiddleware';
		console.log('tag', tag);
		const { authorization } = req.headers;
		console.log('authorization', authorization);
		if (!authorization) {
			throw new HttpException(
				{
					message: MISSING_AUTH_HEADER,
				},
				HttpStatus.BAD_REQUEST,
			);
		}
		next();
	}
}

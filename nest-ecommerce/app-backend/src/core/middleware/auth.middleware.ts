import {
	Inject,
	Injectable,
	Logger,
	NestMiddleware,
	UnauthorizedException,
} from '@nestjs/common';
import type { Response, Request, NextFunction } from 'express';
import { UserRespository } from 'src/shared/repositories/user.repository';
import { decodeAuthToken } from 'src/shared/utils';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
	private readonly _logger = new Logger(AuthMiddleware.name);

	constructor(
		@Inject(UserRespository) private readonly _userRepo: UserRespository,
	) {}

	async use(req: Request | any, res: Response, next: NextFunction) {
		try {
			this._logger.log(`cookies -> ${req.cookies._digi_auth_token}`);
			const token = req.cookies._digi_auth_token;
			if (!token) {
				throw new UnauthorizedException('Missing auth token');
			}
			const decodedData = decodeAuthToken(token) as { id: string };
			const user = await this._userRepo.findById(decodedData.id);
			if (!user) {
				throw new UnauthorizedException('Unauthorized');
			}
			user.password = undefined;
			req.user = user;
			next();
		} catch (error) {
			throw new UnauthorizedException(error.message);
		}
	}
}

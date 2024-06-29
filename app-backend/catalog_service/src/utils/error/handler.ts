import type { Request, Response, NextFunction } from 'express';

export const HandleErrorWithLogger = (
	error: Error,
	req: Request,
	res: Response,
	next: NextFunction,
) => {};

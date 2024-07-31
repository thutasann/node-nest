import {
	CallHandler,
	ExecutionContext,
	HttpException,
	NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

export interface IResponse<T> {
	message: string;
	success: boolean;
	result: T;
	error: null;
	timeStamps: Date;
	path: string;
	statusCode: number;
}

/**
 * Transformation Interceptor
 */
export class TransformationInterceptor<T>
	implements NestInterceptor<T, IResponse<T>>
{
	intercept(
		context: ExecutionContext,
		next: CallHandler,
	): Observable<IResponse<T>> {
		const statusCode = context.switchToHttp().getResponse().statusCode;
		const path = context.switchToHttp().getRequest().url;

		return next.handle().pipe(
			map((data: IResponse<T>) => ({
				message: data.message,
				success: data.success,
				result: data.result,
				timeStamps: new Date(),
				statusCode,
				path,
				error: null,
			})),
		);
	}
}

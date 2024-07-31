import {
	ArgumentsHost,
	Catch,
	ExceptionFilter,
	HttpException,
	HttpStatus,
	Logger,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

export interface IHttpExceptionResponse {
	statusCode: number;
	message: string;
	error: string;
}

/**
 * HTTP Exception Filter
 */
@Catch()
export class HTTPExceptionFilter implements ExceptionFilter {
	private readonly _logger = new Logger(HttpException.name);

	constructor(private readonly httpAdapterhost: HttpAdapterHost) {}

	catch(exception: any, host: ArgumentsHost): void {
		const { httpAdapter } = this.httpAdapterhost;
		const ctx = host.switchToHttp();

		const httpStatus =
			exception instanceof HttpException
				? exception.getStatus()
				: HttpStatus.INTERNAL_SERVER_ERROR;

		this._logger.error(`Exception :: ==> ${exception}`);

		const exceptionResponse =
			exception instanceof HttpException
				? ctx.getResponse()
				: String(exception);

		const responseBody = {
			statusCode: httpStatus,
			timeStamp: new Date().toISOString(),
			path: httpAdapter.getRequestUrl(ctx.getRequest()),
			message:
				(exceptionResponse as IHttpExceptionResponse).message ||
				(exceptionResponse as IHttpExceptionResponse).error ||
				exceptionResponse ||
				'Something went wrong',
			errorResponse: exceptionResponse as IHttpExceptionResponse,
		};

		httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
	}
}

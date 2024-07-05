import { Injectable, NestMiddleware } from '@nestjs/common';
import type { Request, Response } from 'express';
import * as moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import { MyLoggerService } from './logger.service';

export interface IRequestLog extends Request {
	correlationId?: string | string[];
	parentSpan?: string | string[];
	span?: string | string[];
	origin?: string;
}

/* eslint-disable no-useless-escape */
@Injectable()
export class LoggerMiddleware implements NestMiddleware<Request, Response> {
	public constructor(private logger: MyLoggerService) {}

	public use(req: IRequestLog, res: Response, next: () => void) {
		try {
			const before = Date.now();
			const id = req.headers['x-request-id']
				? req.headers['x-request-id']
				: uuidv4();
			this.logger && this.logger.log(id as string);
			const span = req.headers['x-span'] || '0';
			req.correlationId = id;
			req.parentSpan = span;
			req.span = span;
			next();
			res.on(
				'close',
				() =>
					this.logger &&
					this.logger.log(
						this.generateLogMessage(req, res, Date.now() - before),
					),
			);
		} catch (err) {
			console.log(err);
		}
	}

	private getResponseSize(res: Response): number {
		const sizeRow = res.getHeader('Content-Length');
		if (typeof sizeRow === 'number') {
			return sizeRow;
		}
		if (typeof sizeRow === 'string') {
			const parsed = parseInt(sizeRow, 10);
			if (isNaN(parsed)) {
				return 0;
			}
			return parsed;
		}
		return 0;
	}

	/**
	 * generate log message
	 * @example
	 * - date=${moment().format('DD/MMM/YYYY:HH:mm:ss ZZ')} trace=${id} type=IncomingRequest endpoint=${req.originalUrl} duration=${duration} span=${span} status=${res.statusCode}
	 */
	private generateLogMessage(
		req: IRequestLog,
		res: Response,
		timeTaken: number,
	): string {
		const size = this.getResponseSize(res);
		const terms: { [key: string]: string } = {
			'%h': req.socket.remoteAddress || '-',
			'%l': '-',
			'%x1': `span=${req.span}`,
			'%x2': `trace=${req.correlationId}`,
			'%x3': 'type=Incoming request',
			'%u': '-', // todo: parse req.headers.authorization?
			'%t': `date=[${moment().format('DD/MMM/YYYY:HH:mm:ss ZZ')}]`,
			'%r': `request=${req.method} ${req.originalUrl} ${req.httpVersion}`,
			'%>s': `status=${res.statusCode}`,
			'%b': size === 0 ? 'size=-' : `size=${size}`,
			'%tt': `duration=${timeTaken}`,
		};
		let str = '%t %x2 %x3 "%r" %x1 %>s %b %tt';
		for (const term in terms) {
			if (term in terms) {
				str = str.replace(term, terms[term]);
			}
		}

		str = str.replace(/%\{([a-zA-Z\-]+)\}i/g, (_match, p1) => {
			const header = req.headers[`${p1}`.toLowerCase()];
			if (header == null) {
				return '-';
			}
			if (Array.isArray(header)) {
				return `"${header.join(',')}"`;
			}
			return `"${header}"`;
		});

		console.log('str', str);

		return str;
	}
}

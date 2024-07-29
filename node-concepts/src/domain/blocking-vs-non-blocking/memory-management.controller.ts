import { Controller, Get, Logger, Req, Res } from '@nestjs/common';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { EventEmitter } from 'events';
import type { Response } from 'express';

const tasks = [];
const eventEmitter = new EventEmitter();

@Controller('memory-management')
@ApiTags('memory-management')
export class MemoryManagementController {
	private readonly _logger = new Logger(MemoryManagementController.name);

	@Get('/memory-leak')
	@ApiProperty({ description: 'It will leak memory' })
	leak(@Req() req: any, @Res() res: Response) {
		// closure with an external variable reference
		tasks.push(function () {
			return req.headers;
		});

		// too much data
		const hugeArray = new Array(100000000).fill(req);

		// circular object references are always bad because this bad object is pointing to the original request object
		req.user = {
			id: 1,
			username: 'Inefficient User',
			badObject: req, // circular object reference
			hugeArray,
		};

		// clear event emitter listeners
		// if you dont remove, they also get stuck in the memory
		eventEmitter.on('start', () => {
			this._logger.log('Useless event emitteed');
		});

		setTimeout(() => {
			res.send('hello world!');
		});

		// should clear timeout like that
		// const resWithTImeout = setTimeout(() => {
		// 	res.send('hello world!');
		// });
		// clearTimeout(resWithTImeout);
	}
}

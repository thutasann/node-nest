import { Controller, Get, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import type { Response } from 'express';
import { Worker } from 'worker_threads';

const THREAD_COUNT = 4;

@Controller('multithread')
@ApiTags('performance')
export class MultiThreadController {
	@Get('/non-blocking')
	async nonBlocking() {
		return {
			message: 'this is non blocking',
		};
	}

	@Get('/blocking')
	async blocking(@Res() res: Response) {
		const workerPromises: Array<Promise<any>> = [];
		for (let i = 0; i < THREAD_COUNT; i++) {
			workerPromises.push(this.createWorker());
		}

		const thread_results = await Promise.all(workerPromises);
		const total =
			thread_results[0] +
			thread_results[1] +
			thread_results[2] +
			thread_results[3];

		res.status(200).send({ total });
	}

	/** create worker */
	private createWorker(): Promise<void> {
		return new Promise((resolve, reject) => {
			const worker = new Worker('./workers/four-workers.js', {
				workerData: { thread_count: THREAD_COUNT },
			});

			worker.on('message', (data) => {
				resolve(data);
			});

			worker.on('error', (error) => {
				reject(`An error occured ${error}`);
			});
		});
	}
}

/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { Worker } from 'worker_threads';
import { workerThreadFilePath } from './worker/config';
import { resolveSoa } from 'dns';

@Injectable()
export class AppService {
	getHello(): string {
		return 'Hello World!';
	}

	/** synchronous blocking */
	blocking(cpuTimeMs: number) {
		const startTime = Date.now();
		while (Date.now() - startTime < cpuTimeMs) {}
	}

	/** async non blocking */
	async woker(cpuTimeMs: number) {
		return new Promise((resolve, reject) => {
			const worker = new Worker(workerThreadFilePath, {
				workerData: { cpuTimeMs },
			});
			worker.on('message', (message) => {
				console.log('Main thread go mesage: ', message);
				resolve(message);
			});
			worker.on('error', (error) => {
				console.error('Worker threw an error : ', error);
				reject(error);
			});
			worker.on('exit', (code) => {
				console.log('Worker did exit with code', code);
			});
		});
	}
}

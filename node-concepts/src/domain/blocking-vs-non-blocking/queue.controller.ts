import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('event-loop')
@ApiTags('event-loop')
export class Queuecontroller {
	@Get('/microtask-sample-one')
	microTaskSampleOne() {
		console.log('console 1');
		process.nextTick(() => console.log('process.next 1'));
		console.log('console 2');
	}

	/** callback in nextTick queue is executed before callbacks in promise queue
	 * @description
	 * - in the event loop, nextTick queue gets priority over promise queue
	 */
	@Get('/microtask-sample-two')
	microTaskSampleTwo() {
		Promise.resolve().then(() => console.log('this is promise.resolve 1'));
		process.nextTick(() => console.log('this is process.nextTick 1'));
	}

	@Get('/microtasks-queue-promise-process-nexttick')
	microTaskQueueWithPromiseAndProcessNextTick() {
		console.log('Start of the Script');

		setTimeout(() => {
			console.log('Timeout callback');
		}, 0);

		Promise.resolve().then(() => {
			console.log('Promise resolved');
		});

		process.nextTick(() => {
			console.log('Next Tick callback');
		});

		console.log('End of script');
	}

	@Get('/real-life-microtask-queue')
	realLifeMicroTaskQueueSample() {
		/** simulate database insert function */
		function insertIntoDatabae(record: { id: number; name: string }) {
			return new Promise<void>((resolve) => {
				setTimeout(() => {
					console.log(`Record inserted: ${JSON.stringify(record)}`);
					resolve();
				}, 100);
			});
		}

		/** main function demonstrating microtask queue */
		(async function main() {
			const record = { id: 1, name: 'Thuta' };

			// Insert record into database
			insertIntoDatabae(record).then(() => {
				console.log('Insertion completed');
			});

			// Log immediately
			console.log('Logging after insertion request');

			// Schedule a cleanup tasks using process.nextTick
			process.nextTick(() => {
				console.log('Running cleanup task');
			});

			console.log('End of main function');
		})();
	}

	/**
	 * Queue result [process -> promise -> timer]
	 * @description
	 * - timer queue callbacks are executed in FIFO order
	 */
	@Get('/timer-queue')
	timerQueueSample() {
		setTimeout(() => console.log('this is settimeout 1'), 0);
		setTimeout(() => {
			console.log('this is settimeout 2');
			// callbacks in microtask queues are executed in between the execution of callbacks in the timer queue
			process.nextTick(() =>
				console.log('this is the inner next tick inside setTimeout'),
			);
		}, 0);
		setTimeout(() => console.log('this is settimeout 3'), 0);

		process.nextTick(() => console.log('this is process.nextTick 1'));
		process.nextTick(() => console.log('this is process.nextTick 2'));

		Promise.resolve().then(() => console.log('Promise resolved 1'));
		Promise.resolve().then(() => console.log('Promise resolved 2'));
	}

	@Get('/settimeout-sample')
	setTimeoutSample() {
		setTimeout(() => {
			console.log('setTimeout 1');

			Promise.resolve('Promise 1').then(console.log);
			Promise.resolve('Promise 2').catch(console.log);

			queueMicrotask(() => console.log('queueMicrotask 1'));

			process.nextTick(console.log, 'nextTick 1');
		}, 10);

		setTimeout(console.log, 0, 'setTimeout 2');
		setTimeout(console.log, 0, 'setTimeout 3');
	}
}

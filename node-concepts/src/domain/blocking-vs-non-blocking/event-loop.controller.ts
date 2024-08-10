import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('event-loop')
@ApiTags('event-loop')
export class EventLoopController {
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

	@Get('/sync-solution')
	syncSolution() {
		const syncInterval = setInterval(() => {
			console.log('Event Loop Created');
		}, 1);

		console.log('Calculating Sync Prime:');
		const startTime = performance.now();

		const nth = 2_000_000;
		console.log('Sync prime is ', this.findPrime(nth));

		const endTime = performance.now();
		console.log(`Computation took ${endTime - startTime} milliseconds`);
		console.log('------');
		clearInterval(syncInterval);

		return `Computation took ${endTime - startTime} milliseconds`;
	}

	@Get('/partitioning-solution')
	partitioning() {
		const asyncInterval = setInterval(() => {
			console.log('Event loop executed');
		}, 1);

		console.log('Calculating Sync Prime:');
		const nth = 100;

		const startTime = performance.now();

		this.findPrimeAsync(nth)
			.then((n) => {
				const endTime = performance.now();
				console.log('Async Prime is', n);
				console.log(`Computation took ${endTime - startTime} milliseconds`);
				console.log('------');
			})
			.then(() => clearInterval(asyncInterval));
	}

	/** find prime */
	private findPrime(num: number): number {
		let i: number;
		const primes = [2, 3];
		let n = 5;

		const isPrime = (n: number): boolean => {
			let i = 1;
			let p = primes[i];
			const limit = Math.ceil(Math.sqrt(n));

			while (p <= limit) {
				if (n % p === 0) {
					return false;
				}
				i += 1;
				p = primes[i];
			}
			return true;
		};

		for (i = 2; i <= num; i += 1) {
			while (!isPrime(n)) {
				n += 2;
			}
			primes.push(n);
			n += 2;
		}

		return primes[num - 1];
	}

	/** find prime async */
	private async findPrimeAsync(num: number): Promise<number> {
		let i: number;
		const primes = [2, 3];
		let n = 5;

		const isPrime = (n: number) =>
			/*
              The Promise lets other tasks proceed concurrently, while waiting for the setImmediate() callback to execute. This prevents the main thread from being blocked.
            */
			new Promise((res) =>
				/*
                The setImmediate() callback inside the Promise ensures that the logic runs asynchronously. It defers execution to the next iteration of the event loop. It falls into the “pending callbacks” phase first, then into "check".
              */
				setImmediate(() => {
					let i = 1;
					let p = primes[i];
					const limit = Math.ceil(Math.sqrt(n));

					while (p <= limit) {
						if (n % p === 0) {
							return res(false);
						}
						i += 1;
						p = primes[i];
					}
					return res(true);
				}),
			);

		for (i = 2; i <= num; i += 1) {
			while (!(await isPrime(n))) {
				n += 2;
			}
			primes.push(n);
			n += 2;
		}

		return primes[num - 1];
	}
}

import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('event-loop')
@ApiTags('event-loop')
export class EventLoopController {
	@Get('/sync-solution')
	async optimizeEventLoop() {
		const syncInterval = setInterval(() => {
			console.log('Event Loop Created');
		}, 1);

		const findPrime = (num: number) => {
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
		};

		console.log('Calculating Sync Prime:');
		const startTime = performance.now();

		const nth = 2_000_000;
		console.log('Sync prime is ', findPrime(nth));

		const endTime = performance.now();
		console.log(`Computation took ${endTime - startTime} milliseconds`);
		console.log('------');

		clearInterval(syncInterval);
	}
}

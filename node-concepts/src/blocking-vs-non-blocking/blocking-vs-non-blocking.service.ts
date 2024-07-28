import { Injectable } from '@nestjs/common';

@Injectable()
export class BlockingVsNonBlockingService {
	/** blocking code sample */
	blocking() {
		const now = new Date().getTime();
		while (new Date().getTime() < now + 10000) {}
		return { message: 'Blocking' };
	}

	/** non blocking code sample */
	async nonBlocking() {
		return new Promise(async (resolve) => {
			setTimeout(() => {
				resolve({ message: 'Non Blocking' });
			}, 10000);
		});
	}
}

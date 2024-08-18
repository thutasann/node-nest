import {
	Injectable,
	InternalServerErrorException,
	Logger,
} from '@nestjs/common';
import { readFile, writeFile } from 'fs/promises';

@Injectable()
export class BlockingVsNonBlockingService {
	private readonly logger = new Logger(BlockingVsNonBlockingService.name);

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

	/**
	 * promises (concurrency) code sample
	 * @abstract a slower one
	 * @description
	 * - executing one promise at a time
	 * - each iteration are waiting one promise at a time
	 * - at the end, we are returning our results array
	 */
	async promises() {
		const results = [];
		for (let i = 0; i < 10; i++) {
			results.push(await this.sleep(i));
		}
		return results;
	}

	/**
	 * promises parallel (concurrency) code samle
	 * @abstract a faster one
	 * @description
	 * - executing multiple promises at once
	 * - dont want to await io call once at a time
	 * - simply push the promise itself to the results array
	 * - we are starting all of these promises at once, we're not awaiting
	 * - we are grouping each promises together and allowing them all to run at once
	 * - NOTE: these promises do have some memory overhead in our application
	 */
	async promiseParallel() {
		const promises = [];
		for (let i = 0; i < 10; i++) {
			promises.push(this.sleep(i));
		}
		return Promise.all(promises);
	}

	/** read files */
	async readFiles(filePaths: string[]): Promise<string[]> {
		try {
			const fileReadPromises = filePaths.map((filePath) =>
				readFile(filePath, 'utf-8'),
			);

			const fileContents = await Promise.all(fileReadPromises);

			return fileContents;
		} catch (error) {
			this.logger.error(`Error reading files: ${error}`);
			throw new InternalServerErrorException('Error reading file');
		}
	}

	/** to combine content and write to a new file */
	async writeCombinedFile(outputPath: string, fileContents: string[]) {
		try {
			const combinedContent = fileContents.join('\n');
			await writeFile(outputPath, combinedContent, 'utf-8');
			this.logger.debug(`Combined content written to ${outputPath}`);
		} catch (error) {
			this.logger.error(`Error writing files: ${error}`);
			throw new InternalServerErrorException('Error writing combined file');
		}
	}

	/** sleep (dummy IO) */
	private async sleep(iteration: number) {
		return new Promise((resolve) => {
			this.logger.log(`start sleep - ${iteration}`);
			setTimeout(() => {
				this.logger.debug(`sleep completed - ${iteration}`);
				resolve({
					iteration,
				});
			}, 1000);
		});
	}
}

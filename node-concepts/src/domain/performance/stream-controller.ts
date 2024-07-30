import { Controller, Get, Logger } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import * as fs from 'fs';
import { pipeline, Transform } from 'stream';

let chunkCount = 0;

const readable = fs.createReadStream('my-file.txt', {
	highWaterMark: 20, // a limit for a buffer
});
const writable = fs.createWriteStream('my-new-file.txt');
const uppercase = new Transform({
	transform(chunk, encoding, callback) {
		callback(null, chunk.toString().toUpperCase());
	},
});

@Controller('stream')
@ApiTags('performance')
export class StreamController {
	private readonly logger = new Logger(StreamController.name);

	/**
	 * Readable Streams
	 * 183 BYTES, 20 BYTES chunk
	 */
	@Get('sample-one')
	sampleOne() {
		readable.on('data', (chunk) => {
			if (chunkCount === 2) {
				readable.pause();
				setTimeout(() => {
					readable.resume();
				}, 3000);
			}
			this.logger.log(`New chunk: ${chunk}`);
			chunkCount++;
		});

		return 'Hello From Stream Sample One';
	}

	@Get('async-sample')
	async asyncSample() {
		for await (const chunk of readable) {
			this.logger.log(`New chunk: ${chunk}`);
		}
		return 'Read Stream Async sample';
	}

	@Get('writable-streams')
	writeFile() {
		writable.write('Hello, ');
		writable.end('world!');
		return 'Successfully wrote file';
	}

	@Get('duplex-streams')
	duplexStreams() {
		readable.pipe(uppercase).pipe(writable);
		return 'Successfully uppercase!';
	}

	@Get('pipeline-sample')
	pipelineSample() {
		pipeline(readable, uppercase, writable, (error) => {
			if (error) {
				console.error('error =>', error);
			}
		});
	}
}

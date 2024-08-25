import { Controller, Get, Logger } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { exec } from 'child_process';
import { StringDecoder } from 'string_decoder';

@Controller('node-methods')
@ApiTags('node-methods')
export class NodeMethodsController {
	private readonly logger = new Logger(NodeMethodsController.name);

	@Get('/exec-sample')
	execSample() {
		exec('ls -la', (error, stdout, stderr) => {
			if (error) {
				console.error(`Error: ${error.message}`);
				return;
			}

			if (stderr) {
				console.error(`Stderr: ${stderr}`);
				return;
			}

			console.log(`Stdout: ${stdout}`);
		});
	}

	@Get('/exec-to-check-node-version')
	execCheckNodeVersion() {
		exec('node -v', (error, stdout, stderr) => {
			if (error) {
				console.error(`Error: ${error.message}`);
				return;
			}

			if (stderr) {
				console.error(`Stderr: ${stderr}`);
				return;
			}

			console.log(`Node.js version: ${stdout}`);
		});
	}

	@Get('/string-decoder')
	stringDecoder() {
		const decoder = new StringDecoder('utf-8');
		const cent = Buffer.from([0xc2, 0xa2]);
		this.logger.log(`decoder write -> ${decoder.write(cent)}`);
	}
}

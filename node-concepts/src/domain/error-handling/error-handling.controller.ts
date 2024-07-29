import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('error-handling')
@ApiTags('error-handling')
export class ErrorHandlingControler {
	@Get('/sample-one')
	async sampleOne() {
		Promise.resolve('promised value').then(() => {
			throw new Error('error');
		});

		Promise.reject('error value').catch(() => {
			throw new Error('error');
		});

		new Promise((resolve, reject) => {
			throw new Error('error');
		});
	}
}

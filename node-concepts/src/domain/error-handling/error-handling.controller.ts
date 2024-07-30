import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppError, commonErrorDistinct } from './app-error';

const productToAdd = undefined;
const topicOne = 'extended_error_object';

@Controller('error-handling')
@ApiTags('error-handling')
export class ErrorHandlingControler {
	@Get('/bad-practices')
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

	@Get(topicOne + '/bad-example')
	topicOneBadExample() {
		if (!productToAdd) {
			throw 'How can I add new product when no value provided?';
		}
	}

	@Get(topicOne + '/okayish-example')
	topicOneOkayishExample() {
		if (!productToAdd) {
			throw new Error('How can I add new product when no value provided?');
		}
	}

	@Get(topicOne + '/best-example')
	topicOneBestExample() {
		if (!productToAdd) {
			throw new AppError(
				commonErrorDistinct.resourceNotFound,
				commonErrorDistinct.notFound,
				'Due to the mismatch between the client defiend user and existing users in the databaes...',
				true,
			);
		}
	}
}

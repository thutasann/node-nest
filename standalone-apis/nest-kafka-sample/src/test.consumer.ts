import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConsumerService } from './kafka/services/consumer.service';

/**
 * Test Consumer Service
 */
@Injectable()
export class TestConsumer implements OnModuleInit {
	constructor(private readonly consumerService: ConsumerService) {}

	async onModuleInit() {
		await this.consumerService.consume(
			{ topics: ['test'] },
			{
				eachMessage: async ({ topic, partition, message }) => {
					console.log('::::: From Test Consumer :::::');
					console.log({
						value: message.value.toString(),
						topic: topic.toString(),
						partition: partition.toString(),
					});
				},
			},
		);
	}
}

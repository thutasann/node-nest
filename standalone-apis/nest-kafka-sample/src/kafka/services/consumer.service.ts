import { Injectable, OnApplicationShutdown } from '@nestjs/common';
import {
	Consumer,
	ConsumerRunConfig,
	ConsumerSubscribeTopics,
	Kafka,
} from 'kafkajs';

/**
 * Consumer Service
 */
@Injectable()
export class ConsumerService implements OnApplicationShutdown {
	private readonly kafka = new Kafka({
		brokers: ['localhost:9092'],
	});

	private readonly consumers: Consumer[] = [];

	/**
	 * Consume method
	 * @param topic - consumer subscribe topics
	 * @param config - consumer config
	 */
	async consume(
		topic: ConsumerSubscribeTopics,
		config: ConsumerRunConfig,
	): Promise<void> {
		const consumer = this.kafka.consumer({ groupId: 'nestjs-kafka' });
		await consumer.connect();
		await consumer.subscribe(topic);
		await consumer.run(config);
		this.consumers.push(consumer);
	}

	async onApplicationShutdown() {
		for (const consumer of this.consumers) {
			await consumer.disconnect();
		}
	}
}

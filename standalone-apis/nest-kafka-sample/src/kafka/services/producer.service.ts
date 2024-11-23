import {
	Injectable,
	OnApplicationShutdown,
	OnModuleInit,
} from '@nestjs/common';
import { Kafka, Producer, ProducerRecord } from 'kafkajs';

/**
 * Producer Service
 */
@Injectable()
export class ProducerService implements OnModuleInit, OnApplicationShutdown {
	private readonly kafaka = new Kafka({
		brokers: ['localhost:9092'],
	});
	private readonly producer: Producer = this.kafaka.producer();

	async onModuleInit() {
		await this.producer.connect();
	}

	/**
	 * produce method
	 * @param record - producer record
	 */
	async produce(record: ProducerRecord) {
		await this.producer.send(record);
	}

	async onApplicationShutdown() {
		await this.producer.disconnect();
	}
}

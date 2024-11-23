import { Injectable } from '@nestjs/common';
import { OrderCreatedEvent } from './events/order-created.event';

@Injectable()
export class AppService {
	getHello(): string {
		return 'Hello World!';
	}

	handleOrderCreated(orderCreatedEvent: OrderCreatedEvent) {
		console.log('orderCreatedEvent', orderCreatedEvent);
	}
}

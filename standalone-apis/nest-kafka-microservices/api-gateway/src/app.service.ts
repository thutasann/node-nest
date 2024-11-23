import { Inject, Injectable } from '@nestjs/common';
import { CreateOrderRequest } from './dto/create-order-request.dto';
import { ClientKafka } from '@nestjs/microservices';
import { OrderCreatedEvent } from './events/order-created.event';

@Injectable()
export class AppService {
	constructor(
		@Inject('BILLING_SERVICE') private readonly billingClient: ClientKafka,
	) {}

	getHello(): string {
		return 'Hello World!';
	}

	createOrder({ userId, price }: CreateOrderRequest) {
		const result = JSON.stringify(new OrderCreatedEvent('123', userId, price));
		console.log('result', result);
		this.billingClient.emit('order_created', result);
	}
}

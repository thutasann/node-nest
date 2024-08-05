import { Injectable, Logger } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { Cron, CronExpression, SchedulerRegistry } from '@nestjs/schedule';
import {
	CreateUserRequest,
	UserEvents,
} from 'src/core/dto/events-tasks/create-user.request';
import { UserCreatedEvent } from 'src/core/dto/events-tasks/user-created.event';

@Injectable()
export class EventTasksService {
	private readonly logger = new Logger(EventTasksService.name);

	constructor(
		private readonly eventEmitter: EventEmitter2,
		private readonly scheduleRegistry: SchedulerRegistry,
	) {}

	/** create user  */
	async createUser(body: CreateUserRequest): Promise<void> {
		this.logger.log(`Creating user... ${body.email}`);
		const userId = 'user-123';
		this.eventEmitter.emit(
			UserEvents.created,
			new UserCreatedEvent(userId, body.email),
		);
		const establishWsTimeout = setTimeout(
			() => this.establishWsConnection(userId),
			5000,
		);
		this.scheduleRegistry.addTimeout(
			`${userId}_establish_ws`,
			establishWsTimeout,
		);
	}

	/** welcome user */
	@OnEvent(UserEvents.created)
	welcomeNewUser(payload: UserCreatedEvent) {
		this.logger.debug(`Welcoming new user... ${payload.email}`);
	}

	/** sending gift */
	@OnEvent(UserEvents.created)
	async sendingGift(payload: UserCreatedEvent) {
		this.logger.debug(`Sending welcome gift to... ${payload.email}`);
		await new Promise<void>((resolve) => setTimeout(() => resolve(), 3000));
		this.logger.debug(
			`Welcome gift was successfully sent to... ${payload.email}`,
		);
	}

	/** delete expired users (cron) */
	@Cron(CronExpression.EVERY_11_HOURS, { name: 'delete_expired_users' })
	deleteExpiredUsers() {
		this.logger.debug(`Deleting Expired Users...`);
	}

	/** establish websocket connection */
	private establishWsConnection(userId: string) {
		this.logger.log('Establishing WS Connection with user...', userId);
	}
}

import { config, events, messageSamplePayload } from './config';
import Redis from 'ioredis';
import fastify from 'fastify';
import fastifyCors from '@fastify/cors';
import fastifyIO from 'fastify-socket.io';
import { randomUUID } from 'crypto';

const {
	CONNECTION_COUNT_KEY,
	NEW_MESSAGE_CHANNEL,
	CONNECTION_COUNT_UPDATED_CHANNEL,
} = events;

if (!config.UPSTASH_REDIS_REST_URL) {
	console.error('missing UPSTASH_REDIS_REST_URL');
	process.exit(1);
}

// redis pub-sub
export const publisher = new Redis(config.UPSTASH_REDIS_REST_URL);
export const subscriber = new Redis(config.UPSTASH_REDIS_REST_URL);

export let connectedClients = 0;

/** build fastify server */
export async function buildServer() {
	// fastify app
	const app = fastify();
	await app.register(fastifyCors, {
		origin: config.CORS_ORIGIN,
	});
	await app.register(fastifyIO);

	// current count
	const currentCount = await publisher.get(CONNECTION_COUNT_KEY);
	if (!currentCount) await publisher.set(CONNECTION_COUNT_KEY, 0);

	// socket.io connection ✅
	app.io.on('connection', async (io) => {
		const inResult = await publisher.incr(CONNECTION_COUNT_KEY);
		connectedClients++;

		// publisher: chat:connection-count-updated ✅
		await publisher.publish(CONNECTION_COUNT_UPDATED_CHANNEL, String(inResult));
		await publisher.publish(
			NEW_MESSAGE_CHANNEL,
			JSON.stringify(messageSamplePayload),
		);

		// io: chat:new-message ✅
		io.on(NEW_MESSAGE_CHANNEL, async (payload) => {
			const message = JSON.parse(payload).message;
			if (!message) return;
			await publisher.publish(NEW_MESSAGE_CHANNEL, message.toString());
		});

		// io: disconnect 🔴
		io.on('disconnect', async () => {
			console.log('Client disconnected 🔴');
			connectedClients--;
			const decResult = await publisher.decr(CONNECTION_COUNT_KEY);
			await publisher.publish(
				events.CONNECTION_COUNT_UPDATED_CHANNEL,
				String(decResult),
			);
		});
	});

	// subscriber: chat:connection-count-updated 🚀
	subscriber.subscribe(CONNECTION_COUNT_UPDATED_CHANNEL, (err, count) => {
		if (err) {
			console.error(
				`Error subscribing to ${CONNECTION_COUNT_UPDATED_CHANNEL}`,
				err,
			);
			return;
		}

		console.log(
			`${count} clients subscribes to ${CONNECTION_COUNT_UPDATED_CHANNEL} channel 🚀`,
		);
	});

	// subscriber: chat:new-message 🚀
	subscriber.subscribe(NEW_MESSAGE_CHANNEL, (err, count) => {
		if (err) {
			console.error(`Error subscribing to ${NEW_MESSAGE_CHANNEL}`);
			return;
		}
		console.log(
			`${count} clients subscribes to ${NEW_MESSAGE_CHANNEL} channel 🚀`,
		);
	});

	// subscriber: message 🚀
	subscriber.on('message', (channel, text) => {
		console.log('subscribe message ==> ', { channel, text });
		if (channel === CONNECTION_COUNT_UPDATED_CHANNEL) {
			app.io.emit(CONNECTION_COUNT_UPDATED_CHANNEL, {
				count: text,
			});

			return;
		}

		if (channel === NEW_MESSAGE_CHANNEL) {
			app.io.emit(NEW_MESSAGE_CHANNEL, {
				message: text,
				id: randomUUID(),
				createdAt: new Date(),
				port: config.PORT,
			});

			return;
		}
	});

	// health check
	app.get('/health', () => {
		return {
			status: 'ok',
			port: config.PORT,
		};
	});

	return app;
}

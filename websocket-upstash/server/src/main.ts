import dotenv from 'dotenv';
import { config, events } from './config';
import Redis from 'ioredis';
import fastify from 'fastify';
import fastifyCors from '@fastify/cors';
import fastifyIO from 'fastify-socket.io';

dotenv.config();

if (!config.UPSTASH_REDIS_REST_URL) {
	console.error('missing UPSTASH_REDIS_REST_URL');
	process.exit(1);
}

// redis pub-sub
const publisher = new Redis(config.UPSTASH_REDIS_REST_URL);
const subscriber = new Redis(config.UPSTASH_REDIS_REST_URL);

let connectedClients = 0;

/** build fastify server */
async function buildServer() {
	const app = fastify();

	await app.register(fastifyCors, {
		origin: config.CORS_ORIGIN,
	});

	await app.register(fastifyIO);

	const currentCount = await publisher.get(events.CONNECTION_COUNT_KEY);

	app.get('/', () => {
		return {
			status: 'ok',
			port: config.PORT,
		};
	});

	app.get('/health', () => {
		return {
			status: 'ok',
			port: config.PORT,
		};
	});

	return app;
}

/** main function */
async function main() {
	const app = await buildServer();

	try {
		await app.listen({
			port: config.PORT,
			host: config.HOST,
		});

		console.log(`Server started at http://${config.HOST}:${config.PORT}`);
	} catch (error) {
		console.error('error -> ', error);
		process.exit(1);
	}
}

main();

import { randomUUID } from 'crypto';
import dotenv from 'dotenv';
dotenv.config();

const PORT = parseInt(process.env.PORT || '3001', 10);
const HOST = process.env.HOST || '0.0.0.0';
const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:3000';
const UPSTASH_REDIS_REST_URL = process.env.UPSTASH_REDIS_REST_URL;

const CONNECTION_COUNT_KEY = 'chat:connection-count';
const CONNECTION_COUNT_UPDATED_CHANNEL = 'chat:connection-count-updated';
const NEW_MESSAGE_CHANNEL = 'chat:new-message';

/** env values */
export const config = {
	PORT,
	HOST,
	CORS_ORIGIN,
	UPSTASH_REDIS_REST_URL,
};

/** events name */
export const events = {
	CONNECTION_COUNT_KEY,
	CONNECTION_COUNT_UPDATED_CHANNEL,
	NEW_MESSAGE_CHANNEL,
};

export const messageSamplePayload = {
	message: 'Hi Im new joiner',
	id: randomUUID(),
	createdAt: new Date(),
	port: config.PORT,
};

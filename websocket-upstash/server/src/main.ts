import dotenv from 'dotenv';
import { config, events } from './config';
import closeWithGrace from 'close-with-grace';
import { buildServer, connectedClients, publisher } from './app';
dotenv.config();

/** main function */
async function main() {
	const app = await buildServer();

	try {
		await app.listen({
			port: config.PORT,
			host: config.HOST,
		});

		closeWithGrace({ delay: 2000 }, async ({ signal, err }) => {
			if (connectedClients > 0) {
				const currentCount = parseInt(
					(await publisher.get(events.CONNECTION_COUNT_KEY)) || '0',
					10,
				);
				const newCount = Math.max(currentCount - connectedClients, 0);
				await publisher.set(events.CONNECTION_COUNT_KEY, newCount);
			}

			await app.close();
		});

		console.log(`Server started at http://${config.HOST}:${config.PORT}`);
	} catch (error) {
		console.error('error -> ', error);
		process.exit(1);
	}
}

main();

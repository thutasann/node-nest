import expressApp from './app';
import cluster from 'cluster';
import os from 'os';
import { logger } from './utils/logger';

const PORT = process.env.CATALOG_PORT || 8000;
const cpuCount = os.cpus().length;

const BootStrap = async () => {
	logger.info(`cluster isPrimary ->  ${cluster.isPrimary}`);
	if (cluster.isPrimary) {
		for (let i = 0; i < cpuCount; i++) {
			cluster.fork();
		}

		cluster.on('exit', (worker, code, signal) => {
			console.log(`Worker ${worker.process.pid} died`);
			cluster.fork();
		});
	} else {
		expressApp.listen(PORT, () => {
			logger.info(
				`Catalog Service is listening to http://localhost:${PORT}/api/v1/catalog`,
			);
		});
	}

	process.on('uncaughtException', async (error) => {
		logger.error(error);
		process.exit(1);
	});
};

BootStrap().then(() => {
	logger.info('🚀 Catalog Service is running!!');
});

import expressApp from './app';
import { logger } from './utils/logger';

const PORT = process.env.CATALOG_PORT || 8000;

const BootStrap = async () => {
	expressApp.listen(PORT, () => {
		logger.info(
			`Catalog Service is listening to http://localhost:${PORT}/api/v1/catalog`,
		);
	});

	process.on('uncaughtException', async (error) => {
		logger.error(error);
		process.exit(1);
	});
};

BootStrap().then(() => {
	logger.info('🚀 Catalog Service is running!!');
});

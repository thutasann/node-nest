const CATALOG_DOMAIN =
	process.env.NODE_ENV === 'production'
		? 'https://node-kafka-catalog.onrender.com'
		: 'http://localhost:8000';

export const CATALOG_SERVICE = `${CATALOG_DOMAIN}/api/v1/catalog`;

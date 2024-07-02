import express, { Request, Response, NextFunction } from 'express';
import setupSwagger from './swagger';
import catalogRouter from './routes/catalog.route';
import welcomeRouter from './routes/welcome.route';
import { httpLogger } from './utils/logger';
import { HandleErrorWithLogger } from './utils/error/handler';
import { requestTimeMiddleware } from './middleware/request-time-middleware';
import { rateLimit } from 'express-rate-limit';
import { CATALOG_PREFIX } from './utils/constants';
import compression from 'compression';
import helmet from 'helmet';
import winstonLogger from './utils/logger/winston';

winstonLogger.info('this is info message');
winstonLogger.error('this is error message');

const limiter = rateLimit({
	windowMs: 10 * 60 * 1000,
	limit: 100,
	standardHeaders: 'draft-7',
	legacyHeaders: false,
});

const shouldCompress = (req: Request, res: Response): boolean => {
	if (req.headers['x-no-compression']) {
		return false;
	}
	return compression.filter(req, res);
};

const app = express();

// swagger setup
setupSwagger(app);

// middlewares
app.use(express.json());
app.use(requestTimeMiddleware);
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(limiter);
app.use(
	compression({
		level: 6,
		threshold: 50 * 1000,
		filter: shouldCompress,
	}),
);
app.use(httpLogger);
app.use(HandleErrorWithLogger);

// routes
app.use(CATALOG_PREFIX, welcomeRouter);
app.use(CATALOG_PREFIX, catalogRouter);

export default app;

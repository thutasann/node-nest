import express, { Request, Response } from 'express';
import winstonLogger from '../utils/logger/winston';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
	winstonLogger.info('Welcome Route...');
	res.status(200).json({
		message: 'Welcome From Catalog Service',
	});
});

router.get('/get-combined-logs', (req, res) => {
	res.sendFile('combined.log', { root: '.' });
});

export default router;

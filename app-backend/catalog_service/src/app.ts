import express from 'express';
import setupSwagger from './swagger';
import catalogRouter from './routes/catalog.route';
import { httpLogger } from './utils/logger';
import { HandleErrorWithLogger } from './utils/error/handler';

const app = express();

// swagger setup
setupSwagger(app);

app.use(express.json());
app.use(httpLogger);

app.use(HandleErrorWithLogger);

// routes
app.use('/api', catalogRouter);

export default app;

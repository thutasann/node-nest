import express from 'express';
import setupSwagger from './swagger';
import catalogRouter from './routes/catalog.route';
import { httpLogger } from './utils/logger';

const app = express();

// swagger setup
setupSwagger(app);

app.use(express.json());
app.use(httpLogger);

//TODO:handle_error_with_logger

// routes
app.use('/api', catalogRouter);

export default app;

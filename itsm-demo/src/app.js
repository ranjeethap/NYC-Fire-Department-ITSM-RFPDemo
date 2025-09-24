import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';
import incidentsRouter from './routes/incidents.js';
import requestsRouter from './routes/requests.js';
import assetsRouter from './routes/assets.js';
import changesRouter from './routes/changes.js';
import configItemsRouter from './routes/configuration-items.js';
import worklogsRouter from './routes/worklogs.js';
import dashboardRouter from './routes/dashboard.js';
import { apiKeyAuth } from './middleware/apiKeyAuth.js';
import { startSyncService } from './services/sync-service.js';
import swaggerUi from 'swagger-ui-express';
import { specs } from './config/swagger.js';

dotenv.config();

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('combined'));

const limiter = rateLimit({ windowMs: 60 * 1000, max: 120 });
app.use(limiter);

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'NYC Fire Department ITSM Demo API'
}));

// Healthcheck
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString(), requestId: uuidv4() });
});

// Authenticated API routes
app.use('/api/v1', apiKeyAuth, incidentsRouter);
app.use('/api/v1', apiKeyAuth, requestsRouter);
app.use('/api/v1', apiKeyAuth, assetsRouter);
app.use('/api/v1', apiKeyAuth, changesRouter);
app.use('/api/v1', apiKeyAuth, configItemsRouter);
app.use('/api/v1', apiKeyAuth, worklogsRouter);
app.use('/api/v1', apiKeyAuth, dashboardRouter);

// Error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({ error: { message: err.message || 'Internal Server Error' } });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`ITSM demo server listening on port ${port}`);
});

// start sync service
startSyncService();



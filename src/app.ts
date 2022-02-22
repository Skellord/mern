import cors from 'cors';
import express, { Application } from 'express';
import { errorConverter, errorHandler } from './middlewares/error.middleware';
import unitRouter from './routes/unit.routes';

const app: Application = express();

// CORS
app.use(cors());
// Routes
app.use('/units', unitRouter);
// Static deploy
app.use(express.static(__dirname + '/public'));
// Errors handling
app.use(errorConverter);
app.use(errorHandler);

export default app;

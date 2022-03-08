import cors from 'cors';
import express, { Application } from 'express';
import { errorHandler } from './middlewares/error.middleware';
import descRouter from './routes/desc.routes';
import factionRouter from './routes/faction.routes';
import unitRouter from './routes/unit.routes';

const app: Application = express();

// CORS
app.use(cors());
// Routes
app.use('/units', unitRouter);
app.use('/desc', descRouter);
app.use('/factions', factionRouter);

// Errors handling
app.use(errorHandler);

// Static deploy
app.use(express.static(__dirname + '/public'));

export default app;

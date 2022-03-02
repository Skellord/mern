import cors from 'cors';
import express, { Application } from 'express';
import { errorHandler } from './middlewares/error.middleware';
import unitRouter from './routes/unit.routes';

const app: Application = express();

// CORS
app.use(cors());
// Routes
app.use('/units', unitRouter);

// Errors handling
// app.use(errorHandler);

// Static deploy
// app.use('/static', express.static(__dirname + '/public'));

// if (import.meta.env.PROD) {
//     app.listen(3000);
// }

export const viteNodeApp = app;

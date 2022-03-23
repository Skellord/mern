import { Router } from 'express';
import HistoricalDescController from '../controller/HistoricalDescController';

const descRouter = Router();

descRouter.get('/historical/:key', HistoricalDescController.getUnitDesc);

export default descRouter;

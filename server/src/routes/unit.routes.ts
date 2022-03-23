import { Router } from 'express';
import UnitsController from '../controller/UnitsController';

const unitRouter = Router();

unitRouter.get('/', UnitsController.getAllUnits);

unitRouter.get('/:name/stats', UnitsController.getUnitStats);

// unitRouter.get('/unit-stats/:key', StatsController.getUnitStats);s

export default unitRouter;

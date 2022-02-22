import { Router } from 'express';
import UnitsController from '../controller/UnitsController';

const unitRouter = Router();

unitRouter.get('/', UnitsController.getAllUnits);

unitRouter.get('/unit/:id/stats', UnitsController.getUnitStats);

unitRouter.get('/factions', UnitsController.getAllFactions);

unitRouter.get('/factions/:faction', UnitsController.getOneFaction);

// unitRouter.get('/unit-stats/:key', StatsController.getUnitStats);s

export default unitRouter;

import { Router } from 'express';
import StatsController from '../controller/StatsController';
import UnitsController from '../controller/UnitsController';

const unitRouter = Router();

unitRouter.get('/', UnitsController.getAll);

unitRouter.get('/unit/:id', UnitsController.getOne);

unitRouter.get('/unit/:id/stats', UnitsController.getUnitStats);

unitRouter.get('/factions', UnitsController.getAllFactions);

unitRouter.get('/factions/:faction', UnitsController.getOneFaction);

unitRouter.get('/factions/:faction/:type', UnitsController.getOneFactionCaste);

// unitRouter.get('/unit-stats/:key', StatsController.getUnitStats);

export default unitRouter;

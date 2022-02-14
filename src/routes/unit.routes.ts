import { Router } from 'express';
import UnitsController from '../controller/UnitsController';

const unitRouter = Router();

unitRouter.get('/', UnitsController.getAll);

unitRouter.get('/unit/:id', UnitsController.getOne);

unitRouter.get('/factions', UnitsController.getAllFactions);

unitRouter.get('/factions/:faction', UnitsController.getOneFaction);

unitRouter.get('/factions/:faction/:type', UnitsController.getOneFactionCaste);

export default unitRouter;

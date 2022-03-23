import { Router } from 'express';
import FactionController from '../controller/FactionController';

const factionRouter = Router();

factionRouter.get('/', FactionController.getAllFactions);

factionRouter.get('/:faction', FactionController.getFaction);

export default factionRouter;

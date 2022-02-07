import { Router } from 'express';
import UnitsController from '../controller/UnitsController';

const unitRouter = Router();

unitRouter.get('/', UnitsController.getAll);

unitRouter.get('/:id', UnitsController.getOne);

export default unitRouter;

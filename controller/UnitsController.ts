import { UnitModel } from '../models/unit.model';
import { Request, Response } from 'express';

class UnitsController {
    async getOne(req: Request, res: Response) {
        try {
            const unit = await UnitModel.findById(req.params.id);
            res.json(unit);
        } catch (e) {
            res.status(404).json(e);
        }
    }

    async getAll(req: Request, res: Response) {
        try {
            const units = await UnitModel.find();
            res.json(units);
        } catch (e) {
            res.status(500).json(e);
        }
    }
}

export default new UnitsController();

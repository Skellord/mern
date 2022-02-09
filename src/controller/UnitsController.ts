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

    async getAllFactions(req: Request, res: Response) {
        try {
            const factions = await UnitModel.distinct('faction');
            res.json(factions);
        } catch (e) {
            res.status(500).json(e);
        }
    }

    async getOneFaction(req: Request, res: Response) {
        try {
            const faction = req.params.faction;
            const units = await UnitModel.find({ faction: faction });
            res.json(units);
        } catch (e) {
            res.status(500).json(e);
        }
    }
}

export default new UnitsController();

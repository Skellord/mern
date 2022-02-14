import { UnitModel } from '../models/unit.model';
import { Request, Response } from 'express';

interface FactionParams {
    faction: string;
}

interface FactionCasteParams extends FactionParams {
    type: string;
}

const regexZero = /0$/g;

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

    async getOneFaction(req: Request<FactionParams>, res: Response) {
        try {
            const faction = req.params.faction;

            const units = await UnitModel.find({ faction: faction });
            res.json(units);
        } catch (e) {
            res.status(500).json(e);
        }
    }

    async getOneFactionCaste(req: Request<FactionCasteParams>, res: Response) {
        try {
            const faction = req.params.faction;
            const type = req.params.type;
            const isWithZero = type === 'lord' || type === 'hero';
            const units = isWithZero
                ? await UnitModel.find({ faction: faction, caste: type, unit: { $regex: regexZero } })
                : await UnitModel.find({ faction: faction, caste: type });

            res.json(units);
        } catch (e) {
            res.status(500).json(e);
        }
    }
}

export default new UnitsController();

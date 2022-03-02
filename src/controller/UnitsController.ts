import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import unitService from '../service/unit.service';
import ApiError from '../utils/apiError.util';

interface FactionParams {
    faction: string;
}

class UnitsController {
    async getAllUnits(req: Request, res: Response, next: NextFunction) {
        const units = await unitService.getAllUnits();
        if (!units) {
            next(ApiError.notFound());
            return;
        }
        res.json(units);
    }

    async getAllFactions(req: Request, res: Response, next: NextFunction) {
        const factions = await unitService.getAllFactions();
        if (!factions) {
            next(ApiError.notFound());
            return;
        }
        res.json(factions);
    }

    async getOneFaction(req: Request<FactionParams>, res: Response, next: NextFunction) {
        const faction = req.params.faction;
        const units = await unitService.getOneFaction(faction);
        if (!units) {
            next(ApiError.notFound());
            return;
        }
        res.json(units);
    }

    async getUnitStats(req: Request, res: Response, next: NextFunction) {
        const id = new mongoose.Types.ObjectId(req.params.id);
        const unitStats = await unitService.getUnitWithStats(id);
        if (!unitStats) {
            next(ApiError.notFound);
            return;
        }
        res.json(unitStats);
    }
}

export default new UnitsController();

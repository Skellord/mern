import { Request, Response } from 'express';
import mongoose from 'mongoose';
import unitService from '../service/unit.service';

interface FactionParams {
    faction: string;
}

class UnitsController {
    async getAllUnits(req: Request, res: Response) {
        const units = await unitService.getAllUnits();
        res.json(units);
    }

    async getAllFactions(req: Request, res: Response) {
        const factions = await unitService.getAllFactions();
        res.json(factions);
    }

    async getOneFaction(req: Request<FactionParams>, res: Response) {
        const faction = req.params.faction;
        const units = await unitService.getOneFaction(faction);
        res.json(units);
    }

    async getUnitStats(req: Request, res: Response) {
        const id = new mongoose.Types.ObjectId(req.params.id);
        const unitStats = await unitService.getUnitWithStats(id);
        res.json(unitStats);
    }
}

export default new UnitsController();

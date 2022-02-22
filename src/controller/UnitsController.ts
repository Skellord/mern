import { Request, Response } from 'express';
import mongoose from 'mongoose';
import unitService from '../service/unit.service';

interface FactionParams {
    faction: string;
}

class UnitsController {
    async getAllUnits(req: Request, res: Response) {
        try {
            const units = await unitService.getAllUnits();
            res.json(units);
        } catch (e) {
            res.status(500).json(e);
        }
    }

    async getAllFactions(req: Request, res: Response) {
        try {
            const factions = await unitService.getAllFactions();
            res.json(factions);
        } catch (e) {
            res.status(500).json(e);
        }
    }

    async getOneFaction(req: Request<FactionParams>, res: Response) {
        try {
            const faction = req.params.faction;
            const units = await unitService.getOneFaction(faction);
            res.json(units);
        } catch (e) {
            res.status(500).json(e);
        }
    }

    async getUnitStats(req: Request, res: Response) {
        try {
            const id = new mongoose.Types.ObjectId(req.params.id);
            const unitStats = await unitService.getUnitWithStats(id);

            res.json(unitStats);
        } catch (e) {
            res.status(500).json(e);
        }
    }
}

export default new UnitsController();

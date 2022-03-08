import { NextFunction, Request, Response } from 'express';
import { ALL_FACTIONS, Factions } from '../../types/faction.types';
import factionService from '../service/faction.service';
import ApiError from '../utils/apiError.util';

interface FactionParams {
    faction: string;
}

const factionData = async (faction: string) => {
    switch (faction as Factions) {
        case 'cathay': {
            const cathayData = await factionService.getCathay();
            return cathayData;
        }
        case 'khorn': {
            const khornData = await factionService.getKhorn();
            return khornData;
        }
        case 'kislev': {
            const kislevData = await factionService.getKislev();
            return kislevData;
        }
        default:
            return;
    }
};

class FactionController {
    async getAllFactions(req: Request, res: Response, next: NextFunction) {
        const factions = await factionService.getAllFactions();
        if (!factions || factions.length === 0) {
            next(ApiError.internal());
            return;
        }
        res.json(factions);
    }

    async getFaction(req: Request<FactionParams>, res: Response, next: NextFunction) {
        const { faction } = req.params;
        if (!faction || !ALL_FACTIONS.includes(faction)) {
            next(ApiError.badRequest());
            return;
        }

        const data = await factionData(faction);
        if (!data || data === null) {
            next(ApiError.notFound());
            return;
        }
        res.json(data[0]);
    }
}

export default new FactionController();

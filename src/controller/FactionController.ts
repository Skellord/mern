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
        case 'nurgle': {
            const nurgledata = await factionService.getNurgle();
            return nurgledata;
        }
        case 'ogres': {
            const ogresData = await factionService.getOgres();
            return ogresData;
        }
        case 'slaanesh': {
            const slaaneshData = await factionService.getSlaanesh();
            return slaaneshData;
        }
        case 'tzeentch': {
            const tzeentchData = await factionService.getTzeentch();
            return tzeentchData;
        }
        case 'beastmens': {
            const beastmensData = await factionService.getBeastmens();
            return beastmensData;
        }
        case 'bretonnia': {
            const bretonniaData = await factionService.getBretonnia();
            return bretonniaData;
        }
        case 'chaos': {
            const chaosData = await factionService.getChaos();
            return chaosData;
        }
        case 'dark-elves': {
            const darkElvesData = await factionService.getDarkElves();
            return darkElvesData;
        }
        case 'dwarfs': {
            const dwarfsData = await factionService.getDwarfs();
            return dwarfsData;
        }
        case 'empire': {
            const empireData = await factionService.getEmpire();
            return empireData;
        }
        case 'greenskins': {
            const greenskinsData = await factionService.getGreenskins();
            return greenskinsData;
        }
        case 'high-elves': {
            const heData = await factionService.getHighElves();
            return heData;
        }
        case 'lizardmens': {
            const lizardmensData = await factionService.getLizardmens();
            return lizardmensData;
        }
        case 'norsca': {
            const norscaData = await factionService.getNorsca();
            return norscaData;
        }
        case 'skavens': {
            const skavensData = await factionService.getSkavens();
            return skavensData;
        }
        case 'tomb-kings': {
            const tombKingsData = await factionService.getTombKings();
            return tombKingsData;
        }
        case 'vampire-coast': {
            const vcData = await factionService.getVampireCoast();
            return vcData;
        }
        case 'vampire-counts': {
            const vampireCountsData = await factionService.getVampireCounts();
            return vampireCountsData;
        }
        case 'wood-elves': {
            const woodElvesData = await factionService.getWoodElves();
            return woodElvesData;
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

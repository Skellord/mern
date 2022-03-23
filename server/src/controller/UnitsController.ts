import { NextFunction, Request, Response } from 'express';
import unitService from '../service/unit.service';
import ApiError from '../utils/apiError.util';

interface UnitParams {
    name: string;
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

    async getUnitStats(req: Request<UnitParams>, res: Response, next: NextFunction) {
        const { name } = req.params;
        const unitStats = await unitService.getUnitWithStats(name);
        if (!unitStats || unitStats.length === 0) {
            next(ApiError.notFound());
            return;
        }
        res.json(unitStats[0]);
    }
}

export default new UnitsController();

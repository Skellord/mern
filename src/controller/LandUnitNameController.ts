import { NextFunction, Request, Response } from 'express';
import localizationService from '../service/unitDesc.service';
import ApiError from '../utils/apiError.util';

interface LandUnitParams {
    key: string;
}

class LandUnitNameController {
    async getUnitDesc(req: Request<LandUnitParams>, res: Response, next: NextFunction) {
        const key = req.params.key;
        if (!key) {
            next(ApiError.badRequest());
            return;
        }
        const query = `land_units_onscreen_name_${key}`;
        const desc = await localizationService.getUnitEnName(query);
        const firstDesc = desc[0];
        if (!desc || !firstDesc) {
            next(ApiError.notFound());
            return;
        }
        res.json(firstDesc);
    }
}

export default new LandUnitNameController();

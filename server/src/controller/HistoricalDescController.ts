import { NextFunction, Request, Response } from 'express';
import unitDescService from '../service/unitDesc.service';
import ApiError from '../utils/apiError.util';

interface HistoricalParams {
    key: string;
}

class HistoricalDescController {
    async getUnitDesc(req: Request<HistoricalParams>, res: Response, next: NextFunction) {
        const key = req.params.key;
        const desc = await unitDescService.getEnDesc(key);
        const firstDesc = desc[0];
        if (!desc || !firstDesc) {
            next(ApiError.notFound());
            return;
        }
        res.json(firstDesc);
    }
}

export default new HistoricalDescController();

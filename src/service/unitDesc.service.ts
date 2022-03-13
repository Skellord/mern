import { Localization } from '../../types/localization.types';
import { HistoricalDescModel } from '../models/historicalDescription.model';
import { LandUnitLocModel } from '../models/landUnitLoc.model';

class LocalizationService {
    async getEnDesc(key: string): Promise<Localization[]> {
        return await HistoricalDescModel.find({ key });
    }

    async getUnitEnName(key: string): Promise<Localization[]> {
        return await LandUnitLocModel.find({ key });
    }
}

export default new LocalizationService();

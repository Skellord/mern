import { HistoricalDescription } from '../../types/unitDesc.types';
import { HistoricalDescModel } from '../models/historicalDescription.model';

class UnitDescService {
    async getEnDesc(key: string): Promise<HistoricalDescription[]> {
        return await HistoricalDescModel.find({ key });
    }
}

export default new UnitDescService();

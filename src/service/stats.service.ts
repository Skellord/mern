import { UnitStats } from '../../types/units.types';
import { UnitStatsModel } from '../models/stats.model';

class StatsService {
    async getUnitStats(key: string): Promise<UnitStats[]> {
        return UnitStatsModel.aggregate([
            {
                $match: {
                    key,
                },
            },
            {
                $project: {
                    _id: 0,
                    key: 0,
                },
            },
        ]);
    }
}

export default new StatsService();

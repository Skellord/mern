import { SpecialAbilityResponse } from '../../types/specialAbility.types';
import { SpecialAbilityModel } from '../models/specialAbilities.model';

class SpecialAbilityService {
    async getSpecialAbilities(key: string): Promise<SpecialAbilityResponse[]> {
        return await SpecialAbilityModel.aggregate([
            {
                $match: { land_unit: key },
            },
            {
                $group: { _id: 0, special_abilities: { $addToSet: '$ability' } },
            },
            {
                $project: { _id: 0 },
            },
        ]);
    }
}

export default new SpecialAbilityService();

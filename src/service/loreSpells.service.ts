import { LoreSpells } from '../../types/loreSpells.types';
import { LoreSpellsModel } from '../models/loreSpells.model';

class LoreSpellsService {
    async getLoreSpells(key: string): Promise<LoreSpells[]> {
        return await LoreSpellsModel.aggregate([
            { $match: { unit: key } },
            { $project: { ability_group: 1, _id: 0 } },
            {
                $lookup: {
                    from: 'lore_spells',
                    localField: 'ability_group',
                    foreignField: 'special_ability_groups',
                    as: 'lore_spells',
                    pipeline: [
                        {
                            $group: {
                                _id: 0,
                                lore_spells: { $addToSet: '$unit_special_abilities' },
                            },
                        },
                    ],
                },
            },
            {
                $set: { lore_spells: { $arrayElemAt: ['$lore_spells.lore_spells', 0] } },
            },
            { $project: { ability_group: 0 } },
        ]);
    }
}

export default new LoreSpellsService();

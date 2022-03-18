import { Unit } from '../../types/units.types';
import { UnitModel } from '../models/unit.model';
import { attributeAgregation } from '../repository/attributes.aggregation';
import { bulletPointAggregation } from '../repository/bulletPoint.aggregation';
import { damageAggregation } from '../repository/damage.aggregation';
import { entityAggregation } from '../repository/entity.aggregation';
import { iconsAggregation } from '../repository/icons.aggregation';
import { localNameAggregation } from '../repository/localName.aggregation';
import { loreSpellsAggregation } from '../repository/loreSpells.aggregation';
import { specialAbilitiesAggregation } from '../repository/specialAbilities.aggregation';

class UnitService {
    async getAllUnits() {
        return await UnitModel.find();
    }

    async getUnit(unit: string): Promise<Unit[]> {
        return await UnitModel.aggregate([
            {
                $match: { unit },
            },
            ...iconsAggregation,
            ...bulletPointAggregation,
        ]);
    }

    async getUnitWithStats(unit: string) {
        return await UnitModel.aggregate(
            [
                {
                    $match: { unit },
                },
                {
                    $lookup: {
                        from: 'unit_stats',
                        localField: 'land_unit',
                        foreignField: 'key',
                        as: 'stats',
                    },
                },
                {
                    $unwind: '$stats',
                },
                ...damageAggregation,
                ...entityAggregation,
                ...iconsAggregation,
                ...bulletPointAggregation,
                ...attributeAgregation,
                ...specialAbilitiesAggregation,
                ...loreSpellsAggregation,
                ...localNameAggregation,
            ],
            {
                allowDiskUse: true,
            }
        );
    }
}

export default new UnitService();

import { Unit } from '../../types/units.types';
import { UnitModel } from '../models/unit.model';
import { attributeAgregation } from '../repository/attributes.aggregation';
import { bulletPointAggregation } from '../repository/bulletPoint.aggregation';
import { damageAggregation } from '../repository/damage.aggregation';
import { engineAggregation } from '../repository/engine.aggregation';
import { entityAggregation } from '../repository/entity.aggregation';
import { iconsAggregation } from '../repository/icons.aggregation';
import { localNameAggregation } from '../repository/localName.aggregation';
import { loreSpellsAggregation } from '../repository/loreSpells.aggregation';
import { specialAbilitiesAggregation } from '../repository/specialAbilities.aggregation';
import { unitGroupingsAggregation } from '../repository/unitGroupings.aggragation';

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
                        from: 'land_units',
                        localField: 'land_unit',
                        foreignField: 'key',
                        as: 'stats',
                    },
                },
                {
                    $unwind: '$stats',
                },
                ...unitGroupingsAggregation,
                ...engineAggregation,
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

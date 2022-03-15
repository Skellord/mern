import { Factions, FactionWithUnits } from '../../types/faction.types';
import { FactionModel } from '../models/faction.model';
import { iconsAggregation } from './icons.aggregation';

export const factionAggregation = async (
    faction: Factions,
    excludedUnits: string[],
    excludeRegex?: RegExp
): Promise<FactionWithUnits[] | null> => {
    const unitMatch = excludeRegex
        ? {
              $match: { unit: { $nin: excludedUnits, $not: { $regex: excludeRegex } } },
          }
        : { $match: { unit: { $nin: excludedUnits } } };
    return await FactionModel.aggregate(
        [
            {
                $match: {
                    faction: faction,
                },
            },
            {
                $lookup: {
                    from: 'main_stats',
                    localField: 'faction',
                    foreignField: 'faction',
                    as: 'units',
                    pipeline: [
                        unitMatch,
                        {
                            $project: {
                                _id: 1,
                                unit: 1,
                                land_unit: 1,
                                caste: 1,
                                ui_unit_group_land: 1,
                            },
                        },
                        ...iconsAggregation,
                        {
                            $lookup: {
                                from: 'battle_permission',
                                localField: 'unit',
                                foreignField: 'unit',
                                as: 'campaign_exclusive',
                                pipeline: [
                                    {
                                        $project: { campaign_exclusive: 1 },
                                    },
                                ],
                            },
                        },
                        {
                            $set: {
                                campaign_exclusive: { $arrayElemAt: ['$campaign_exclusive.campaign_exclusive', 0] },
                            },
                        },
                        {
                            $lookup: {
                                from: 'ui_unit_icons',
                                localField: 'ui_unit_group_land',
                                foreignField: 'key',
                                as: 'icon',
                                pipeline: [
                                    {
                                        $project: { icon: 1 },
                                    },
                                ],
                            },
                        },
                        {
                            $set: { icon: { $arrayElemAt: ['$icon.icon', 0] } },
                        },
                        {
                            $set: { loc_key: { $concat: ['land_units_onscreen_name_', '$unit'] } },
                        },
                        {
                            $lookup: {
                                from: 'land_units_loc',
                                localField: 'loc_key',
                                foreignField: 'key',
                                as: 'local_name',
                            },
                        },
                        {
                            $set: {
                                local_name: { $arrayElemAt: ['$local_name.text', 0] },
                            },
                        },
                    ],
                },
            },
        ],
        { allowDiskUse: true }
    );
};

import { Factions, FactionWithUnits } from '../../types/faction.types';
import { FactionModel } from '../models/faction.model';

export const factionAggregation = async (
    faction: Factions,
    excludedUnits: string[]
): Promise<FactionWithUnits[] | null> => {
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
                        {
                            $match: {
                                unit: { $nin: excludedUnits },
                            },
                        },
                        {
                            $project: {
                                _id: 1,
                                unit: 1,
                                land_unit: 1,
                                caste: 1,
                                ui_unit_group_land: 1,
                            },
                        },
                        {
                            $lookup: {
                                from: 'battle_permission',
                                localField: 'unit',
                                foreignField: 'unit',
                                as: 'lord_portrait',
                                pipeline: [
                                    {
                                        $project: { general_portrait: 1 },
                                    },
                                ],
                            },
                        },
                        {
                            $set: { lord_portrait: { $arrayElemAt: ['$lord_portrait.general_portrait', 0] } },
                        },
                        {
                            $lookup: {
                                from: 'unit_variants',
                                localField: 'unit',
                                foreignField: 'unit',
                                as: 'unit_portrait',
                                pipeline: [
                                    {
                                        $project: { unit_card: 1 },
                                    },
                                ],
                            },
                        },
                        {
                            $set: { unit_portrait: { $arrayElemAt: ['$unit_portrait.unit_card', 0] } },
                        },
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
                    ],
                },
            },
        ],
        { allowDiskUse: true }
    );
};

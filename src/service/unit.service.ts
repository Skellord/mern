import { Types } from 'mongoose';
import { Unit } from '../../types/units.types';
import { UnitModel } from '../models/unit.model';
import { bulletPointAggregation } from '../utils/bulletPoint.aggregation';
import { iconsAggregation } from '../utils/icons.aggregation';

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

    async getUnitWithStats(id: Types.ObjectId) {
        return await UnitModel.aggregate(
            [
                {
                    $match: { _id: id },
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
                {
                    $lookup: {
                        from: 'melee_weapons',
                        localField: 'stats.primary_melee_weapon',
                        foreignField: 'key',
                        as: 'melee_damage',
                    },
                },
                {
                    $lookup: {
                        from: 'missile_weapons',
                        localField: 'stats.primary_missile_weapon',
                        foreignField: 'key',
                        as: 'missile_damage',
                    },
                },
                {
                    $unwind: { path: '$missile_damage', preserveNullAndEmptyArrays: true },
                },
                {
                    $lookup: {
                        from: 'projectiles',
                        localField: 'missile_damage.default_projectile',
                        foreignField: 'key',
                        as: 'missile_damage',
                    },
                },
                {
                    $unwind: '$melee_damage',
                },
                {
                    $unwind: { path: '$missile_damage', preserveNullAndEmptyArrays: true },
                },
                {
                    $lookup: {
                        from: 'man_entity',
                        localField: 'stats.man_entity',
                        foreignField: 'key',
                        as: 'entity',
                    },
                },
                {
                    $unwind: { path: '$entity', preserveNullAndEmptyArrays: true },
                },
                {
                    $lookup: {
                        from: 'mounts',
                        localField: 'stats.mount',
                        foreignField: 'key',
                        as: 'mount_entity',
                    },
                },
                {
                    $unwind: { path: '$mount_entity', preserveNullAndEmptyArrays: true },
                },
                {
                    $lookup: {
                        from: 'man_entity',
                        localField: 'mount_entity.entity',
                        foreignField: 'key',
                        as: 'mount_entity',
                    },
                },
                {
                    $unwind: { path: '$mount_entity', preserveNullAndEmptyArrays: true },
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
                        from: 'bullet_point_overrides',
                        localField: 'unit',
                        foreignField: 'unit_key',
                        as: 'specials',
                        pipeline: [
                            {
                                $group: {
                                    _id: null,
                                    specials: { $addToSet: '$bullet_point' },
                                },
                            },
                        ],
                    },
                },
                {
                    $set: { specials: { $arrayElemAt: ['$specials.specials', 0] } },
                },
                {
                    $lookup: {
                        from: 'bullet_point_list',
                        localField: 'specials',
                        foreignField: 'key',
                        as: 'specs',
                        pipeline: [
                            {
                                $project: {
                                    _id: 0,
                                    key: 1,
                                    state: 1,
                                },
                            },
                        ],
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
                    $lookup: {
                        from: 'unit_attrubutes_to_group',
                        localField: 'stats.attribute_group',
                        foreignField: 'attribute_group',
                        as: 'attributes',
                        pipeline: [
                            {
                                $group: { _id: 0, attributes: { $addToSet: '$attribute' } },
                            },
                        ],
                    },
                },
                {
                    $set: { attributes: { $arrayElemAt: ['$attributes.attributes', 0] } },
                },
            ],
            {
                allowDiskUse: true,
            }
        );
    }
}

export default new UnitService();

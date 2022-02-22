import { Types } from 'mongoose';
import { UnitModel } from '../models/unit.model';

const regexZero = /0$/g;

class UnitService {
    async getAllUnits() {
        return await UnitModel.find();
    }

    async getAllFactions() {
        return await UnitModel.distinct('faction');
    }

    async getOneFaction(faction: string) {
        return await UnitModel.aggregate(
            [
                {
                    $match: { faction: faction, unit: { $regex: regexZero } },
                },
                {
                    $lookup: {
                        from: 'permission',
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
            ],
            { allowDiskUse: true }
        );
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
                        from: 'permission',
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
            ],
            {
                allowDiskUse: true,
            }
        );
    }
}

export default new UnitService();

import { UnitModel } from '../models/unit.model';
import { Request, Response } from 'express';
import mongoose from 'mongoose';

interface FactionParams {
    faction: string;
}

interface FactionCasteParams extends FactionParams {
    type: string;
}

const regexZero = /0$/g;

class UnitsController {
    async getOne(req: Request, res: Response) {
        try {
            const unit = await UnitModel.findById(req.params.id);
            res.json(unit);
        } catch (e) {
            res.status(404).json(e);
        }
    }

    async getAll(req: Request, res: Response) {
        try {
            const units = await UnitModel.find();
            res.json(units);
        } catch (e) {
            res.status(500).json(e);
        }
    }

    async getAllFactions(req: Request, res: Response) {
        try {
            const factions = await UnitModel.distinct('faction');
            res.json(factions);
        } catch (e) {
            res.status(500).json(e);
        }
    }

    async getOneFaction(req: Request<FactionParams>, res: Response) {
        try {
            const faction = req.params.faction;

            const units = await UnitModel.find({ faction: faction, unit: { $regex: regexZero } });
            res.json(units);
        } catch (e) {
            res.status(500).json(e);
        }
    }

    async getOneFactionCaste(req: Request<FactionCasteParams>, res: Response) {
        try {
            const faction = req.params.faction;
            const type = req.params.type;
            const isWithZero = type === 'lord' || type === 'hero';
            const units = isWithZero
                ? await UnitModel.find({ faction: faction, caste: type, unit: { $regex: regexZero } })
                : await UnitModel.find({ faction: faction, caste: type });

            res.json(units);
        } catch (e) {
            res.status(500).json(e);
        }
    }

    async getUnitStats(req: Request, res: Response) {
        try {
            const id = new mongoose.Types.ObjectId(req.params.id);
            const unitStats = await UnitModel.aggregate(
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
                ],
                {
                    allowDiskUse: true,
                }
            );

            res.json(unitStats);
        } catch (e) {
            res.status(500).json(e);
        }
    }
}

export default new UnitsController();

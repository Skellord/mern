import { Request, Response } from 'express';
import { StatsModel } from '../models/stats.model';

interface StatsParams {
    key: string;
}

class StatsController {
    async getUnitStats(req: Request<StatsParams>, res: Response) {
        try {
            const stats = await StatsModel.aggregate(
                [
                    {
                        $match: { key: req.params.key },
                    },
                    {
                        $lookup: {
                            from: 'melee_weapons',
                            localField: 'primary_melee_weapon',
                            foreignField: 'key',
                            as: 'melee_damage',
                        },
                    },
                    {
                        $lookup: {
                            from: 'missile_weapons',
                            localField: 'primary_missile_weapon',
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
                            localField: 'man_entity',
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
                            localField: 'mount',
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
            res.json(stats);
        } catch (e) {
            res.status(404).json(e);
        }
    }
}

export default new StatsController();

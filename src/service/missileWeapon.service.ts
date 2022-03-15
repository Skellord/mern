import { MissileDamage } from '../../types/units.types';
import { MissileWeaponsModel } from '../models/missileWeapons.model';

class MissileWeaponService {
    async getMissileWeapon(key: string): Promise<MissileDamage[]> {
        return await MissileWeaponsModel.aggregate([
            {
                $match: { key },
            },
            {
                $project: { _id: 0, key: 0 },
            },
            {
                $lookup: {
                    from: 'projectiles',
                    localField: 'default_projectile',
                    foreignField: 'key',
                    as: 'missile_damage',
                    pipeline: [
                        {
                            $project: { _id: 0, key: 0 },
                        },
                    ],
                },
            },
            {
                $unwind: { path: '$missile_damage', preserveNullAndEmptyArrays: true },
            },
        ]);
    }
}

export default new MissileWeaponService();

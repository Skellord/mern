import { MeleeDamage } from '../../types/units.types';
import { MeleeWeaponsModel } from '../models/meleeWeapons.model';

class MeleeWeaponService {
    async getMeleeWeapon(key: string): Promise<MeleeDamage[]> {
        return await MeleeWeaponsModel.aggregate([
            {
                $match: { key },
            },
            {
                $project: { _id: 0 },
            },
        ]);
    }
}

export default new MeleeWeaponService();

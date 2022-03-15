import { Entity, Mount } from '../../types/units.types';
import { EntityModel } from '../models/entity.model';
import { MountsModel } from '../models/mounts.model';

class EntityService {
    async getEntity(key: string): Promise<Entity[]> {
        return await EntityModel.aggregate([
            {
                $match: {
                    key,
                },
            },
            {
                $project: {
                    _id: 0,
                    key: 0,
                    enable_engine_crew_turn_in_movement_direction: 0,
                },
            },
        ]);
    }

    async getMountEntity(key: string): Promise<Mount[]> {
        return await MountsModel.aggregate([
            {
                $match: { key },
            },
        ]);
    }
}

export default new EntityService();

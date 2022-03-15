import { Schema, model } from 'mongoose';
import { TypeTransformer } from '../../types/typeTransformer';
import { Unit } from '../../types/units.types';

const schema = new Schema<TypeTransformer<Unit>>({
    _id: { type: Schema.Types.ObjectId },
    unit: { type: String },
    caste: { type: String },
    land_unit: { type: String, ref: 'UnitStats' },
    num_men: { type: String },
    multiplayer_cap: { type: String },
    multiplayer_cost: { type: String },
    recruitment_cost: { type: String },
    upkeep_cost: { type: String },
    weight: { type: String },
    unique_index: { type: String },
    tier: { type: String },
    is_high_threat: { type: String },
    mount: { type: String },
    can_siege: { type: String },
    food_cost: { type: String },
    is_monstrous: { type: String },
    multiplayer_qb_cap: { type: String },
    faction: { type: String, ref: 'Faction' },
    melee_cp: { type: String },
    missile_cp: { type: String },
    create_time: { type: String },
});

export const UnitModel = model('Unit', schema, process.env.MAIN_COLLECTION);

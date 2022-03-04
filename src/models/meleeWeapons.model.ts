import { model, Schema } from 'mongoose';

const schema = new Schema({
    id: { type: Schema.Types.ObjectId, required: true, unique: true },
    key: { type: String },
    bonus_v_cavalry: { type: String },
    bonus_v_large: { type: String },
    bonus_v_infantry: { type: String },
    damage: { type: String },
    ap_damage: { type: String },
    weapon_length: { type: String },
    melee_weapon_type: { type: String },
    splash_attack_max_attacks: { type: String },
    splash_attack_power_multiplier: { type: String },
    building_damage: { type: String },
    ignition_amount: { type: String },
    is_magical: { type: String },
    melee_attack_interval: { type: String },
});

export const MeleeWeaponsModel = model('Melee', schema, process.env.MELEE_WEAPONS_COLLECTION);

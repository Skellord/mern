import { Schema, model, Types } from 'mongoose';

const subschema = new Schema({
    key: { type: String },
    accuracy: { type: String },
    armour: { type: String },
    campaign_action_points: { type: String },
    category: { type: String },
    charge_bonus: { type: String },
    class: { type: String },
    dismounted_charge_bonus: { type: String },
    dismounted_melee_attack: { type: String },
    historical_description_text: { type: String },
    melee_attack: { type: String },
    melee_defence: { type: String },
    morale: { type: String },
    bonus_hit_points: { type: String },
    mount: { type: String },
    shield: { type: String },
    short_description_text: { type: String },
    attribute_group: { type: String },
    reload: { type: String },
    capture_power: { type: String },
    secondary_ammo: { type: String },
    primary_ammo: { type: String },
    damage_mod_flame: { type: String },
    damage_mod_magic: { type: String },
    num_engines: { type: String },
    damage_mod_physical: { type: String },
    damage_mod_missile: { type: String },
    damage_mod_all: { type: String },
    can_skirmish: { type: String },
    mounted_draughts: { type: String },
    sync_locomotion: { type: String },
    can_brace: { type: String },
});

const schema = new Schema({
    id: { type: Types.ObjectId, required: true, unique: true },
    unit: { type: String },
    caste: { type: String },
    land_unit: { type: String },
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
    faction: { type: String },
    stats: { type: subschema },
});

export const UnitModel = model('Unit', schema);
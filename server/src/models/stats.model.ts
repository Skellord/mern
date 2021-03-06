import { model, Schema } from 'mongoose';
import { TypeTransformer } from '../../types/typeTransformer';
import { UnitStats } from '../../types/units.types';

const schema = new Schema<TypeTransformer<UnitStats>>({
    _id: { type: Schema.Types.ObjectId },
    key: { type: String, ref: 'Unit' },
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
    man_entity: { type: String },
    primary_melee_weapon: { type: String },
});

export const UnitStatsModel = model('UnitStats', schema, process.env.STATS_COLLECTION);

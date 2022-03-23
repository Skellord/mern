import { model, Schema } from 'mongoose';

const schema = new Schema({
    id: { type: Schema.Types.ObjectId, required: true, unique: true },
    key: { type: String },
    projectile_number: { type: String },
    effective_range: { type: String },
    minimum_range: { type: String },
    max_elevation: { type: String },
    marksmanship_bonus: { type: String },
    damage: { type: String },
    ap_damage: { type: String },
    base_reload_time: { type: String },
    calibration_distance: { type: String },
    calibration_area: { type: String },
    bonus_v_infantry: { type: String },
    bonus_v_cavalry: { type: String },
    bonus_v_large: { type: String },
    can_damage_buildings: { type: String },
    is_grapple: { type: String },
    ignition_amount: { type: String },
    is_magical: { type: String },
    can_target_airborne: { type: String },
    shots_per_volley: { type: String },
    fired_by_mount: { type: String },
    lock_on_multiple_fire_pos: { type: String },
    can_damage_vehicles: { type: String },
});

export const ProjectileModel = model('Projectile', schema, process.env.PROJECTILE_COLLECTION);

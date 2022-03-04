import { model, Schema } from 'mongoose';

const schema = new Schema({
    id: { type: Schema.Types.ObjectId, required: true, unique: true },
    key: { type: String },
    precursor: { type: String },
    default_projectile: { type: String },
    use_secondary_ammo_pool: { type: String },
});

export const MissileWeaponsModel = model('Missile', schema, process.env.MISSILE_WEAPONS_COLLECTION);

import { model, Schema, Types } from 'mongoose';

const schema = new Schema({
    id: { type: Types.ObjectId, required: true, unique: true },
    key: { type: String },
    walk_speed: { type: String },
    run_speed: { type: String },
    mass: { type: String },
    fly_speed: { type: String },
});

export const EntityModel = model('Entity', schema, process.env.ENTITY_COLLECTION);

import { model, Schema, Types } from 'mongoose';

const schema = new Schema({
    id: { type: Types.ObjectId, required: true, unique: true },
    key: { type: String },
    entity: { type: String },
});

export const MountsModel = model('Mounts', schema, process.env.MOUNTS_COLLECTION);

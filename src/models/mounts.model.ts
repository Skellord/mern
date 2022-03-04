import { model, Schema } from 'mongoose';

const schema = new Schema({
    id: { type: Schema.Types.ObjectId, required: true, unique: true },
    key: { type: String },
    entity: { type: String },
});

export const MountsModel = model('Mounts', schema, process.env.MOUNTS_COLLECTION);

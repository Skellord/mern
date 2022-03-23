import { model, Schema } from 'mongoose';
import { TypeTransformer } from '../../types/typeTransformer';
import { Mount } from '../../types/units.types';

const schema = new Schema<TypeTransformer<Mount>>({
    _id: { type: Schema.Types.ObjectId },
    key: { type: String },
    entity: { type: String },
});

export const MountsModel = model('Mounts', schema, process.env.MOUNTS_COLLECTION);

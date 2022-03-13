import { model, Schema } from 'mongoose';
import { TypeTransformer } from '../../types/typeTransformer';
import { Localization } from '../../types/localization.types';

const schema = new Schema<TypeTransformer<Localization>>({
    _id: { type: Schema.Types.ObjectId },
    key: { type: String },
    text: { type: String },
});

export const LandUnitLocModel = model('LandUnitLoc', schema, process.env.LAND_UNITS_LOC_COLLECTION);

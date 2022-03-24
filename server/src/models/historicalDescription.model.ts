import { model, Schema } from 'mongoose';
import { TypeTransformer } from '../../types/typeTransformer';
import { Localization } from '../../types/localization.types';

const schema = new Schema<TypeTransformer<Localization>>({
    _id: { type: Schema.Types.ObjectId },
    key: { type: String },
    text: { type: String },
});

export const HistoricalDescModel = model('HistoricalDesc', schema, process.env.HISTORICAL_DESC_EN_COLLECTION);

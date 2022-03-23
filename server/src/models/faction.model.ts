import { model, Schema } from 'mongoose';
import { Faction } from '../../types/faction.types';
import { TypeTransformer } from '../../types/typeTransformer';

const schema = new Schema<TypeTransformer<Faction>>({
    _id: { type: Schema.Types.ObjectId },
    faction: { type: String, ref: 'Unit' },
});

export const FactionModel = model('Faction', schema, 'factions');

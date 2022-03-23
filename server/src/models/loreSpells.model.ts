import { model, Schema } from 'mongoose';
import { TypeTransformer } from '../../types/typeTransformer';
import { LoreSpells } from '../../types/loreSpells.types';

const schema = new Schema<TypeTransformer<LoreSpells>>({
    _id: Schema.Types.ObjectId,
    ability_group: { type: String },
    unit: { type: String },
});

export const LoreSpellsModel = model('LoreSpells', schema, process.env.LORE_SPELLS_COLLECTION);

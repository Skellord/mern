import { model, Schema } from 'mongoose';
import { SpecialAbility } from '../../types/specialAbility.types';
import { TypeTransformer } from '../../types/typeTransformer';

const schema = new Schema<TypeTransformer<SpecialAbility>>({
    _id: { type: Schema.Types.ObjectId },
    ability: { type: String },
    land_unit: { type: String },
});

export const SpecialAbilityModel = model('SpecialAbility', schema, process.env.SPECIAL_ABILITY_COLLECTION);

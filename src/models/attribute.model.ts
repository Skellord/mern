import { model, Schema } from 'mongoose';

const schema = new Schema({
    _id: { type: Schema.Types.ObjectId },
    attribute: { type: String },
    attribute_group: { type: String },
});

export const AttributeModel = model('Attribute', schema, 'unit_attrubutes_to_group');

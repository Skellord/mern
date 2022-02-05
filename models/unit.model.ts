import { Schema, model, Types } from 'mongoose'

const schema = new Schema({
    id: { type: Types.ObjectId, required: true, unique: true },
    name: { type: String },
    localized_name: { type: String },
})

export const UnitModel = model('Unit', schema)

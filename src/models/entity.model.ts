import { model, Schema } from 'mongoose';
import { TypeTransformer } from '../../types/typeTransformer';
import { Entity } from '../../types/units.types';

const schema = new Schema<TypeTransformer<Entity>>({
    _id: { type: Schema.Types.ObjectId },
    key: { type: String },
    walk_speed: { type: String },
    run_speed: { type: String },
    mass: { type: String },
    fly_speed: { type: String },
});

export const EntityModel = model('Entity', schema, process.env.ENTITY_COLLECTION);

import { Types } from 'mongoose';

export type TypeTransformer<T extends object> = {
    _id: Types.ObjectId;
} & Omit<T, '_id'>;

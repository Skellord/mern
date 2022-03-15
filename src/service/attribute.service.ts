import { AttributeModel } from '../models/attribute.model';

interface AttributeResponse {
    attributes: string[];
}

class AttributeService {
    async getAttributes(attribute_group: string): Promise<AttributeResponse[]> {
        return await AttributeModel.aggregate([
            {
                $match: {
                    attribute_group,
                },
            },
            {
                $group: { _id: 0, attributes: { $addToSet: '$attribute' } },
            },
        ]);
    }
}

export default new AttributeService();

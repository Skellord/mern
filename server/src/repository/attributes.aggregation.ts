export const attributeAgregation = [
    {
        $lookup: {
            from: 'unit_attrubutes_to_group',
            localField: 'stats.attribute_group',
            foreignField: 'attribute_group',
            as: 'attributes',
            pipeline: [
                {
                    $set: { loc_key: { $concat: ['unit_attributes_imued_effect_text_', '$attribute'] } },
                },
                {
                    $lookup: {
                        from: 'unit_attributes_loc',
                        localField: 'loc_key',
                        foreignField: 'key',
                        as: 'local_name',
                        pipeline: [
                            {
                                $project: {
                                    text: 1,
                                    _id: 0,
                                },
                            },
                        ],
                    },
                },
                {
                    $set: { local_name: { $arrayElemAt: ['$local_name.text', 0] } },
                },
                {
                    $project: {
                        _id: 0,
                        attribute: 1,
                        local_name: 1,
                    },
                },

                // {
                //     $group: { _id: 1, attributes: { $addToSet: '$attribute' } },
                // },
            ],
        },
    },

    // {
    //     $set: { attributes: { $arrayElemAt: ['$attributes.attributes', 0] } },
    // },
];

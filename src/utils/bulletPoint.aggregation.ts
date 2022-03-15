export const bulletPointAggregation = [
    {
        $lookup: {
            from: 'bullet_point_overrides',
            localField: 'unit',
            foreignField: 'unit_key',
            as: 'specials',
            pipeline: [
                {
                    $group: {
                        _id: null,
                        specials: { $addToSet: '$bullet_point' },
                    },
                },
            ],
        },
    },
    {
        $set: { specials: { $arrayElemAt: ['$specials.specials', 0] } },
    },
    {
        $lookup: {
            from: 'bullet_point_list',
            localField: 'specials',
            foreignField: 'key',
            as: 'specs',
            pipeline: [
                {
                    $project: {
                        _id: 0,
                        key: 1,
                        state: 1,
                    },
                },
            ],
        },
    },
    {
        $project: {
            specials: 0,
        },
    },
];

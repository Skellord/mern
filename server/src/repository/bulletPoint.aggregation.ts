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
                    $set: { loc_key: { $concat: ['ui_unit_bullet_point_enums_onscreen_name_', '$key'] } },
                },
                {
                    $lookup: {
                        from: 'ui_unit_bullet_point_enums_loc',
                        localField: 'loc_key',
                        foreignField: 'key',
                        as: 'local_name',
                    },
                },
                {
                    $set: { local_name: { $arrayElemAt: ['$local_name.text', 0] } },
                },
                {
                    $project: {
                        _id: 0,
                        key: 1,
                        state: 1,
                        local_name: 1,
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

export const specialAbilitiesAggregation = [
    {
        $lookup: {
            from: 'land_units_abilities',
            localField: 'land_unit',
            foreignField: 'land_unit',
            as: 'special_abilities',
            pipeline: [
                {
                    $set: { loc_key: { $concat: ['unit_abilities_onscreen_name_', '$ability'] } },
                },
                {
                    $lookup: {
                        from: 'unit_abilities_loc',
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
                        ability: 1,
                        local_name: 1,
                    },
                },
            ],
        },
    },
];

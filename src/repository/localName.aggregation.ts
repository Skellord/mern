export const localNameAggregation = [
    {
        $set: { loc_key: { $concat: ['land_units_onscreen_name_', '$unit'] } },
    },
    {
        $lookup: {
            from: 'land_units_loc',
            localField: 'loc_key',
            foreignField: 'key',
            as: 'local_name',
        },
    },
    {
        $set: {
            local_name: { $arrayElemAt: ['$local_name.text', 0] },
        },
    },
    {
        $project: {
            loc_key: 0,
        },
    },
];

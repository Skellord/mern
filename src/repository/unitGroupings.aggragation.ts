const collName = 'ui_unit_groupings_loc';
export const unitGroupingsAggregation = [
    {
        $set: { group_key: { $concat: ['ui_unit_groupings_onscreen_', '$ui_unit_group_land'] } },
    },
    {
        $lookup: {
            from: collName,
            localField: 'group_key',
            foreignField: 'key',
            as: 'group_name',
        },
    },
    {
        $set: { group_name: { $arrayElemAt: ['$group_name.text', 0] } },
    },
    {
        $project: {
            group_key: 0,
        },
    },
];

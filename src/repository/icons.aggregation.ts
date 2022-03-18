export const iconsAggregation = [
    {
        $lookup: {
            from: 'battle_permission',
            localField: 'unit',
            foreignField: 'unit',
            as: 'lord_portrait',
            pipeline: [
                {
                    $project: { general_portrait: 1 },
                },
            ],
        },
    },
    {
        $set: { lord_portrait: { $arrayElemAt: ['$lord_portrait.general_portrait', 0] } },
    },
    {
        $lookup: {
            from: 'unit_variants',
            localField: 'unit',
            foreignField: 'unit',
            as: 'unit_portrait',
            pipeline: [
                {
                    $project: { unit_card: 1 },
                },
            ],
        },
    },
    {
        $set: { unit_portrait: { $arrayElemAt: ['$unit_portrait.unit_card', 0] } },
    },
    {
        $lookup: {
            from: 'ui_unit_icons',
            localField: 'ui_unit_group_land',
            foreignField: 'key',
            as: 'icon',
            pipeline: [
                {
                    $project: { icon: 1 },
                },
            ],
        },
    },
    {
        $set: { icon: { $arrayElemAt: ['$icon.icon', 0] } },
    },
];

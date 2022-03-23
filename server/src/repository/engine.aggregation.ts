export const engineAggregation = [
    {
        $lookup: {
            from: 'battle_engines',
            localField: 'stats.engine',
            foreignField: 'key',
            as: 'engine',
            pipeline: [
                {
                    $project: {
                        _id: 0,
                        missile_weapon: 1,
                        battle_entity: 1,
                    },
                },
            ],
        },
    },
    {
        $unwind: { path: '$engine', preserveNullAndEmptyArrays: true },
    },
];

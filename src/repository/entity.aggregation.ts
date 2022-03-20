export const entityAggregation = [
    {
        $lookup: {
            from: 'battle_entities',
            localField: 'stats.man_entity',
            foreignField: 'key',
            as: 'entity.man_entity',
        },
    },
    {
        $unwind: { path: '$entity.man_entity', preserveNullAndEmptyArrays: true },
    },
    {
        $lookup: {
            from: 'mounts',
            localField: 'stats.mount',
            foreignField: 'key',
            as: 'entity.mount_entity',
        },
    },
    {
        $unwind: { path: '$entity.mount_entity', preserveNullAndEmptyArrays: true },
    },
    {
        $lookup: {
            from: 'battle_entities',
            localField: 'entity.mount_entity.entity',
            foreignField: 'key',
            as: 'entity.mount_entity',
        },
    },
    {
        $unwind: { path: '$entity.mount_entity', preserveNullAndEmptyArrays: true },
    },
    {
        $lookup: {
            from: 'battle_entities',
            localField: 'engine.battle_entity',
            foreignField: 'key',
            as: 'entity.engine_entity',
        },
    },
    {
        $unwind: { path: '$entity.engine_entity', preserveNullAndEmptyArrays: true },
    },
];

export const entityAggregation = [
    {
        $lookup: {
            from: 'man_entity',
            localField: 'stats.man_entity',
            foreignField: 'key',
            as: 'entity',
        },
    },
    {
        $unwind: { path: '$entity', preserveNullAndEmptyArrays: true },
    },
    {
        $lookup: {
            from: 'mounts',
            localField: 'stats.mount',
            foreignField: 'key',
            as: 'mount_entity',
        },
    },
    {
        $unwind: { path: '$mount_entity', preserveNullAndEmptyArrays: true },
    },
    {
        $lookup: {
            from: 'man_entity',
            localField: 'mount_entity.entity',
            foreignField: 'key',
            as: 'mount_entity',
        },
    },
    {
        $unwind: { path: '$mount_entity', preserveNullAndEmptyArrays: true },
    },
];

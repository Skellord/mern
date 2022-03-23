export const damageAggregation = [
    {
        $lookup: {
            from: 'melee_weapons',
            localField: 'stats.primary_melee_weapon',
            foreignField: 'key',
            as: 'damage.melee_damage',
        },
    },
    {
        $unwind: '$damage.melee_damage',
    },
    {
        $lookup: {
            from: 'missile_weapons',
            localField: 'stats.primary_missile_weapon',
            foreignField: 'key',
            as: 'damage.missile_damage',
        },
    },
    {
        $lookup: {
            from: 'projectiles',
            localField: 'damage.missile_damage.default_projectile',
            foreignField: 'key',
            as: 'damage.missile_damage',
            pipeline: [
                {
                    $lookup: {
                        from: 'projectile_explosions',
                        localField: 'explosion_type',
                        foreignField: 'key',
                        as: 'explosion',
                    },
                },
            ],
        },
    },
    {
        $unwind: { path: '$damage.missile_damage', preserveNullAndEmptyArrays: true },
    },
    {
        $unwind: { path: '$damage.missile_damage.explosion', preserveNullAndEmptyArrays: true },
    },
    {
        $lookup: {
            from: 'missile_weapons',
            localField: 'engine.missile_weapon',
            foreignField: 'key',
            as: 'damage.engine_damage',
        },
    },

    {
        $lookup: {
            from: 'projectiles',
            localField: 'damage.engine_damage.default_projectile',
            foreignField: 'key',
            as: 'damage.engine_damage',
            pipeline: [
                {
                    $lookup: {
                        from: 'projectile_explosions',
                        localField: 'explosion_type',
                        foreignField: 'key',
                        as: 'explosion',
                    },
                },
            ],
        },
    },
    {
        $unwind: { path: '$damage.engine_damage', preserveNullAndEmptyArrays: true },
    },
    {
        $unwind: { path: '$damage.engine_damage.explosion', preserveNullAndEmptyArrays: true },
    },
];

export const damageAggregation = [
    {
        $lookup: {
            from: 'melee_weapons',
            localField: 'stats.primary_melee_weapon',
            foreignField: 'key',
            as: 'melee_damage',
        },
    },
    {
        $unwind: '$melee_damage',
    },
    {
        $lookup: {
            from: 'missile_weapons',
            localField: 'stats.primary_missile_weapon',
            foreignField: 'key',
            as: 'missile_damage',
        },
    },
    {
        $unwind: { path: '$missile_damage', preserveNullAndEmptyArrays: true },
    },
    {
        $lookup: {
            from: 'projectiles',
            localField: 'missile_damage.default_projectile',
            foreignField: 'key',
            as: 'missile_damage',
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
        $lookup: {
            from: 'missile_weapons',
            localField: 'engine.missile_weapon',
            foreignField: 'key',
            as: 'missile_damage',
        },
    },

    {
        $lookup: {
            from: 'projectiles',
            localField: 'missile_damage.default_projectile',
            foreignField: 'key',
            as: 'missile_damage',
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
        $unwind: { path: '$missile_damage', preserveNullAndEmptyArrays: true },
    },
    {
        $unwind: { path: '$missile_damage.explosion', preserveNullAndEmptyArrays: true },
    },
];

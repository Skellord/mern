export const loreSpellsAggregation = [
    {
        $lookup: {
            from: 'special_ability_to_group',
            localField: 'unit',
            foreignField: 'unit',
            as: 'lore_spells',
            pipeline: [
                {
                    $lookup: {
                        from: 'lore_spells',
                        localField: 'ability_group',
                        foreignField: 'special_ability_groups',
                        as: 'lore_spells',
                        pipeline: [
                            {
                                $set: {
                                    loc_key: { $concat: ['unit_abilities_onscreen_name_', '$unit_special_abilities'] },
                                },
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
                                    unit_special_abilities: 1,
                                    local_name: 1,
                                },
                            },
                        ],
                    },
                },
            ],
        },
    },
    {
        $set: { lore_spells: { $arrayElemAt: ['$lore_spells.lore_spells', 0] } },
    },
];

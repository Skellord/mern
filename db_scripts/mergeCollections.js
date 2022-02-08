const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGO_URI || 'mongodb://localhost:27017';

const client = new MongoClient(uri);

const dbName = process.env.DB_NAME || 'test';
const first_collection = process.env.FIRST_IMPORT_COLLECTION_NAME || 'collection';
const second_collection = process.env.SECOND_IMPORT_COLLECTION_NAME || 'collection';
const finalCollection = process.env.UNIT_COLLECTION || 'collection';

const factions = [
    {
        name: 'skaven',
        reg: 'skv',
    },
    {
        name: 'tombKings',
        reg: 'tmb',
    },
    {
        name: 'darkElves',
        reg: 'def',
    },
    {
        name: 'highElves',
        reg: 'hef',
    },
    {
        name: 'vampireCoast',
        reg: 'cst',
    },
    {
        name: 'vampireCounts',
        reg: 'vmp',
    },
    {
        name: 'lizardmens',
        reg: 'lzd',
    },
    {
        name: 'empire',
        reg: 'emp',
    },
    {
        name: 'greenSkins',
        reg: 'grn',
    },
    {
        name: 'woodElves',
        reg: 'wef',
    },
    {
        name: 'beastmens',
        reg: 'bst',
    },
    {
        name: 'bretonnia',
        reg: 'brt',
    },
    {
        name: 'ogres',
        reg: 'ogr',
    },
    {
        name: 'chaos',
        reg: 'chs',
    },
    {
        name: 'norsca',
        reg: 'nor',
    },
    {
        name: 'dwarfs',
        reg: 'dwf',
    },
];

const startRegex = '^(?:[^_\n]+_){2}([';
const endRegex = ']+)(?:_[^_\n]+)*$';

async function addFactions(collection) {
    const result = Promise.all(
        factions.map(async item => {
            const expression = `${startRegex}${item.reg}${endRegex}`;
            const regex = new RegExp(expression, 'g');
            console.log(regex);
            return await collection.updateMany({ unit: { $regex: regex } }, { $set: { faction: item.name } });
        })
    );
    return result;
}

async function mergeCollections() {
    try {
        await client.connect();
        console.log(`Connected successfully to server ${uri}`);
        const db = client.db(dbName);
        const firstCollection = db.collection(first_collection);
        const secondCollection = db.collection(second_collection);
        await firstCollection.deleteMany({ is_naval: 'true' });
        await firstCollection.updateMany(
            {},
            {
                $unset: {
                    campaign_cap: '',
                    create_time: '',
                    prestige: '',
                    world_leader_only: '',
                    can_trade: '',
                    special_edition_mask: '',
                    audio_voiceover_culture: '',
                    in_encyclopedia: '',
                    num_ships: '',
                    min_men_per_ship: '',
                    max_men_per_ship: '',
                    ui_unit_group_naval: '',
                    porthole_camera: '',
                    use_hitpoints_in_campaign: '',
                    unit_scaling: '',
                    melee_cp: '',
                    missile_cp: '',
                    audio_voiceover_culture_override: '',
                    restrict_xp_gain_in_campaign: '',
                    audio_voiceover_actor_group: '',
                    has_spoken_vo: '',
                    vo_is_dragon: '',
                    vo_is_dinosaur: '',
                    porthole_composite_scene: '',
                    ui_unit_group_land: '',
                    is_naval: '',
                    naval_unit: '',
                },
            }
        );
        await secondCollection.updateMany(
            {},
            {
                $unset: {
                    man_animation: '',
                    man_entity: '',
                    num_animals: '',
                    num_mounts: '',
                    primary_melee_weapon: '',
                    rank_depth: '',
                    spacing: '',
                    'strengths_&_weaknesses_text': '',
                    supports_first_person: '',
                    training_level: '',
                    officers: '',
                    is_male: '',
                    visibility_spotting_range_min: '',
                    visibility_spotting_range_max: '',
                    ability_global_recharge: '',
                    spot_dist_tre: '',
                    spot_dist_scrub: '',
                    loose_spacing: '',
                    selection_vo: '',
                    selected_vo_secondary: '',
                    selected_vo_tertiary: '',
                    hiding_scalar: '',
                    ground_stat_effect_group: '',
                    ai_usage_group: '',
                    spot_dist_tree: '',
                },
            }
        );
        const items = await firstCollection
            .aggregate(
                [
                    {
                        $lookup: {
                            from: second_collection,
                            localField: 'unit',
                            foreignField: 'key',
                            as: 'stats',
                        },
                    },
                    {
                        $unwind: '$stats',
                    },
                    {
                        $unset: 'stats._id',
                    },
                ],
                { allowDiskUse: true }
            )
            .toArray();

        const newCollection = await db.collection(finalCollection).insertMany(items);
        console.log(newCollection);
        await addFactions(db.collection(finalCollection));
    } catch (e) {
        console.log(e);
    }
}

mergeCollections()
    .then(() => console.log('Merge successful'))
    .catch(e => console.error(e))
    .finally(() => client.close());

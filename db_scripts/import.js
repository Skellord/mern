const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGO_URI || 'mongodb://localhost:27017';

const client = new MongoClient(uri);

const dbName = process.env.DB_NAME || 'test';
const firstCollection = process.env.FIRST_IMPORT_COLLECTION_NAME || 'collection';

async function unsetFields() {
    try {
        await client.connect();
        console.log(`Connected successfully to server ${uri}`);
        const db = client.db(dbName);
        const collection = db.collection(firstCollection);
        const items = await collection.updateMany(
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
                    ui_unit_group_land: ''
                },
            }
        );
        console.log(items);
    } catch (e) {
        console.log(e);
    }
}

unsetFields()
    .then(() => console.log('Unset successful'))
    .catch(e => console.error(e))
    .finally(() => client.close());

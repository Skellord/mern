const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGO_URI || 'mongodb://localhost:27017';

const client = new MongoClient(uri);

const dbName = process.env.DB_NAME || 'test';
const secondCollection = process.env.SECOND_IMPORT_COLLECTION_NAME || 'collection';

async function unsetFields() {
    try {
        await client.connect();
        console.log(`Connected successfully to server ${uri}`);
        const db = client.db(dbName);
        const collection = db.collection(secondCollection);
        const items = await collection.updateMany(
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
                    "strengths_&_weaknesses_text": '',
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
                    spot_dist_tree: ''
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

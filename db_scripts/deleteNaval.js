const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGO_URI || 'mongodb://localhost:27017';

const client = new MongoClient(uri);

const dbName = process.env.DB_NAME || 'test';
const firstCollection = process.env.FIRST_IMPORT_COLLECTION_NAME || 'collection';

async function deleteFields() {
    try {
        await client.connect();
        console.log(`Connected successfully to server ${uri}`);
        const db = client.db(dbName);
        const collection = db.collection(firstCollection);
        const items = await collection.deleteMany({ is_naval: 'true' });
        console.log(items);
    } catch (e) {
        console.log(e);
    }
}

deleteFields()
    .then(() => console.log('Delete successful'))
    .catch(e => console.error(e))
    .finally(() => client.close());

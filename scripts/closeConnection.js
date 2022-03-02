const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGO_URI || 'mongodb://localhost:27017';

const client = new MongoClient(uri);

async function deleteFields() {
    try {
        await client.close();
    } catch (e) {
        console.log(e);
    }
}

deleteFields()
    .then(() => console.log('Connection closed'))
    .catch(e => console.error(e))

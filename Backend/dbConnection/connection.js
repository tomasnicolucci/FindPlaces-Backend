require('dotenv').config();
const mongoclient = require('mongodb').MongoClient;

const client = new mongoclient(process.env.MONGODB);

let instance = null;

async function getConnection(){
    if(instance == null){
        instance = await client.connect();
    }
    return instance;
}

module.exports = {getConnection};
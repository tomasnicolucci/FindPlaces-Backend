require('dotenv').config();
const { ObjectId } = require('mongodb');
const conn = require('../dbConnection/connection');
const DATABASE = 'FindPlaces';
const PLACES = 'places';

async function getPlaces(){
    const connection = await conn.getConnection();
    const places = await connection
                        .db(DATABASE)
                        .collection(PLACES)
                        .find()
                        .toArray();
    return places;
}

async function getPlace(id){
    const connection = await conn.getConnection();
    const place = await connection
                        .db(DATABASE)
                        .collection(PLACES)
                        .findOne({_id: new ObjectId(id)});
    return place;                   
}

async function addPlace(place){
    const connection = await conn.getConnection();
    const result = await connection
                        .db(DATABASE)
                        .collection(PLACES)
                        .insertOne(place);
    return result;                    
}

async function deletePlace(place){
    const connection = await conn.getConnection();
    const result = await connection
                        .db(DATABASE)
                        .collection(PLACES)
                        .deleteOne(place);
    return result;
}

async function putPlace(id, place){
    const connection = await conn.getConnection();
    const result = await connection
                        .db(DATABASE)
                        .collection(PLACES)
                        .updateOne({_id: new ObjectId(id)}, {$set: {}});
    return result;                    
}

module.exports = {getPlaces, getPlace, addPlace, deletePlace, putPlace}
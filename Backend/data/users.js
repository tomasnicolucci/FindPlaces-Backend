require('dotenv').config();
const { ObjectId } = require('mongodb');
const conn = require('../dbConnection/connection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const DATABASE = 'FindPlaces';
const USERS = 'users';

async function getUsers(){
    const connection = await conn.getConnection();
    const users = await connection
                        .db(DATABASE)
                        .collection(USERS)
                        .find()
                        .toArray();
    return users;
}

async function getUser(id){
    const connection = await conn.getConnection();
    const user = await connection
                        .db(DATABASE)
                        .collection(USERS)
                        .findOne({_id: new ObjectId(id)});
    return user;                   
}

async function addUser(user){
    const connection = await conn.getConnection();
    const result = await connection
                        .db(DATABASE)
                        .collection(USERS)
                        .insertOne(user);
    return result;                    
}

async function deleteUser(user){
    const connection = await conn.getConnection();
    const result = await connection
                        .db(DATABASE)
                        .collection(USERS)
                        .deleteOne(user);
    return result;
}

async function putUser(id, user){
    const connection = await conn.getConnection();
    const result = await connection
                        .db(DATABASE)
                        .collection(USERS)
                        .updateOne({_id: new ObjectId(id)}, {$set: {}});
    return result;                    
}

async function addFavorite(userId, newFavorites){
    const connection = await conn.getConnection();
    const result = await connection
                        .db(DATABASE)
                        .collection(USERS)
                        .updateOne({_id: new ObjectId(userId)}, {$set: {favorites: newFavorites}});
    return result;
}

async function findByCredential(email, password){
    const connection = await conn.getConnection();
    const user = await connection
                        .db(DATABASE)
                        .collection(USERS)
                        .findOne({email: email});
    if(!user){
        throw new Error('Usuario o contraseña incorrectos');
    }
    
    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch){
        throw new Error('Usuario o contraseña incorrectos');
    }
    return user;
}

async function generatedToken(user){
    const token = jwt.sign({_id: user._id, email: user.email}, process.env.CLAVE_TOKEN, {expiresIn: "1h"});
    return token;
}

module.exports = {getUsers, getUser, addUser, deleteUser, putUser, addFavorite, findByCredential, generatedToken};
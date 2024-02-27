const data = require('../data/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function getUsers(){
    return data.getUsers();
}

async function getUser(id){
    return data.getUser(id);
}

async function addUser(req, res){
    try{
        let userData= req.body;
        let password = await bcrypt.hash(userData.password,10);
        userData.password = password;
        userData.favorites = [];
        userData.visited= [];
        data.addUser(userData);
        res.status(201).json({message: 'Creado'});
    }catch{
        res.status(500).json({message: 'Error'});
    } 
}

async function deleteUser(id){
    let user = await getUser(id);
    if(user != undefined){
        return data.deleteUser(user);
    }else{
        console.log("Usuario no encontrado");
    }
}

async function putUser(id, user){
    return data.putUser(id, user);
}

async function addFavorite(idPlace, token){
    const userToken = token.split(' ').pop();
    const tokenData = jwt.verify(userToken, process.env.CLAVE_TOKEN);
    const userId = tokenData._id;
    const user = await getUser(userId);
    let favorites = user.favorites;
    favorites.push(idPlace);
    data.addFavorite(userId, favorites);
}

async function addVisited(idPlace, token){
    const userToken = token.split(' ').pop();
    const tokenData = jwt.verify(userToken, process.env.CLAVE_TOKEN);
    const userId = tokenData._id;
    const user = await getUser(userId);
    let visited = user.visited;
    visited.push(idPlace);
    data.addVisited(userId, visited);
}

async function findByCredential(email, password){
    return data.findByCredential(email, password);
}

async function generatedToken(user){
    return data.generatedToken(user);
}

module.exports = {getUsers, getUser, addUser, deleteUser, putUser, addFavorite, addVisited, findByCredential, generatedToken};
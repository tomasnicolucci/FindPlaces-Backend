const data = require('../data/users');
const bcrypt = require('bcrypt');
const {getTokenData} = require('../middlewares/auth');

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

async function addFavorite(idPlace, userToken){
    const tokenData = getTokenData(userToken);
    console.log(tokenData);
    return data.addFavorite(idPlace);
}

async function findByCredential(email, password){
    return data.findByCredential(email, password);
}

async function generatedToken(user){
    return data.generatedToken(user);
}

module.exports = {getUsers, getUser, addUser, deleteUser, putUser, addFavorite, findByCredential, generatedToken};
const data = require('../data/places');

async function getPlaces(){
    return data.getPlaces();
}

async function getPlace(id){
    return data.getPlace(id);
}

async function addPlace(req, res){
    try{
        data.addPlace(req.body);
        res.status(201).json({message: 'Creado'});
    }catch{
        res.status(500).json({message: 'Error'});
    } 
}

async function deletePlace(id){
    let place = await getPlace(id);
    if(place != undefined){
        return data.deletePlace(place);
    }else{
        console.log("Lugar no encontrado");
    }
}

async function putPlace(id, place){
    return data.putPlace(id, place);
}

module.exports = {getPlaces, getPlace, addPlace, deletePlace, putPlace};
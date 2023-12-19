const express = require('express');
const router = express.Router();
const controller = require('../controllers/places');
const {validatePlace} = require('../middlewares/placesValidation');

router.get('/', async (req, res) => {
    res.json(await controller.getPlaces());
})

router.get('/:id', async(req,res) => {
    res.json(await controller.getPlace(req.params.id));
})

router.post('/', validatePlace, async(req,res) => {
    try{
        res.json(await controller.addPlace(req,res));
    } catch(error){
        res.status(500).json({message: 'Route error'});
    }
})

router.delete('/:id', async(req,res) => {
    res.json(await controller.deletePlace(req.params.id));
})

router.put('/:id', async(req,res) => {
    res.json(await controller.putPlace(req.params.id, req.body));
})

module.exports = router;
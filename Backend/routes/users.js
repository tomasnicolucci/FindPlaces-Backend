const express = require('express');
const router = express.Router();
const controller = require('../controllers/users');
const {validateCreate} = require('../middlewares/usersValidation');

router.get('/', async(req,res) => {
    res.json(await controller.getUsers());
})

router.get('/:id', async(req,res) => {
    res.json(await controller.getUser(req.params.id));
})

router.post('/', validateCreate, async(req,res) => {
    try{
        res.json(await controller.addUser(req,res));
    } catch(error){
        res.status(500).json({message: 'Route error'});
    }
})

router.delete('/:id', async(req,res) => {
    res.json(await controller.deleteUser(req.params.id));
})

router.put('/:id', async(req,res) => {
    res.json(await controller.putUser(req.params.id, req.body));
})

router.post('/login', async(req,res) => {
    try{
        const user = await controller.findByCredential(req.body.email, req.body.password);
        const token = await controller.generatedToken(user);
        res.send({user, token});
    } catch(error) {
        res.status(401).send(error.message);
    }
})

router.post('/addFavorite', async(req, res) => {
    res.json(await controller.addFavorite(req.body.idPlan));
})

module.exports = router;
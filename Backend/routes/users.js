const express = require('express');
const router = express.Router();
const controller = require('../controllers/users');
const {validateCreate} = require('../middlewares/usersValidation');
const auth = require('../middlewares/auth');

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
        res.json({user, token});
    } catch(error) {
        res.status(400).send(error.message);
    }
})

router.post('/favs/add/:id', auth, async(req, res) => {
    res.json(await controller.addFavorite(req.params.id, req.headers.authorization));
})

router.post('/addVisited/:id', auth, async(req, res) => {
    res.json(await controller.addVisited(req.params.id, req.headers.authorization));
})

router.get('/favs/all', auth, async(req,res) => {
    res.json(await controller.getFavorites(req.headers.authorization));
})

router.get('/visited/all', auth, async(req,res) => {
    res.json(await controller.getVisited(req.headers.authorization));
})

module.exports = router;
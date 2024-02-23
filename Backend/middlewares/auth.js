require('dotenv').config();
const jwt = require('jsonwebtoken');

function auth(req, res, next){
    const token = req.headers.authorization.split(' ').pop();
    try{
        const user = jwt.verify(token, process.env.CLAVE_TOKEN);
        next();
    } catch (error){
        res.status(401).send({err1: error.message});
    }
}

module.exports = auth;
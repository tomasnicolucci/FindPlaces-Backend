require('dotenv').config();
const jwt = require('jsonwebtoken');

async function auth(req, res, next){
    const token = req.headers.authorization.split(' ').pop();
    try{
        const userToken = jwt.verify(token, process.env.CLAVE_TOKEN);
        //console.log(userToken);
        next();
    } catch (error){
        res.status(401).send({err1: error.message});
    }
}

module.exports = auth;
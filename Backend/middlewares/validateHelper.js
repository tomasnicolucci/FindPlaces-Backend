const { validationResult } = require('express-validator');

async function validateResult(req, res, next) {
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors : errors.array() })
        }
        await next();
    } catch(error) {
        res.status(500).json({message: 'Helper error'})
    }
}

module.exports = validateResult;
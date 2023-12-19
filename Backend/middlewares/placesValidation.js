const { body } = require('express-validator');
const validateResult = require('../middlewares/validateHelper');

const validatePlace = [
    body('name', 'Ingrese un nombre válido')
        .exists()
        .notEmpty(),
    body('description', 'Ingrese una descripción')
        .exists(),
    (req, res, next) => {
        validateResult(req,res,next);
    }
]

module.exports = {validatePlace};
const { body } = require('express-validator');
const validateResult = require('../middlewares/validateHelper');

const validateCreate = [
    body('name', 'Ingrese un nombre válido')
        .exists()
        .notEmpty(),
    body('email', 'Ingrese un email válido')
        .exists()
        .isEmail(),
    body('password', 'Ingrese una contraseña válida')
        .exists()
        .isLength({ min:8 }),
    (req, res, next) => {
        validateResult(req,res,next);
    }
]

module.exports = {validateCreate};
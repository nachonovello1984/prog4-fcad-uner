import { query, validationResult } from 'express-validator';
const estudiantesFindAllValidation = [
    query('documento')
        .optional()
        .isString().withMessage('documento debe ser una cadena de texto'),
    query('apellido')
        .optional()
        .notEmpty().withMessage('apellido no puede estar vacío')
        .isString().withMessage('apellido debe ser una cadena de texto'),
    query('nombres')
        .optional()
        .notEmpty().withMessage('nombres no puede estar vacío')
        .isString().withMessage('nombres debe ser una cadena de texto'),
    query('email')
        .optional()
        .isEmail().withMessage('email debe ser una dirección de correo válida'),
    query('limit')
        .optional()
        .isInt({ min: 0 }).withMessage('limit debe ser un entero no negativo')
        .toInt(),
    query('offset')
        .optional()
        .isInt({ min: 0 }).withMessage('offset debe ser un entero no negativo')
        .toInt(),
    query('order')
        .optional()
        .isIn(['documento', 'apellido', 'nombres', 'email']).withMessage('order debe ser uno de los siguientes valores: documento, apellido, nombres, email'),
    query('asc')
        .optional()
        .isBoolean().withMessage('asc debe ser un valor booleano'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

export default estudiantesFindAllValidation;

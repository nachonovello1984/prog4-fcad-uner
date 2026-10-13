import { body, validationResult } from 'express-validator';

// Reglas de validación del login
const rules = [
    body('username').isString().notEmpty(),
    body('password').isString().notEmpty(),
];

// Responde 400 si alguna regla falla
const handleErrors = (req, res, next) => {
    if (!validationResult(req).isEmpty()) {
        return res.status(400).json({ message: 'Solicitud incorrecta' });
    }
    next();
};

const validateLogin = [...rules, handleErrors];

export default validateLogin;

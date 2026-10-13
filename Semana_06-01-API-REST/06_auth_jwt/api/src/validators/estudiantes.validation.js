import { body, param, query, validationResult } from 'express-validator';

const handleErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

const idParam = param('id').isInt({ min: 1 }).withMessage('id debe ser un entero positivo').toInt();

// Reglas del body. En POST/PUT todos los campos son obligatorios; en PATCH son opcionales pero al menos uno debe venir.
const bodyRules = (required) => {
    const field = (name) => {
        const chain = body(name);
        return required
            ? chain.exists({ values: 'null' }).withMessage(`${name} es obligatorio`).bail()
            : chain.optional();
    };
    return [
        field('documento').isString().notEmpty().withMessage('documento debe ser una cadena de texto no vacía'),
        field('apellido').isString().notEmpty().withMessage('apellido debe ser una cadena de texto no vacía'),
        field('nombres').isString().notEmpty().withMessage('nombres debe ser una cadena de texto no vacía'),
        field('email').isEmail().withMessage('email debe ser una dirección de correo válida'),
        field('fechaNacimiento').isISO8601({ strict: true }).withMessage('fechaNacimiento debe ser una fecha válida (YYYY-MM-DD)'),
        body('idUsuarioModificacion')
            .exists({ values: 'null' }).withMessage('idUsuarioModificacion es obligatorio').bail()
            .isInt({ min: 1 }).withMessage('idUsuarioModificacion debe ser un entero positivo').toInt(),
    ];
};

export const estudiantesFindByIdValidation = [idParam, handleErrors];

export const estudiantesCreateValidation = [...bodyRules(true), handleErrors];

export const estudiantesUpdateValidation = [idParam, ...bodyRules(true), handleErrors];

export const estudiantesPatchValidation = [
    idParam,
    ...bodyRules(false),
    body().custom((value) => {
        const campos = ['documento', 'apellido', 'nombres', 'email', 'fechaNacimiento'];
        if (!campos.some((c) => value?.[c] !== undefined)) {
            throw new Error(`Debe enviar al menos uno de: ${campos.join(', ')}`);
        }
        return true;
    }),
    handleErrors,
];

export const estudiantesDeleteValidation = [
    idParam,
    query('idUsuarioModificacion')
        .exists().withMessage('idUsuarioModificacion es obligatorio').bail()
        .isInt({ min: 1 }).withMessage('idUsuarioModificacion debe ser un entero positivo').toInt(),
    handleErrors,
];

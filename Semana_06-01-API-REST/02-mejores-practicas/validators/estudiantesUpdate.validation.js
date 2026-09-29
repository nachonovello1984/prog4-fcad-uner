import { body } from "express-validator";

const estudiantesUpdateValidation = (req, res, next) => {
    body("documento")
        .notEmpty().withMessage("El documento es obligatorio")
        .isLength({ min: 8, max: 8 }).withMessage("El documento debe tener 8 caracteres"),

    body("apellido")
        .notEmpty().withMessage("El apellido es obligatorio"),

    body("nombres")
        .notEmpty().withMessage("Los nombres son obligatorios"),

    body("email")
        .notEmpty().withMessage("El email es obligatorio")
        .isEmail().withMessage("El email debe ser válido"),

    body("fechaNacimiento")
        .notEmpty().withMessage("La fecha de nacimiento es obligatoria")
        .isDate().withMessage("La fecha de nacimiento debe ser una fecha válida")
        .isBefore().withMessage("La fecha de nacimiento debe ser una fecha pasada"),

    next();
}

export default estudiantesUpdateValidation;
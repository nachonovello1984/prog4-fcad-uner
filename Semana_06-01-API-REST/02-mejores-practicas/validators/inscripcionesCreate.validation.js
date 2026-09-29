import { body } from "express-validator";

const inscripcionesCreateValidation = (req, res, next) => {
    body("idCurso")
        .notEmpty().withMessage("El idCurso es obligatorio")
        .isInt().withMessage("El idCurso debe ser un entero"),

    body("idEstudiante")
        .notEmpty().withMessage("El idEstudiante es obligatorio")
        .isInt().withMessage("El idEstudiante debe ser un entero"),

    body("idInscripcionEstado")
        .notEmpty().withMessage("El idInscripcionEstado es obligatorio")
        .isInt().withMessage("El idInscripcionEstado debe ser un entero"),

    body("fechaHoraInscripcion")
        .notEmpty().withMessage("La fecha de inscripción es obligatoria")
        .isDate().withMessage("La fecha de inscripción debe ser una fecha válida"),

    next();
}

export default inscripcionesCreateValidation;
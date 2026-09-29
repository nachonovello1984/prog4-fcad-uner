import EstudianteCreateDto from "../dtos/estudiantes/estudiante.create.dto.js";

const estudiantesCreateTransform = (req, res, next) => {
    const { documento, apellido, nombres, email, fechaNacimiento } = req.body;
    req.dto = new EstudianteCreateDto({
        documento,
        apellido: apellido.trim().toUpperCase(),
        nombres: nombres.trim().toUpperCase(),
        email: email.trim(),
        fechaNacimiento
    });
    next();
};

export default estudiantesCreateTransform;
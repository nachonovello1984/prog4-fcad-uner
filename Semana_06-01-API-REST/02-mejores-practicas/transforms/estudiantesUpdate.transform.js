import EstudianteUpdateDto from "../dtos/estudiantes/estudiante.update.dto.js";

const estudiantesUpdateTransform = (req, res, next) => {
    const { documento, apellido, nombres, email, fechaNacimiento } = req.body;
    req.dto = new EstudianteUpdateDto({
        documento,
        apellido,
        nombres,
        email,
        fechaNacimiento,
        activo: 1,
        idUsuarioModificacion: 1
    });
    next();
};

export default estudiantesUpdateTransform;
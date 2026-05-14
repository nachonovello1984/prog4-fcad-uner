import EstudiantesRepository from "../repositories/estudiantes.repository.js";
import EstudianteResponseDTO from "../dtos/estudiante.response.dto.js";
import BaseService from './base.services.js';

export default class EstudiantesService extends BaseService {

    static KEYS_MAP = {
        idEstudiante: 'id_estudiante',
        documento: 'documento',
        apellido: 'apellido',
        nombres: 'nombres',
        email: 'email',
        fechaNacimiento: 'fecha_nacimiento',
        activo: 'activo',
        idUsuarioModificacion: 'id_usuario_modificacion'
    };

    constructor() {
        super();
        this.repository = new EstudiantesRepository();
    }

    async getAll(filter, limit, offset, order) {
        const sqlFilter = this.mapKeysToColumns(filter, EstudiantesService.KEYS_MAP);
        const sqlOrder = this.mapKeysToColumns(order, EstudiantesService.KEYS_MAP);

        const respuestaBD = await this.repository.getAll(sqlFilter, limit, offset, sqlOrder);
        const respuesta = respuestaBD.map(estudiante => (new EstudianteResponseDTO(estudiante)));
        return respuesta;
    }
}

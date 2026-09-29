import EstudiantesRepository from "../repositories/estudiantes.repository.js";
import EstudianteResponseDTO from "../dtos/estudiantes/estudiante.response.dto.js";
import BaseService from './base.services.js';
import HttpError from "../commons/httpError.js";

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

    async getAll(criteria) {
        const respuestaBD = await this.repository.getAll(criteria);
        return respuestaBD.map(estudiante => new EstudianteResponseDTO(estudiante));
    }

    async count(criteria) {
        const count = await this.repository.count(criteria);
        return count;
    }

    async getById(id) {
        const respuestaBD = await this.repository.getById(id);
        if (!respuestaBD) throw new HttpError('Estudiante no encontrado', 404);
        return new EstudianteResponseDTO(respuestaBD);
    }

    async validarDocumentoUnico(documento, excluirId = null) {
        if (documento === undefined) return;
        const existente = await this.repository.getByDocumento(documento, excluirId);
        if (existente) throw new HttpError('Ya existe un estudiante con ese documento', 409);
    }

    async create(data) {
        await this.validarDocumentoUnico(data.documento);
        const dataMapped = this.mapKeysToColumns(data, EstudiantesService.KEYS_MAP);
        const respuestaBD = await this.repository.create(dataMapped);
        return new EstudianteResponseDTO(respuestaBD);
    }

    async update(id, data) {
        await this.validarDocumentoUnico(data.documento, id);
        const dataMapped = this.mapKeysToColumns(data, EstudiantesService.KEYS_MAP);
        const respuestaBD = await this.repository.update(id, dataMapped);
        if (!respuestaBD) throw new HttpError('Estudiante no encontrado', 404);
        return new EstudianteResponseDTO(respuestaBD);
    }

    async destroy(id) {
        const eliminado = await this.repository.destroy(id);
        if (!eliminado) throw new HttpError('Estudiante no encontrado', 404);
    }

}
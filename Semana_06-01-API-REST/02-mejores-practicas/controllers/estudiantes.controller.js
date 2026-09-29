import EstudiantesService from "../services/estudiantes.service.js";

export default class EstudiantesController {
    constructor() {
        this.service = new EstudiantesService();
    }

    async getAll(req, res) {
        try {
            const estudiantes = await this.service.getAll(req.criteria);
            res.json(estudiantes);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al obtener los estudiantes' });
        }
    }

    async count(req, res) {
        try {
            const count = await this.service.count(req.criteria);
            res.json({ count });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al contar los estudiantes' });
        }
    }

    async getById(req, res) {
        try {
            const id = req.params.id;
            const resultado = await this.service.getById(id);
            res.json(resultado);
        } catch (error) {
            console.error(error);
            if (error.statusCode) return res.status(error.statusCode).json({ error: error.message });
            res.status(500).json({ error: 'Error al obtener el estudiante' });
        }
    }

    async create(req, res) {
        try {
            const newEstudiante = await this.service.create(req.dto);
            res.status(201).json(newEstudiante);
        } catch (error) {
            console.log(error);
            if (error.code === '23505') return res.status(409).json({ error: 'Ya existe un estudiante con ese documento o email' });
            res.status(500).json({ error: 'Error al crear el estudiante' });
        }
    }

    async update(req, res) {
        try {
            const id = req.params.id;
            const updatedEstudiante = await this.service.update(id, req.dto);
            res.json(updatedEstudiante);
        } catch (error) {
            console.log(error);
            if (error.statusCode) return res.status(error.statusCode).json({ error: error.message });
            if (error.code === '23505') return res.status(409).json({ error: 'Ya existe un estudiante con ese documento o email' });
            res.status(500).json({ error: 'Error al actualizar el estudiante' });
        }
    }

    async destroy(req, res) {
        try {
            const id = req.params.id;
            await this.service.destroy(id);
            res.status(204).send();
        } catch (error) {
            console.log(error);
            if (error.statusCode) return res.status(error.statusCode).json({ error: error.message });
            res.status(500).json({ error: 'Error al eliminar el estudiante' });
        }
    }
}
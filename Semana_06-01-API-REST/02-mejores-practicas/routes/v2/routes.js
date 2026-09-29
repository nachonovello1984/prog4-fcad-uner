import express from "express";
import apicache from "apicache";

import EstudiantesController from "../../controllers/estudiantes.controller.js";

import validateIdPathParam from "../../validators/idPathParam.validation.js";

import estudiantesCreateValidation from "../../validators/estudiantesCreate.validation.js";
import estudiantesCreateTransform from "../../transforms/estudiantesCreate.transform.js";
import estudiantesFindAllValidation from "../../validators/estudiantesFindAll.validation.js";
import estudiantesFindAllTransform from "../../transforms/estudiantesFindAll.transform.js";
import estudiantesUpdateValidation from "../../validators/estudiantesUpdate.validation.js";
import estudiantesUpdateTransform from "../../transforms/estudiantesUpdate.transform.js";

const router = express.Router();

const estudiantesController = new EstudiantesController();

/**
 * @openapi
 * components:
 *   schemas:
 *     Estudiante:
 *       type: object
 *       properties:
 *         idEstudiante: { type: integer, example: 6 }
 *         documento: { type: string, example: "35211111" }
 *         apellido: { type: string, example: "GARCÍA" }
 *         nombres: { type: string, example: "MATEO EMILIO" }
 *         email: { type: string, example: "mateogarcia@gmail.com" }
 *         fechaNacimiento: { type: string, format: date, example: "2001-02-15" }
 *         activo: { type: integer, example: 1 }
 *         idUsuarioModificacion: { type: integer, example: 1 }
 *         fechaHoraModificacion: { type: string, format: date-time, example: "2024-09-12T18:05:18.000Z" }
 *
 *     EstudianteCreate:
 *       type: object
 *       required: [documento, apellido, nombres, email, fechaNacimiento]
 *       properties:
 *         documento: { type: string, example: "35211111" }
 *         apellido: { type: string, example: "GARCÍA" }
 *         nombres: { type: string, example: "MATEO EMILIO" }
 *         email: { type: string, example: "mateogarcia@gmail.com" }
 *         fechaNacimiento: { type: string, format: date, example: "2001-02-15" }
 *
 *     EstudianteUpdate:
 *       type: object
 *       required: [documento, apellido, nombres, email, fechaNacimiento]
 *       properties:
 *         documento: { type: string, example: "35211111" }
 *         apellido: { type: string, example: "GARCÍA" }
 *         nombres: { type: string, example: "MATEO EMILIO" }
 *         email: { type: string, example: "mateogarcia@gmail.com" }
 *         fechaNacimiento: { type: string, format: date, example: "2001-02-15" }
 *
 *     Error:
 *       type: object
 *       properties:
 *         error: { type: string }
 *       example:
 *         error: "Estudiante no encontrado"
 *
 *     ValidationError:
 *       type: object
 *       properties:
 *         errors:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               type: { type: string, example: "field" }
 *               value: { type: string, example: "abc" }
 *               msg: { type: string, example: "limit debe ser un entero no negativo" }
 *               path: { type: string, example: "limit" }
 *               location: { type: string, example: "query" }
 */

// Cache del listado de estudiantes: 1 minuto por URL (incluye los query params).
// Se agrupa como 'estudiantes' para poder invalidarla cuando cambian los datos.
const cache = apicache.middleware;
const cacheEstudiantes = [(req, res, next) => { req.apicacheGroup = 'estudiantes'; next(); }, cache('1 minute')];

// Después de un alta, modificación o baja exitosa se descarta el cache del listado.
const invalidarCacheEstudiantes = (req, res, next) => {
    res.on('finish', () => {
        if (res.statusCode < 400) apicache.clear('estudiantes');
    });
    next();
};

/**
 * @openapi
 * /estudiantes:
 *   get:
 *     tags:
 *       - Estudiantes
 *     summary: Listar estudiantes
 *     description: |
 *       Lista estudiantes con filtros, orden y paginación opcional.
 *
 *       **Cache:** la respuesta se guarda 1 minuto por combinación de parámetros de consulta.
 *       Se descarta antes si se crea, modifica o elimina un estudiante.
 *       Las respuestas cacheadas llevan el header `Cache-Control: max-age=...` con el tiempo restante.
 *     parameters:
 *       - in: query
 *         name: documento
 *         schema:
 *           type: string
 *         description: Filtra por documento
 *       - in: query
 *         name: apellido
 *         schema:
 *           type: string
 *         description: Filtra por apellido
 *       - in: query
 *         name: nombres
 *         schema:
 *           type: string
 *         description: Filtra por nombres
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *           format: email
 *         description: Filtra por email
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 0
 *         description: Límite de registros (0 = sin paginación)
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *           minimum: 0
 *         description: Offset de paginación
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [documento, apellido, nombres, email]
 *         description: Campo por el cual ordenar
 *       - in: query
 *         name: asc
 *         schema:
 *           type: boolean
 *         description: true para ascendente, false para descendente
 *     responses:
 *       200:
 *         description: OK (puede provenir del cache, válido por 1 minuto)
 *         headers:
 *           Cache-Control:
 *             description: Tiempo restante de validez del cache, por ejemplo `max-age=60`
 *             schema:
 *               type: string
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Estudiante'
 *       400:
 *         description: Error de validación de parámetros
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *       500:
 *         description: Error interno
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/estudiantes", [estudiantesFindAllValidation, estudiantesFindAllTransform, ...cacheEstudiantes], estudiantesController.getAll.bind(estudiantesController));

/**
 * @openapi
 * /estudiantes/count:
 *   get:
 *     tags:
 *       - Estudiantes
 *     summary: Contar estudiantes (con los mismos filtros que el listado)
 *     parameters:
 *       - in: query
 *         name: documento
 *         schema:
 *           type: string
 *         description: Filtra por documento
 *       - in: query
 *         name: apellido
 *         schema:
 *           type: string
 *         description: Filtra por apellido
 *       - in: query
 *         name: nombres
 *         schema:
 *           type: string
 *         description: Filtra por nombres
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *         description: Filtra por email
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 count:
 *                   type: integer
 *                   example: 42
 *       400:
 *         description: Parámetros de consulta inválidos
 *       500:
 *         description: Error interno
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/estudiantes/count", [estudiantesFindAllValidation, estudiantesFindAllTransform], estudiantesController.count.bind(estudiantesController));

/**
 * @openapi
 * /estudiantes/{id}:
 *   get:
 *     tags:
 *       - Estudiantes
 *     summary: Obtener estudiante por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del estudiante
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Estudiante'
 *       400:
 *         description: ID inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Error interno
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/estudiantes/:id", [validateIdPathParam], estudiantesController.getById.bind(estudiantesController));

/**
 * @openapi
 * /estudiantes:
 *   post:
 *     tags:
 *       - Estudiantes
 *     summary: Crear estudiante
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EstudianteCreate'
 *     responses:
 *       201:
 *         description: Creado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Estudiante'
 *       500:
 *         description: Error interno
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post("/estudiantes", [estudiantesCreateValidation, estudiantesCreateTransform, invalidarCacheEstudiantes], estudiantesController.create.bind(estudiantesController));

/**
 * @openapi
 * /estudiantes/{id}:
 *   put:
 *     tags:
 *       - Estudiantes
 *     summary: Actualizar estudiante
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del estudiante
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EstudianteUpdate'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Estudiante'
 *       400:
 *         description: ID inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Error interno
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.put("/estudiantes/:id", [validateIdPathParam, estudiantesUpdateValidation, estudiantesUpdateTransform, invalidarCacheEstudiantes], estudiantesController.update.bind(estudiantesController));

/**
 * @openapi
 * /estudiantes/{id}:
 *   delete:
 *     tags:
 *       - Estudiantes
 *     summary: Eliminar estudiante
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del estudiante
 *     responses:
 *       204:
 *         description: Eliminado
 *       400:
 *         description: ID inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Error interno
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete("/estudiantes/:id", [validateIdPathParam, invalidarCacheEstudiantes], estudiantesController.destroy.bind(estudiantesController));

export default router;
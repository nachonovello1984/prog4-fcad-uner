import express from "express";
import EstudiantesController from "../../controllers/estudiantes.controller.js";
import estudiantesFindAllValidation from "../../validators/estudiantesFindAll.validation.js";
import estudiantesFindAllTransform from "../../transforms/estudiantesFindAll.transform.js";

const router = express.Router();

const estudiantesController = new EstudiantesController();

/**
 * @swagger
 * components:
 *   schemas:
 *     Estudiante:
 *       type: object
 *       required:
 *         - idEstudiante
 *         - documento
 *         - apellido
 *         - nombres
 *         - email
 *         - fechaNacimiento
 *         - activo
 *         - idUsuarioModificacion
 *         - fechaHoraModificacion
 *       properties:
 *         idEstudiante:
 *           type: integer
 *           description: ID del estudiante
 *         documento:
 *           type: string
 *           description: Documento del estudiante
 *         apellido:
 *           type: string
 *           description: Apellido del estudiante
 *         nombres:
 *           type: string
 *           description: Nombres del estudiante
 *         email:
 *           type: string
 *           description: Email del estudiante
 *         fechaNacimiento:
 *           type: string
 *           format: date
 *           description: Fecha de nacimiento del estudiante
 *         activo:
 *           type: boolean
 *           description: Estado activo del estudiante
 *         idUsuarioModificacion:
 *           type: integer
 *           description: ID del usuario que modificó el estudiante
 *         fechaHoraModificacion:
 *           type: string
 *           format: date-time
 *           description: Fecha y hora de la última modificación del estudiante
 *       example:
 *         idEstudiante: 1
 *         documento: "12345678"
 *         apellido: "GUINESS"
 *         nombres: "PENELOPE"
 *         email: "penelope.guiness@example.com"
 *         fechaNacimiento: "1990-01-01"
 *         activo: true
 *         idUsuarioModificacion: 1
 *         fechaHoraModificacion: "2024-09-12 18:05:18"
 * 
 *     Error:
 *       type: object
 *       properties:    
 *         error:
 *           type: string
 *       example:
 *         error: "Estudiante no encontrado"
 */

/** @swagger
 * /api/estudiantes:
 *   get:
 *     summary: Obtiene una lista de estudiantes con paginación, filtrado y ordenación
 *     tags: [Estudiantes]
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *         description: Cantidad de elementos por página
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [idEstudiante, documento, apellido, nombres, email]
 *           default: idEstudiante
 *         description: Campo por el cual ordenar
 *       - in: query
 *         name: asc
 *         schema:
 *           type: boolean
 *           default: true
 *         description: Orden de clasificación
 *       - in: query
 *         name: nombres
 *         schema:
 *           type: string
 *         description: Filtrar por nombre (búsqueda contenido en el campo)
 *       - in: query
 *         name: apellido
 *         schema:
 *           type: string
 *         description: Filtrar por apellido (búsqueda contenido en el campo)
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *         description: Filtrar por email (búsqueda contenido en el campo)
 *     responses:
 *       200:
 *         description: Lista de estudiantes obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Estudiante'
 *       400:
 *         description: Parámetros de consulta inválidos
 *       500:
 *         description: Error interno del servidor
 */
router.get("/estudiantes", [estudiantesFindAllValidation, estudiantesFindAllTransform], estudiantesController.getAll.bind(estudiantesController));

export default router;

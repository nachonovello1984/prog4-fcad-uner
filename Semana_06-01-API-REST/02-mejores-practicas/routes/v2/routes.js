import express from "express";
import EstudiantesController from "../../controllers/estudiantes.controller.js";
import estudiantesFindAllValidation from "../../validators/estudiantesFindAll.validation.js";
import estudiantesFindAllTransform from "../../transforms/estudiantesFindAll.transform.js";

const router = express.Router();

const estudiantesController = new EstudiantesController();

router.get("/estudiantes", [estudiantesFindAllValidation, estudiantesFindAllTransform], estudiantesController.getAll.bind(estudiantesController));

export default router;

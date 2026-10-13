import express from 'express';
import AuthController from '../../controllers/auth.controller.js';
import validateLogin from '../../middlewares/validateLogin.js';

const router = express.Router();
const authController = new AuthController();

router.post('/auth/login', validateLogin, authController.login);

export default router;
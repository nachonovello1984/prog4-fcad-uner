import jwt from 'jsonwebtoken';
import UsersService from '../services/users.service.js';

class AuthController {

    constructor() {
        this.service = new UsersService();
    }

    login = async (req, res) => {
        try {
            const { username, password } = req.body;

            const user = await this.service.find(username, password);
            if (!user) {
                return res.status(400).json({ message: 'Nombre de usuario y/o contraseña incorrectos.' });
            }

            const token = jwt.sign({ userId: user.userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
            return res.json({ token });
        } catch (exc) {
            console.error(exc);
            return res.status(500).json({ message: 'Error interno' });
        }
    };

}

export default AuthController;

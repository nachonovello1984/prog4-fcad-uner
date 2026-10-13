import jwt from 'jsonwebtoken';
import UsersService from '../services/users.service.js';

const service = new UsersService();

// Valida el token Bearer y deja el usuario en req.user
const authenticate = async (req, res, next) => {
    try {
        const [scheme, token] = (req.headers.authorization ?? '').split(' ');
        if (scheme !== 'Bearer' || !token) {
            return res.status(401).json({ message: 'Token requerido.' });
        }

        const payload = jwt.verify(token, process.env.JWT_SECRET);
        const user = await service.findById(payload.userId);
        if (!user) {
            return res.status(401).json({ message: 'Token incorrecto.' });
        }

        req.user = user;
        next();
    } catch (exc) {
        if (exc.name === 'JsonWebTokenError' || exc.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token incorrecto.' });
        }
        next(exc);
    }
};

export default authenticate;

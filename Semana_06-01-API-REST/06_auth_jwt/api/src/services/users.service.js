import { createHash, timingSafeEqual } from 'crypto';
import User from "../repositories/user.repository.js";

// Cifrado de la contraseña almacenada: SHA-256 en hexadecimal
const hashPassword = (password) => createHash('sha256').update(password).digest('hex');

class UsersService {

    constructor() {
        this.userDB = new User();
    }

    find = async (username, password) => {
        const user = await this.userDB.findByUsernamePassword(username, password);
        if (!user) return undefined;

        return user;
    };

    findById = async (userId) => {
        return await this.userDB.findById(userId);
    };

}

export default UsersService;

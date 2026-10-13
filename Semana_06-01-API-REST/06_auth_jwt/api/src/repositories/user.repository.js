import BdUtils from "./database.js";

class User {

    findByUsernamePassword = async (username, contrasenia) => {
        const strSql = `SELECT id_usuario AS "userId", nombre_usuario AS username, nombre AS "firstName",
                               apellido AS "lastName", rol
                        FROM usuarios
                        WHERE nombre_usuario ILIKE $1 
                        AND contrasenia = encode(digest($2, 'sha256'), 'hex')
                        AND activo = 1;`;

        const { rows } = await BdUtils.query(strSql, [username, contrasenia]);

        return rows[0];
    };

    findById = async (userId) => {
        const strSql = `SELECT id_usuario AS "userId", nombre_usuario AS username, nombre AS "firstName",
                               apellido AS "lastName", rol
                        FROM usuarios
                        WHERE id_usuario = $1 AND activo = 1`;

        const { rows } = await BdUtils.query(strSql, [userId]);

        return rows[0];
    };

}

export default User;

const { where } = require("sequelize");
const { usuario } = require('../Models/index')


class UsuarioDAO {
    static async crearUsuario(usuarioAux) {
        try {
            if (!usuarioAux ) {
                throw new Error('Los campos obligatorios deben estar presentes');
            }

            const nuevoUsuario = await usuario.create(usuarioAux);
            return nuevoUsuario;
        } catch (error) {
            console.error('Error al crear usuario:', error.message);
            throw new Error('Error al crear el usuario');
        }
    }

    static async editarUsuario(idUsuario, usuarioAux) {
        try {
            if (!idUsuario) {
                throw new Error('El ID del usuario es obligatorio');
            }

            const [rowsUpdated] = await usuario.update(usuarioAux, {
                where: { idUsuario: idUsuario }
            });

            if (rowsUpdated === 0) {
                throw new Error(`No se encontró un usuario con el ID ${idUsuario}`);
            }

            return { message: 'Usuario actualizado correctamente' };
        } catch (error) {
            console.error('Error al editar usuario:', error.message);
            throw new Error('Error al editar el usuario');
        }
    }

    static async eliminarUsuario(idUsuario) {
        try {
            if (!idUsuario) {
                throw new Error('El ID del usuario es obligatorio');
            }
            const [rowsUpdated] = await usuario.update(
                { estado: 0 },
                {
                    where: { idUsuario: idUsuario }
                }
            );
            if (rowsUpdated === 0) {
                throw new Error(`No se encontró un usuario con el ID ${idUsuario}`);
            }
    
            return { message: 'Usuario desactivado correctamente' };
        } catch (error) {
            console.error('Error al cambiar el estado del usuario:', error.message);
            throw new Error('Error al eliminar el usuario');
        }
    }

    static async consultarUsuariosPorSecretario(idSecretario) {
        if (!idSecretario) {
            throw new Error('El identificador del secretario es obligatorio');
        }
    
        return await usuario.findAll({
            where: {
                idSecretarioAsignado: idSecretario,
                estado: 1 
            }
        });
    }

    static async validarUsuarioYContrasena(clave, contrasena) {
        if (!clave || !contrasena) {
            throw new Error('La clave y la contraseña son obligatorios');
        }
    
        const usuarioEncontrado = await usuario.findOne({
            where: {
                clave: clave,
                contrasena: contrasena,
                estado: 1
            }
        });
    
        if (!usuarioEncontrado) {
            throw new Error('Usuario o contraseña inválidos');
        }
    
        return usuarioEncontrado;
    }
}
module.exports = UsuarioDAO
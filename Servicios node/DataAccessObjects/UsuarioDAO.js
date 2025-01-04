const { where } = require("sequelize");
const { usuario } = require('../Models/index')


class UsuarioDAO {
    static async crearUsuario(usuarioAux){
        return await usuario.create(usuarioAux);
    }

    static async editarUsuario(idUsuario, usuarioAux) {
        return await usuario.update(usuarioAux, {
            where: { idUsuario: idUsuario }
        });
    }

    static async eliminarUsuario(idUsuario) {
        return await usuario.destroy({
            where: { idUsuario: idUsuario }
        });
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
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

    static async consultarUsuarios(filtro = {}) {
        return await usuario.findAll({
            where: filtro
        });
    }

}
module.exports = UsuarioDAO
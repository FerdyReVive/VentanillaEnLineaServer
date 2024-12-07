const { where } = require("sequelize");
const { usuario } = require('../Models/index')


class UsuarioDAO {
    static async crearUsuario(usuarioAux){
        return await usuario.create(usuarioAux);
    }
}
module.exports = UsuarioDAO
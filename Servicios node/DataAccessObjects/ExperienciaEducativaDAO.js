const { where } = require("sequelize");
const { experienciaeducativa, usuarioexperienciaeducativa } = require('../Models/index')

class ExperienciaEducativaDAO {

    static async crearExperienciaEducativa(experienciaAux) {
        return await experienciaeducativa.create(experienciaAux);
    }

    static async editarExperienciaEducativa(idExperienciaEducativa, experienciaAux) {
        return await experienciaeducativa.update(experienciaAux, {
            where: { idExperienciaEducativa: idExperienciaEducativa }
        });
    }

    static async eliminarExperienciaEducativa(idExperienciaEducativa) {
        return await experienciaeducativa.destroy({
            where: { idExperienciaEducativa: idExperienciaEducativa }
        });
    }

    static async consultarExperienciasEducativas(filtro = {}) {
        return await experienciaeducativa.findAll({
            where: filtro
        });
    }

    static async consultarExperienciasCompletasPorUsuario(idUsuario) {
        if (!idUsuario) {
            throw new Error('El idUsuario es obligatorio');
        }
    
        return await experienciaeducativa.findAll({
            include: [
                {
                    model: usuarioexperienciaeducativa,
                    as: 'usuarioExperiencia',
                    where: { idUsuario },
                    attributes: []
                }
            ]
        });
    }
    
}

module.exports = ExperienciaEducativaDAO;
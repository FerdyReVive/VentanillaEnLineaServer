const { where } = require("sequelize");
const { tramite } = require('../Models/index')

class TramiteDAO {

    static async crearTramite(data) {
        try {
            const nuevoTramite = await tramite.create({
                fecha: data.fecha,
                idTipoTramite: data.idTipoTramite,
                idUsuario: data.idUsuario,
                estado: data.estado
            });
            return nuevoTramite;
        } catch (error) {
            throw new Error('Error al crear el trámite: ' + error.message);
        }
    }

    static async editarEstadoTramite(idTramite, nuevoEstado) {
        try {
            const tramiteExistente = await tramite.findByPk(idTramite);
            if (!tramiteExistente) {
                throw new Error('No se encontró el trámite con el ID especificado');
            }

            await tramite.update(
                { estado: nuevoEstado },
                { where: { idTramite } }
            );

            return { message: 'Estado del trámite actualizado correctamente' };
        } catch (error) {
            console.error(`Error en TramiteDAO.editarEstadoTramite: ${error.message}`);
            throw new Error('Error al actualizar el estado del trámite');
        }
    }

    static async consultarTramitesPorEstudiante(idUsuario) {
        try {
            const tramites = await tramite.findAll({
                where: { idUsuario }
            });
            return tramites;
        } catch (error) {
            throw new Error('Error al consultar trámites por usuario: ' + error.message);
        }
    }

    static async consultarTramitesPorSecretario(idSecretario) {
        try {
            const tramites = await Tramite.findAll({
              include: [{
                model: Usuario,
                as: 'usuario',
                where: { idSecretarioAsignado: idSecretario }
              }]
            });
            return tramites;
          } catch (error) {
            throw new Error('Error al consultar trámites por secretario: ' + error.message);
          }
    }
    
}

module.exports = TramiteDAO;
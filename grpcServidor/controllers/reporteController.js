//const { consultarExperienciasCompletasPorUsuario } = require('../serviciosNode/DataAccessObjects/ExperienciaEducativaDAO');
//const { generarReporteKardex } = require('../utils/generadorReporte');

const ReportService = {
  GenerarReporteKardex: async (call, callback) => {
    const { idUsuario } = call.request;

    try {
      if (!idUsuario) {
        return callback({
          code: grpc.status.INVALID_ARGUMENT,
          message: "El idUsuario es obligatorio",
        });
      }

      const experiencias = await consultarExperienciasCompletasPorUsuario(idUsuario);
     
      if (!experiencias || experiencias.length === 0) {
        return callback({
          code: grpc.status.NOT_FOUND,
          message: "No se encontraron experiencias educativas para este usuario",
        });
      }
    
      const usuario = { nombre: `Usuario ${idUsuario}` };
      const buffer = await generarReporteKardex(experiencias, usuario);

      callback(null, {
        message: "Reporte generado con éxito",
        file: buffer.toString('base64'),
      });
    } catch (error) {
      console.error("Error al generar el reporte:", error.message);
      callback({
        code: grpc.status.INTERNAL,
        message: "Error al generar el reporte",
      });
    }
  },
};

module.exports = ReportService;

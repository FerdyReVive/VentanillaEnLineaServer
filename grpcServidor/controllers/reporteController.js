const { consultarExperienciasCompletasPorUsuario } = require('../serviciosNode/DataAccessObjects/ExperienciaEducativaDAO');
const { generarReporteKardex } = require('../utils/generadorReporte');

const ReportService = {
  GenerarReporteKardex: async (call, callback) => {
    const { idUsuario } = call.request;

    try {
      // Valida que el idUsuario sea válido
      if (!idUsuario) {
        return callback({
          code: grpc.status.INVALID_ARGUMENT,
          message: "El idUsuario es obligatorio",
        });
      }

      // Obtén las experiencias educativas del usuario
      const experiencias = await consultarExperienciasCompletasPorUsuario(idUsuario);
     
      if (!experiencias || experiencias.length === 0) {
        return callback({
          code: grpc.status.NOT_FOUND,
          message: "No se encontraron experiencias educativas para este usuario",
        });
      }
      
      // Simula los datos del usuario (puedes ajustarlo según tu lógica)
      const usuario = { nombre: `Usuario ${idUsuario}` };

      // Genera el reporte
      const buffer = await generarReporteKardex(experiencias, usuario);

      // Responde con la ruta del archivo
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

const { fetchExperienciasPorUsuario } = require('../helpers/WordHelper');
const { generateDocument } = require('../helpers/WordHelper');

async function generarReporte(req, res) {
  const { idUsuario } = req.params;

  try {
    if (!idUsuario) {
      return res.status(400).json({ message: 'El idUsuario es obligatorio' });
    }

    // Consultar datos desde el servicio Node.js
    const experiencias = await fetchExperienciasPorUsuario(idUsuario);

    // Generar el documento Word
    const outputPath = './kardex.docx';
    await generateDocument(experiencias, outputPath);

    // Enviar el archivo como respuesta
    res.download(outputPath, 'kardex.docx', (err) => {
      if (err) {
        console.error('Error al enviar el archivo:', err);
        res.status(500).json({ message: 'Error al enviar el archivo' });
      }
    });
  } catch (error) {
    console.error('Error al generar el reporte:', error.message);
    res.status(500).json({ message: 'Error al generar el reporte', error: error.message });
  }
}

module.exports = { generarReporte };

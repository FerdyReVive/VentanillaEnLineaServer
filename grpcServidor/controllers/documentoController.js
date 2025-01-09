const DocumentoDAO = require('../dao/DocumentoDAO');

const pruebaObtenerRutaArchivo = async (req, res) => {
    try {
        const { idArchivo } = req.params;


        const ruta = await DocumentoDAO.obtenerRutaArchivo({ idArchivo });

        res.status(200).json({ ruta });
    } catch (error) {
        console.error('Error al obtener la ruta del archivo:', error.message);
        res.status(500).json({ message: error.message });
    }
};

module.exports = { pruebaObtenerRutaArchivo };
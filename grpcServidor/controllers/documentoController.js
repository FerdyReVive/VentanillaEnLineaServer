const DocumentoDAO = require('../DataAccesObjects/DocumentoDAO');

const DocumentoController = {
    async crearDocumento(req, res) {
        try {
            const { nombre, ruta, idTramite } = req.body;

            if (!nombre || !ruta || !idTramite) {
                return res.status(400).json({
                    message: 'Todos los campos (nombre, ruta, idTramite) son obligatorios',
                });
            }

            const nuevoDocumento = await DocumentoDAO.crearDocumento({ nombre, ruta, idTramite });

            return res.status(201).json({
                message: 'Documento creado exitosamente',
                data: nuevoDocumento,
            });
        } catch (error) {
            console.error('Error en crearDocumento (Controller):', error.message);
            return res.status(500).json({
                message: 'Error al crear el documento',
            });
        }
    },
};

module.exports = DocumentoController;
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

    async obtenerDocumentos(req, res) {
        try {
            const { idTramite } = req.params;
    
            if (!idTramite) {
                return res.status(400).json({
                    message: 'El campo idTramite es obligatorio',
                });
            }
    
            const documentos = await DocumentoDAO.obtenerDocumentosPorTramite(idTramite);
    
            return res.status(200).json({
                message: 'Documentos obtenidos exitosamente',
                data: documentos,
            });
        } catch (error) {
            console.error('Error en obtenerDocumentos (Controller):', error.message);
            return res.status(500).json({
                message: 'Error al obtener los documentos',
            });
        }
    }
};

module.exports = DocumentoController;
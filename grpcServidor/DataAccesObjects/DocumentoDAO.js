const { where } = require("sequelize");
const { documento } = require('../models/index')

class DocumentoDAO {

    static async crearDocumento(data) {
        try {
            const { nombre, ruta, idTramite } = data;

            if (!nombre || !ruta || !idTramite) {
                throw new Error('Todos los campos (nombre, ruta, idTramite) son obligatorios');
            }

            const nuevoDocumento = await documento.create({
                nombre,
                ruta,
                idTramite,
            });

            return nuevoDocumento;
        } catch (error) {
            console.error('Error al crear documento:', error.message);
            throw new Error('Error al crear el documento');
        }
    }

    static async obtenerRutaArchivo(idArchivo) {
        try {
            if (!idArchivo) {
                throw new Error('El idArchivo es obligatorio');
            }

            const archivo = await documento.findByPk(idArchivo, {
                attributes: ['ruta'],
            });
    
            if (!archivo) {
                throw new Error(`No se encontró ningún archivo con el ID: ${idArchivo}`);
            }
    
            return archivo.ruta;
        } catch (error) {
            console.error('Error al obtener la ruta del archivo:', error.message);
            throw new Error('Error al obtener la ruta del archivo');
        }
    }

    static async obtenerDocumentosPorTramite(idTramite) {
        try {
            if (!idTramite) {
                throw new Error('El campo idTramite es obligatorio');
            }
            
            const documentos = await documento.findAll({
                where: { idTramite },
            });
    
            return documentos;
        } catch (error) {
            console.error('Error al obtener documentos por idTramite:', error.message);
            throw new Error('Error al obtener los documentos');
        }
    }

}

module.exports = DocumentoDAO;

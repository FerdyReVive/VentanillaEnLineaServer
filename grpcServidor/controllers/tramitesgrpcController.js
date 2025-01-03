const fs = require('fs');
const path = require('path');
const grpc = require('@grpc/grpc-js');
const util = require('util');
const readFileAsync = util.promisify(fs.readFile);
const DocumentoDAO = require('../DataAccesObjects/DocumentoDAO')

const subirArchivo = (req, res) => {
    try {
        const rutaProyecto = obtenerFolderTramite(req.request.idTramite);
        const rutaArchivo = path.join(rutaProyecto, req.request.nombreArchivo);

        rehacerArchivo(req.request.contenido, rutaArchivo, (err, statuscode) => {
            if (err) {
                console.error('Error al guardar el archivo:', err);
                return res({
                    code: grpc.status.INTERNAL,
                    message: 'Error al guardar el archivo: ' + err.message,
                });
            }

            console.log('Archivo guardado exitosamente:', statuscode);


            const informacion = {nombre : req.request.nombreArchivo, ruta : rutaArchivo, idTramite : req.request.idTramite};
            DocumentoDAO.crearDocumento(informacion);

            const { nombreArchivo, extension, idTramite } = req.request;
            const archivo = {
                Name: nombreArchivo,
                Path: rutaProyecto,
                Extension: extension,
                IdTramite: idTramite,
            };

            res(null, { response: 200, archivo });
        });
    } catch (err) {
        console.error('Error inesperado:', err);
        res({
            code: grpc.status.UNKNOWN,
            message: 'Error inesperado al subir el archivo',
        });
    }
};

const rehacerArchivo = (contenidoArchivo, rutaArchivo, callback) => {
    try {
        fs.writeFile(rutaArchivo, contenidoArchivo, (err) => {
            if (err) {
                return callback(err);
            }
            callback(null, 'Archivo recreado exitosamente.');
        });
    } catch (err) {
        callback(err);
    }
};

const obtenerFolderTramite = (nombreFolder) => {
    try {
        const rutaFolderFinal = path.resolve(__dirname, '../ArchivosProyecto/' + nombreFolder);
        const res = rutaFolderFinal;
    
        if (!fs.existsSync(rutaFolderFinal)) {
            fs.mkdirSync(path.resolve(rutaFolderFinal));     
        } 
    
        return res;
    } catch (err){
        throw err;
    }
};

const descargarArchivo = async (req, res) => {
        try {
            const idArchivo = req.request.idDocumento;
            console.log(idArchivo);
            const rutaArchivo = await DocumentoDAO.obtenerRutaArchivo(idArchivo);
    
            if (!fs.existsSync(rutaArchivo)) {
                throw new Error('Archivo no encontrado');
            }

            const datosArchivo = await readFileAsync(rutaArchivo);
    
            res(null, {contenido:datosArchivo});
        } catch (err) {
            console.error('Error inesperado:', err);
            res({
                code: grpc.status.UNKNOWN,
                message: 'Error inesperado al descargar el archivo',
            });
        }
};


module.exports = {subirArchivo, descargarArchivo}

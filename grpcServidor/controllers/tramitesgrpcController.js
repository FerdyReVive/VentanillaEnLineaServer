const fs = require('fs');
const path = require('path');
const grpc = require('@grpc/grpc-js');

const subirArchivo = (req, res) => {
    try {
        const rutaProyecto = path.join("C:", "Users", "nando", "Desktop");
        const rutaArchivo = path.join(rutaProyecto, req.request.nombreArchivo);

        reMakeFile(req.request.contenido, rutaArchivo, (err, statuscode) => {
            if (err) {
                console.error('Error al guardar el archivo:', err);
                return res({
                    code: grpc.status.INTERNAL,
                    message: 'Error al guardar el archivo: ' + err.message,
                });
            }

            console.log('Archivo guardado exitosamente:', statuscode);

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

const reMakeFile = (fileString, rutaArchivo, callback) => {
    try {
        fs.writeFile(rutaArchivo, fileString, (err) => {
            if (err) {
                return callback(err);
            }
            callback(null, 'Archivo recreado exitosamente.');
        });
    } catch (err) {
        callback(err);
    }
};

const getFolderPath = (folderName) => {
    try {
        const endFolderPath = path.resolve(__dirname, '../ProjectsFiles/' + folderName);
        const res = endFolderPath;
    
        if (!fs.existsSync(endFolderPath)) {
            fs.mkdirSync(path.resolve(endFolderPath));     
        } 
    
        return res;
    } catch (err){
        throw err;
    }
};

const descargarArchivo = (req, res) => {}

module.exports = {subirArchivo, descargarArchivo}

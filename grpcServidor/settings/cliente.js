const path = require('path');
const grpc = require('@grpc/grpc-js')
const protoLoader = require('@grpc/proto-loader');
const { error } = require('console');
const fs = require('fs');

const PORT = 8081;
const PROTO_FILE = '../protos/tramites.proto';

const packageDef = protoLoader.loadSync(path.resolve(__dirname, PROTO_FILE));
const grpcObj = grpc.loadPackageDefinition(packageDef);

const client = new grpcObj.tramitespackage.filemanagement(
    `0.0.0.0:${PORT}`, grpc.credentials.createInsecure()
);

const deadline = new Date();
deadline.setSeconds(deadline.getSeconds() + 5);
client.waitForReady(deadline, (err) => {
    if (err) {
        console.error(err);
        return;
    }
    onClientReady();
});

function onClientReady(){
    const file = "./Prueba.txt";

    dividirArchivo(file, (err,data) => {
        if (err) {
            console.error(err);
        }
        else{
            const filename =  path.basename(file);
            let extension = path.extname(file);

            client.subirArchivo({idTramite: 2, nombreArchivo: filename, extension: extension, contenido: data}, (err, result) =>{
                if (err){
                    console.log(err);
                    return;
                }
                console.log(result);

                probarDescargarArchivo();
            });
        }
    });
}

function dividirArchivo(rutaArchivo, callback) {
    fs.readFile(rutaArchivo, (err, data) => {
        if (err) {
            return callback(err);
        }

        callback(null, data);
    });
}

function probarDescargarArchivo() {
    const idDocumento = 1; 
    console.log('Solicitando archivo con idFile:', idDocumento);

    client.descargarArchivo({ idDocumento }, (err, response) => {
        if (err) {
            console.error('Error al descargar el archivo:', err);
            return;
        }

        console.log('Archivo descargado exitosamente.');

        const rutaDescarga = path.join("C:", "Users", "nando", "Desktop", "DesPrueba"); 
        
        fs.writeFile(rutaDescarga, response.contenido, (err) => {
            if (err) {
                console.error('Error al guardar el archivo:', err);
                return;
            }

            console.log('Archivo guardado en:', rutaDescarga);
        });
    });

    client.generarKardex({ idUsuario: 5 }, (error, response) => {
        if (error) {
          console.error('Error:', error.message);
        } else {
          console.log(response.message);
      
          // Decodifica el archivo base64 y guárdalo localmente
          const buffer = Buffer.from(response.file, 'base64');
          const filePath = path.join(__dirname, `Kardex_Usuario1.docx`);
      
          fs.writeFileSync(filePath, buffer);
          console.log(`Archivo descargado en: ${filePath}`);
        }
      })
}

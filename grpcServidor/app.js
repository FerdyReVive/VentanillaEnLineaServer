require('dotenv').config();

const servidorgrpc = require('./settings/server');
const servidor = new servidorgrpc();

servidor.listen();
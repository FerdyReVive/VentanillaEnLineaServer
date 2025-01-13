require('dotenv').config();

const Server = require('./Settings/server');

const servidor = new Server();

servidor.listen()
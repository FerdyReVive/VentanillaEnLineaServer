const express = require('express');
const cors = require('cors');
const Sequelize = require('sequelize');
const path = require('path');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const { subirArchivo, descargarArchivo } = require('../controllers/tramitesgrpcController');
const { generarReporte } = require('../controllers/reporteController');

class servidorgrpc {
    constructor() {
        this.port = process.env.PORT;
        this.Proto_File = process.env.PROTO_FILE;
        this.packageDef = protoLoader.loadSync(path.resolve(__dirname, this.Proto_File));
        this.grpcObj = grpc.loadPackageDefinition(this.packageDef);
        this.tramitespackage = this.grpcObj.tramitespackage;
        this.server = this.getServer();
    }

    listen() {
        this.server.bindAsync(`0.0.0.0:${this.port}`, grpc.ServerCredentials.createInsecure(),
            (err) => {
                if (err) {
                    console.error(err);
                    return;
                }
                console.log(`Your server has started on port ${this.port}`);
            });
    }

    getServer() {
        const server = new grpc.Server();
        server.addService(this.tramitespackage.filemanagement.service, {
            subirArchivo,
            descargarArchivo,
            generarReporte
        });

        return server;
    }
}

module.exports = servidorgrpc;

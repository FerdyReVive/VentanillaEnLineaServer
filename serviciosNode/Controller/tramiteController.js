const {response} = require("express");
const { usuario, tramite } = require('../Models');
const TramiteDAO = require("../DataAccessObjects/TramiteDAO");
const DocumentoDAO = require("../DataAccessObjects/DocumentoDAO");

const pruebaCrearTramite = async (req, res) => {
    const { fecha, idTipoTramite, idUsuario, estado } = req.body;

    console.log('Creando trámite con los datos:', req.body);
    try {
        if (!fecha || !idTipoTramite || !idUsuario || estado === undefined) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios' });
        }

        const tramite = await TramiteDAO.crearTramite({ fecha, idTipoTramite, idUsuario, estado });
        res.status(201).json(tramite);
    } catch (error) {
        console.error('Error al crear trámite:', error.message);
        res.status(500).json({ message: 'Error al crear el trámite' });
    }

};

const pruebaEditarEstadoTramite = async (req, res) => {
    const { idTramite } = req.params;
    const { nuevoEstado } = req.body;

    console.log(`Editando estado del trámite con ID ${idTramite} a estado ${nuevoEstado}`);

    try {
        if (!idTramite || nuevoEstado === undefined) {
            return res.status(400).json({ message: 'El ID del trámite y el nuevo estado son obligatorios' });
        }

        await TramiteDAO.editarEstadoTramite(idTramite, nuevoEstado);
        res.status(200).json({ message: 'Estado del trámite actualizado correctamente' });
    } catch (error) {
        console.error('Error al editar estado del trámite:', error.message);
        res.status(500).json({ message: 'Error al editar el estado del trámite' });
    }
};

const pruebaConsultarTramitesPorUsuario = async (req, res) => {
    const { idUsuario } = req.params;

    console.log(`Consultando trámites para el usuario con ID: ${idUsuario}`);

    try {
        if (!idUsuario) {
            return res.status(400).json({ message: 'El idUsuario es obligatorio' });
        }

        const tramites = await TramiteDAO.consultarTramitesPorEstudiante(idUsuario);
        
        if (tramites.length === 0) {
            return res.status(404).json({ message: 'No se encontraron trámites para este usuario' });
        }

        res.status(200).json(tramites);
    } catch (error) {
        console.error('Error al consultar trámites por usuario:', error.message);
        res.status(500).json({ message: 'Error al consultar trámites por usuario' });
    }
};

    const pruebaConsultarTramitesPorSecretario = async (req, res) => {
        const { idSecretarioAsignado } = req.params;

        console.log(`Consultando trámites asignados al secretario con ID: ${idSecretarioAsignado}`);

        try {
            if (!idSecretarioAsignado) {
            return res.status(400).json({ message: 'El idSecretario es obligatorio' });
            }

            const tramites = await TramiteDAO.consultarTramitesPorSecretario(idSecretarioAsignado);

            if (tramites.length === 0) {
            return res.status(404).json({ message: 'No se encontraron trámites asignados a este secretario' });
            }

            res.status(200).json(tramites);
        } catch (error) {
            console.error('Error al consultar trámites por secretario:', error.message);
            res.status(500).json({ message: 'Error al consultar trámites por secretario' });
        }
    };

    const pruebaConsultarDocumentosPorTramite = async (req, res) => {
        const { idTramite } = req.params;

        console.log(`Consultando documentos asignados al tramite con ID: ${idTramite}`);

        try {
            if (!idTramite) {
            return res.status(400).json({ message: 'El idSecretario es obligatorio' });
            }

            const documentos = await DocumentoDAO.obtenerDocumentosPorTramite(idTramite);

            if (documentos.length === 0) {
            return res.status(404).json({ message: 'No se encontraron trámites asignados a este secretario' });
            }

            res.status(200).json(documentos);
        } catch (error) {
            console.error('Error al consultar trámites por secretario:', error.message);
            res.status(500).json({ message: 'Error al consultar trámites por secretario' });
        }
    };


module.exports = {pruebaCrearTramite, pruebaEditarEstadoTramite, pruebaConsultarTramitesPorUsuario, pruebaConsultarTramitesPorSecretario, pruebaConsultarDocumentosPorTramite}
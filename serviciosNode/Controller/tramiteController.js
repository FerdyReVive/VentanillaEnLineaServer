const {response} = require("express");
const Tramite = require("../DTOs/Tramite");
const TramiteDAO = require("../DataAccessObjects/TramiteDAO");

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

const pruebaConsultarTramitesPorEstado = async (req, res) => {
    const { estado } = req.params;

    console.log(`Consultando trámites con estado: ${estado}`);

    try {
        if (estado === undefined) {
            return res.status(400).json({ message: 'El estado es obligatorio' });
        }

        const tramites = await TramiteDAO.consultarTramitesPorEstado(estado);
        res.status(200).json(tramites);
    } catch (error) {
        console.error('Error al consultar trámites por estado:', error.message);
        res.status(500).json({ message: 'Error al consultar trámites por estado' });
    }
};

module.exports = {pruebaCrearTramite, pruebaEditarEstadoTramite, pruebaConsultarTramitesPorEstado}
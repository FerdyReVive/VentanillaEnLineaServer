//Usar este import para todos los controllers
const {response} = require("express");
//*******************************************
const ExperienciaEducativa = require("../DTOs/ExperienciaEducativa");
const ExperienciaEducativaDAO = require("../DataAccessObjects/ExperienciaEducativaDAO");

const pruebaPostExperiencia = async (req, res = response) => {
    const { nombre, NRC } = req.body;
    console.log('Creando nueva experiencia educativa:', { nombre, NRC });

    try {
        await ExperienciaEducativaDAO.crearExperienciaEducativa({ nombre, NRC });
        res.status(200).json({ message: 'Experiencia educativa creada correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear la experiencia educativa' });
    }
};

const pruebaPatchExperiencia = async (req, res = response) => {
    const { idExperienciaEducativa } = req.params;
    const { nombre, NRC } = req.body;
    console.log(`Editando experiencia educativa con ID: ${idExperienciaEducativa}`);
    console.log({ nombre, NRC });

    try {
        await ExperienciaEducativaDAO.editarExperienciaEducativa(idExperienciaEducativa, { nombre, NRC });
        res.status(200).json({ message: 'Experiencia educativa editada correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al editar la experiencia educativa' });
    }
};

const pruebaDeleteExperiencia = async (req, res = response) => {
    const { idExperienciaEducativa } = req.params;
    console.log(`Eliminando experiencia educativa con ID: ${idExperienciaEducativa}`);

    try {
        await ExperienciaEducativaDAO.eliminarExperienciaEducativa(idExperienciaEducativa);
        res.status(200).json({ message: 'Experiencia educativa eliminada correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar la experiencia educativa' });
    }
};

const pruebaGetExperiencias = async (req, res = response) => {
    const { filtro } = req.query;
    console.log(`Consultando experiencias educativas con filtro: ${filtro || 'sin filtro'}`);

    try {
        const experiencias = await ExperienciaEducativaDAO.consultarExperienciasEducativas(filtro ? JSON.parse(filtro) : {});
        res.status(200).json(experiencias);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al consultar las experiencias educativas' });
    }
};

const consultarExperienciasCompletasPorUsuario = async (req, res) => {
    const { idUsuario } = req.params;
    console.log(`Consultando experiencias educativas completas para el usuario con ID: ${idUsuario}`);

    try {
        if (!idUsuario) {
            return res.status(400).json({ message: 'El idUsuario es obligatorio' });
        }

        const experiencias = await ExperienciaEducativaDAO.consultarExperienciasCompletasPorUsuario(idUsuario);
        res.status(200).json(experiencias);
    } catch (error) {
        console.error('Error al consultar experiencias educativas:', error.message);
        res.status(500).json({ message: 'Error al consultar experiencias educativas' });
    }
};

module.exports = {pruebaPostExperiencia, pruebaPatchExperiencia, pruebaDeleteExperiencia, pruebaGetExperiencias, consultarExperienciasCompletasPorUsuario}
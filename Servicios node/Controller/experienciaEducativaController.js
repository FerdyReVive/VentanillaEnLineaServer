//Usar este import para todos los controllers
const {response} = require("express");
//*******************************************
const ExperienciaEducativa = require("../DTOs/ExperienciaEducativa");
const ExperienciaEducativaDAO = require("../DataAccessObjects/ExperienciaEducativaDAO");

const pruebaPostExperiencia = async (req, res = response) => {
    const { nombre, NRC } = req.body; // Datos de la experiencia educativa a crear
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
    const { idExperienciaEducativa } = req.params; // ID de la experiencia educativa
    const { nombre, NRC } = req.body; // Datos actualizados
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
    const { idExperienciaEducativa } = req.params; // ID de la experiencia educativa
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
    const { filtro } = req.query; // Opcional, para aplicar filtros

    console.log(`Consultando experiencias educativas con filtro: ${filtro || 'sin filtro'}`);

    try {
        const experiencias = await ExperienciaEducativaDAO.consultarExperienciasEducativas(filtro ? JSON.parse(filtro) : {});
        res.status(200).json(experiencias);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al consultar las experiencias educativas' });
    }
};

module.exports = {pruebaPostExperiencia, pruebaPatchExperiencia, pruebaDeleteExperiencia, pruebaGetExperiencias}
const {response} = require("express");
const jwt = require('jsonwebtoken');
const Usuario = require("../DTOs/Usuario");
const UsuarioDAO = require("../DataAccessObjects/UsuarioDAO");

const pruebaPost = async (req,res = response) => {
    const {nombre, clave, correo, contrasena, idTipoUsuario} = req.body;
    console.log(nombre, clave, correo, contrasena);
    const usuario = {nombre, clave, correo, contrasena, idTipoUsuario};
    await UsuarioDAO.crearUsuario(usuario);
    res.status(200).json({ message: 'Se registró'});
}

const pruebaPatch = async (req,res = response) => {
    const { idUsuario } = req.params;
    const { nombre, clave, correo, contrasena, idTipoUsuario } = req.body;
    console.log(`Editando usuario con ID: ${idUsuario}`);
    console.log({ nombre, clave, correo, contrasena, idTipoUsuario });
    const usuarioAux = { nombre, clave, correo, contrasena, idTipoUsuario };
    try {
        await UsuarioDAO.editarUsuario(idUsuario, usuarioAux);
        res.status(200).json({ message: 'Usuario editado correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al editar el usuario' });
    }
}

const pruebaDelete = async (req,res = response) => {
    const { idUsuario } = req.params;
    console.log(`Eliminando usuario con ID: ${idUsuario}`);
    try {
        await UsuarioDAO.eliminarUsuario(idUsuario);
        res.status(200).json({ message: 'Usuario eliminado correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar el usuario' });
    }
}

const pruebaGetUsuarios = async (req, res = response) => {
    const { idUsuario } = req.params;
    console.log(`Consultando usuarios asignados al secretario con id: ${idUsuario}`);

    try {
        if (!idUsuario) {
            return res.status(400).json({ message: 'El idSecretario es obligatorio' });
        }

        const usuarios = await UsuarioDAO.consultarUsuariosPorSecretario(idUsuario);
        res.status(200).json(usuarios);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al consultar usuarios' });
    }
};

const validarUsuario = async (req, res) => {
    const { clave, contrasena } = req.body;

    try {
        console.log(clave, "", contrasena)
        const usuario = await UsuarioDAO.validarUsuarioYContrasena(clave, contrasena);

        const token = generarTokenJWT(usuario.idUsuario, usuario.nombre, usuario.idTipoUsuario);
        console.log(token);
        res.status(200).json({
            message: 'Token generado',
            token
        });
    } catch (error) {
        console.error('Error al validar usuario:', error.message);
        res.status(400).json({ message: error.message });
    }
};

const JWT_SECRET = 'DesarrolloSistemasEnRedUVTeamRocket';

const generarTokenJWT = (idUsuario, nombre, idTipoUsuario) => {
    if (!idUsuario || !nombre || !idTipoUsuario) {
        throw new Error('Todos los campos (idUsuario, nombre, idTipoUsuario) son obligatorios');
    }

    const payload = {
        idUsuario,
        nombre,
        idTipoUsuario
    };

    const token = jwt.sign(payload, JWT_SECRET, {
        expiresIn: '1h'
    });

    return token;
};

module.exports = {pruebaGetUsuarios, pruebaPost, pruebaPatch, pruebaDelete, validarUsuario}
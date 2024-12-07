//Usar este import para todos los controllers
const {response} = require("express");
//*******************************************
const Usuario = require("../DTOs/Usuario");
const UsuarioDAO = require("../DataAccessObjects/UsuarioDAO");
const pruebaGet = async (req,res = response) => {
    let usuarioPrueba = new Usuario(1, "Juanito", "correo@correo.com", "123");
    res.json(usuarioPrueba)
}
const pruebaPost = async (req,res = response) => {
    const {nombre, clave, correo, contrasena, idTipoUsuario} = req.body;
    console.log(nombre, clave, correo, contrasena);
    const usuario = {nombre, clave, correo, contrasena, idTipoUsuario};
    await UsuarioDAO.crearUsuario(usuario);
    res.status(200).json({ message: 'Se registró'});
}
module.exports = {pruebaGet, pruebaPost}
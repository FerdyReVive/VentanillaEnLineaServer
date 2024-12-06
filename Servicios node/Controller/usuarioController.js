//Usar este import para todos los controllers
const {response} = require("express");
//*******************************************
const Usuario = require("../DataAccessObjects/Usuario");
const pruebaGet = async (req,res = response) => {
    let usuarioPrueba = new Usuario(1, "Juanito", "correo@correo.com", "123");
    res.json(usuarioPrueba)
}
const pruebaPost = async (req,res = response) => {
    const {idUsuario, Nombre, Correo, Contrasena} = req.body;
    console.log(idUsuario, Nombre, Correo, Contrasena);
    res.status(200).json({ message: 'Se registró'});
}
module.exports = {pruebaGet, pruebaPost}
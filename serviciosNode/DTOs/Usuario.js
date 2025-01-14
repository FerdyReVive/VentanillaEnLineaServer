class Usuario {
    constructor(idUsuario, nombre, clave, correo, contrasena, idTipoUsuario, idSecretarioAsignado, estado) {
        this.idUsuario = idUsuario;
        this.nombre = nombre;
        this.clave = clave;
        this.correo = correo;
        this.contrasena = contrasena;
        this.idTipoUsuario = idTipoUsuario;
        this.idSecretarioAsignado = idSecretarioAsignado;
        this.estado = estado;
    }
}

module.exports = Usuario;

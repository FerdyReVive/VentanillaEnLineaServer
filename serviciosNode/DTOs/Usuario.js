class Usuario {
    constructor(_idUsuario, _Nombre, _Clave, _Correo, _Contrasena, _idTipoUsuario) {
        this.idUsuario = _idUsuario; 
        this.nombre = _Nombre; 
        this.clave = _Clave; 
        this.correo = _Correo; 
        this.contrasena = _Contrasena;
        this.idTipoUsuario = _idTipoUsuario;
    }
}

module.exports = Usuario;

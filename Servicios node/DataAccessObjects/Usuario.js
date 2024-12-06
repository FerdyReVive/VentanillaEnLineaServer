class Usuario {
    constructor(_idUsuario, _Nombre, _Correo, _Contrasena){
        this.contrasena = _Contrasena;
        this.correo = _Correo;
        this.nombre = _Nombre;
        this.idUsuario = _idUsuario;
    }
}
module.exports=Usuario
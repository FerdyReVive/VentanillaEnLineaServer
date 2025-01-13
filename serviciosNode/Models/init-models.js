var DataTypes = require("sequelize").DataTypes;
var _documento = require("./documento");
var _experienciaeducativa = require("./experienciaeducativa");
var _tipotramite = require("./tipotramite");
var _tipousuario = require("./tipousuario");
var _tramite = require("./tramite");
var _usuario = require("./usuario");
var _usuarioexperienciaeducativa = require("./usuarioexperienciaeducativa");

function initModels(sequelize) {
  var documento = _documento(sequelize, DataTypes);
  var experienciaeducativa = _experienciaeducativa(sequelize, DataTypes);
  var tipotramite = _tipotramite(sequelize, DataTypes);
  var tipousuario = _tipousuario(sequelize, DataTypes);
  var tramite = _tramite(sequelize, DataTypes);
  var usuario = _usuario(sequelize, DataTypes);
  var usuarioexperienciaeducativa = _usuarioexperienciaeducativa(sequelize, DataTypes);

  usuarioexperienciaeducativa.belongsTo(experienciaeducativa, { as: "idExperienciaEducativa_experienciaeducativa", foreignKey: "idExperienciaEducativa"});
  experienciaeducativa.hasMany(usuarioexperienciaeducativa, { as: "usuarioexperienciaeducativas", foreignKey: "idExperienciaEducativa"});
  tramite.belongsTo(tipotramite, { as: "idTipoTramite_tipotramite", foreignKey: "idTipoTramite"});
  tipotramite.hasMany(tramite, { as: "tramites", foreignKey: "idTipoTramite"});
  usuario.belongsTo(tipousuario, { as: "idTipoUsuario_tipousuario", foreignKey: "idTipoUsuario"});
  tipousuario.hasMany(usuario, { as: "usuarios", foreignKey: "idTipoUsuario"});
  documento.belongsTo(tramite, { as: "idTramite_tramite", foreignKey: "idTramite"});
  tramite.hasMany(documento, { as: "documentos", foreignKey: "idTramite"});
  tramite.belongsTo(usuario, { as: "idUsuario_usuario", foreignKey: "idUsuario"});
  usuario.hasMany(tramite, { as: "tramites", foreignKey: "idUsuario"});
  usuarioexperienciaeducativa.belongsTo(usuario, { as: "idUsuario_usuario", foreignKey: "idUsuario"});
  usuario.hasMany(usuarioexperienciaeducativa, { as: "usuarioexperienciaeducativas", foreignKey: "idUsuario"});

  return {
    documento,
    experienciaeducativa,
    tipotramite,
    tipousuario,
    tramite,
    usuario,
    usuarioexperienciaeducativa,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;

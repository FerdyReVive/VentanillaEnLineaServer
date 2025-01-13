const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  const Tramite = sequelize.define('tramite', {
    idTramite: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    fecha: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    idTipoTramite: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'tipousuario',
        key: 'idTipoTramite'
      }
    },
    idUsuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'usuario',
        key: 'idUsuario'
      }
    },
    estado: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'tramite',
    timestamps: false
  });

  Tramite.associate = function (models) {
    Tramite.belongsTo(models.usuario, { foreignKey: 'idUsuario', as: 'usuario' });
  };

  return Tramite;
};

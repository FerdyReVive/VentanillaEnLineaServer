const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  const Usuario = sequelize.define('usuario', {
    idUsuario: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    clave: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    correo: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: "correo"
    },
    contrasena: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    idTipoUsuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'tipousuario',
        key: 'idTipoUsuario'
      }
    },
    idSecretarioAsignado: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    estado: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'usuario',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [{ name: "idUsuario" }]
      },
      {
        name: "correo",
        unique: true,
        using: "BTREE",
        fields: [{ name: "correo" }]
      },
      {
        name: "idTipoUsuario",
        using: "BTREE",
        fields: [{ name: "idTipoUsuario" }]
      }
    ]
  });

  Usuario.associate = function (models) {
    Usuario.hasMany(models.tramite, { foreignKey: 'idUsuario', as: 'tramites' });
  };

  return Usuario;
};

const Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
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
        model: 'tipotramite',
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
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'tramite',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idTramite" },
        ]
      },
      {
        name: "idTipoTramite",
        using: "BTREE",
        fields: [
          { name: "idTipoTramite" },
        ]
      },
      {
        name: "idUsuario",
        using: "BTREE",
        fields: [
          { name: "idUsuario" },
        ]
      },
    ]
  });

  Tramite.associate = function(models) {
    Tramite.belongsTo(models.tipotramite, {
      foreignKey: 'idTipoTramite',
      as: 'tipoTramite'
    });

    Tramite.belongsTo(models.usuario, {
      foreignKey: 'idUsuario',
      as: 'usuario'
    });
  };

  return Tramite;
};

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('documento', {
    idDocumento: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    ruta: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    idTramite: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'tramite',
        key: 'idTramite'
      }
    }
  }, {
    sequelize,
    tableName: 'documento',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idDocumento" },
        ]
      },
      {
        name: "idTramite",
        using: "BTREE",
        fields: [
          { name: "idTramite" },
        ]
      },
    ]
  });
};

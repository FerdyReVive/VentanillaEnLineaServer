const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  const UsuarioExperienciaEducativa = sequelize.define('usuarioexperienciaeducativa', {
    idUsuarioExperienciaEducativa: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    idUsuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'usuario',
        key: 'idUsuario'
      }
    },
    idExperienciaEducativa: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'experienciaeducativa',
        key: 'idExperienciaEducativa'
      }
    }
  }, {
    sequelize,
    tableName: 'usuarioexperienciaeducativa',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idUsuarioExperienciaEducativa" },
        ]
      },
      {
        name: "idUsuario",
        using: "BTREE",
        fields: [
          { name: "idUsuario" },
        ]
      },
      {
        name: "idExperienciaEducativa",
        using: "BTREE",
        fields: [
          { name: "idExperienciaEducativa" },
        ]
      },
    ]
  });

  UsuarioExperienciaEducativa.associate = function(models) {
    UsuarioExperienciaEducativa.belongsTo(models.usuario, {
      foreignKey: 'idUsuario',
      as: 'usuario'
    });

    UsuarioExperienciaEducativa.belongsTo(models.experienciaeducativa, {
      foreignKey: 'idExperienciaEducativa',
      as: 'experienciaEducativa'
    });
  };

  return UsuarioExperienciaEducativa;
};
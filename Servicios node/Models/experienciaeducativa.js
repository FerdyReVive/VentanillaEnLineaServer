const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  const ExperienciaEducativa = sequelize.define('experienciaeducativa', {
    idExperienciaEducativa: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    NRC: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'experienciaeducativa',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idExperienciaEducativa" },
        ]
      },
    ]
  });

  ExperienciaEducativa.associate = function(models) {
    // Relación con la tabla intermedia usuarioexperienciaeducativa
    ExperienciaEducativa.hasMany(models.usuarioexperienciaeducativa, {
        foreignKey: 'idExperienciaEducativa',
        as: 'usuarioExperiencia', // Alias debe coincidir con el utilizado en el DAO
    });

    // Relación con usuarios a través de usuarioexperienciaeducativa
    ExperienciaEducativa.belongsToMany(models.usuario, {
        through: models.usuarioexperienciaeducativa,
        foreignKey: 'idExperienciaEducativa',
        otherKey: 'idUsuario',
        as: 'usuarios',
    });
};

  return ExperienciaEducativa;
};
module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('role', {
    name: {
      type: DataTypes.STRING,
    },
  });

  // Association avec la table trainer
  Role.associate = (models) => {
    Role.hasMany(models.trainer);
  };
  return Role;
};

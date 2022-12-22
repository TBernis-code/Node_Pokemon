// Model of the Role table
module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('role', {
    name: {
      type: DataTypes.STRING,
    },
  });

  // Association with the trainer table
  Role.associate = (models) => {
    Role.hasMany(models.trainer);
  };
  /*
  try {
    // Init the base value
    Role.create({
      id: 1,
      name: 'ADMIN',
    });

    Role.create({
      id: 2,
      name: 'USER',
    });
  } catch (error) {
    console.log(`Roles create init failed${error}`);
  }
  */
  return Role;
};

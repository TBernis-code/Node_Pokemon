module.exports = (sequelize, Sequelize) => {
  const Trainer = sequelize.define('trainer', {
    nom: { // Nom du trainer
      type: Sequelize.STRING,
    },
    prenom: { // Prénom du trainer
      type: Sequelize.STRING,
    },
    login: { // Login du trainer
      type: Sequelize.STRING,
    },
    password: { // Mot de passe du trainer
      type: Sequelize.STRING,
    },
    age: { // Age du trainer
      type: Sequelize.INTEGER,
    },
  });

  Trainer.associate = (models) => {
    Trainer.hasMany(models.pokemon);
    Trainer.belongsTo(models.role);
  };

  return Trainer;
};

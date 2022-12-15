module.exports = (sequelize, Sequelize) => {
  const Dresseur = sequelize.define("dresseur", {
    nom: { // Nom du dresseur 
      type: Sequelize.STRING
    },
    prenom: { // Prénom du dresseur
      type: Sequelize.STRING
    },
    login: { // Login du dresseur
      type: Sequelize.STRING
    },
    password: { // Mot de passe du dresseur
      type: Sequelize.STRING
    },
    age: { // Age du dresseur
      type: Sequelize.INTEGER
    },
    /*
    roles: { // Rôles du dresseur
      type: Sequelize.STRING
    },
*/
  });

  Dresseur.associate = (models) => {
    Dresseur.hasMany(models.pokemon);
  };

  return Dresseur;
};
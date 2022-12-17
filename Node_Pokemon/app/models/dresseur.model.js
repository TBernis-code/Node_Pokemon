var bcrypt = require("bcrypt");

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
    role: { // Rôles du dresseur
      type: Sequelize.STRING
    },
    */
  });

  Dresseur.associate = (models) => {
    Dresseur.hasMany(models.pokemon);
    Dresseur.belongsTo(models.role);

  };

  try {
    Dresseur.create({
        id: 1,
        nom: "Pokemaniac",
        prenom: "Léo",
        login: "leopkmn",
        password: bcrypt.hashSync("cynthia", 5),
        age: 23,
        //role: "admin"
    });
}
catch (error) {
    console.log("Dresseur create init failed"+error)
}


  return Dresseur;
};
//var bcrypt = require("bcrypt");

module.exports = (sequelize, Sequelize) => {
  const Trainer = sequelize.define("trainer", {
    nom: { // Nom du trainer 
      type: Sequelize.STRING
    },
    prenom: { // Prénom du trainer
      type: Sequelize.STRING
    },
    login: { // Login du trainer
      type: Sequelize.STRING
    },
    password: { // Mot de passe du trainer
      type: Sequelize.STRING
    },
    age: { // Age du trainer
      type: Sequelize.INTEGER
    },
    /*
    role: { // Rôles du trainer
      type: Sequelize.STRING
    },
    */
  });

  Trainer.associate = (models) => {
    Trainer.hasMany(models.pokemon);
    Trainer.belongsTo(models.role);

  };
/*
  try {
    Trainer.create({
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
    console.log("Trainer create init failed"+error)
}
*/

  return Trainer;
};
module.exports = (sequelize, Sequelize) => {
  const Pokemon = sequelize.define('pokemon', {
    espece: { // Espèce du pokemon
      type: Sequelize.STRING,
    },
    nom: { // Nom du pokemon
      type: Sequelize.STRING,
    },
    niveau: { // Niveau du pokemon
      type: Sequelize.INTEGER,
    },
    genre: { // Genre du pokemon
      type: Sequelize.STRING,
    },
    taille: { // Taille du pokemon
      type: Sequelize.INTEGER,
    },
    poids: { // Poids du pokemon
      type: Sequelize.INTEGER,
    },
    chromatique: { // Est-ce que le pokemon est chromatique ?
      type: Sequelize.BOOLEAN,
    },

  });

  Pokemon.associate = (models) => {
    Pokemon.belongsTo(models.trainer);
  };
  return Pokemon;
};

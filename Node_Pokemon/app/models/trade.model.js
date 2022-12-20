module.exports = (sequelize, Sequelize) => {
  const Trade = sequelize.define('trade', {

    trainer1: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    trainer2: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    pokemon1: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    pokemon2: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    status: {
      type: Sequelize.STRING,
      allowNull: false,
    },

  });
  return Trade;
};

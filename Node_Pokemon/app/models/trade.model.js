module.exports = (sequelize, Sequelize) => {
    const Trade = sequelize.define("trade", {

        old_trainer_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        new_trainer_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        old_pokemon_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        new_pokemon_id: {
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
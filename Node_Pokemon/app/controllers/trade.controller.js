const db = require("../models");
const Trainer = db.trainers;
const Pokemon = db.pokemons;
const Trade = db.trades;
const logger = require('../../logger');


exports.propose_trade = async (req, res) => {
    const {
        oldTrainerId,
        newTrainerId,
        oldPokemonId,
        newPokemonId
    } = req.body;

    try {
        // Find the Trainer records
        const oldTrainer = await Trainer.findByPk(oldTrainerId);
        const newTrainer = await Trainer.findByPk(newTrainerId);
        const oldPokemon = await Pokemon.findByPk(oldPokemonId);
        const newPokemon = await Pokemon.findByPk(newPokemonId);

        logger.info( "--->>" + oldTrainer.id + " " + newTrainer.id + " " + oldPokemon.id + " " + newPokemon.id);


        // Create a new Trade proposal record
        await Trade.create({
            old_trainer_id: oldTrainer.id,
            new_trainer_id: newTrainer.id,
            old_pokemon_id: oldPokemon.id,
            new_pokemon_id: newPokemon.id,
            status: 'pending',
        });

        // Return a response indicating that the trade proposal was successfully submitted
        logger.info( "Trade proposal submitted successfully :" );
        res.send({
            message: 'Trade proposal submitted'
        });
    } catch (error) {
        logger.info( "Error during trade: " + error);
        // Handle any errors that occurred during the trade proposal
        res.status(500).send({
            message: error
        });
    }
}

exports.accept_reject_trade = async (req, res) => {
    const {
        tradeId,
        status
    } = req.body;

    try {
        // Find the Trade proposal record
        const trade = await Trade.findByPk(tradeId);

        if (status === 'accepted') {
            // Find the Pokemon records involved in the trade
            const pokemon_old = await Pokemon.findByPk(trade.old_pokemon_id);
            const pokemon_new = await Pokemon.findByPk(trade.new_pokemon_id);

            pokemon_old.set('trainerId', trade.new_trainer_id);
            pokemon_new.set('trainerId', trade.old_trainer_id);

            // Save the updated Pokemon records to the database
            await Promise.all(pokemon_old.save(), pokemon_new.save());
        }

        // Update the status field of the Trade proposal record
        trade.set('status', status);

        // Save the updated Trade proposal record to the database
        await trade.save();

        // Return a response indicating that the trade proposal was successfully accepted or rejected
        res.send({
            message: 'Trade proposal accepted or rejected'
        });
    } catch (error) {
        // Handle any errors that occurred during the accept/reject process
        res.status(500).send({
            message: error
        });
    }
}
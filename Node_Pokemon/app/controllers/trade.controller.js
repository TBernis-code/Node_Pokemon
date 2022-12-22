/* eslint-disable camelcase */
const db = require('../models');

const Trainer = db.trainers;
const Pokemon = db.pokemons;
const Trade = db.trades;
const logger = require('../../logger');

exports.propose_trade = async (req, res) => {
  const {
    idTrainer1,
    idTrainer2,
    idPokemon1,
    idPokemon2,
  } = req.body;

  try {
    // Find the Trainer records
    const trainer1 = await Trainer.findByPk(idTrainer1);
    const trainer2 = await Trainer.findByPk(idTrainer2);
    const pokemon1 = await Pokemon.findByPk(idPokemon1);
    const pokemon2 = await Pokemon.findByPk(idPokemon2);

    logger.info(`--->>${trainer1.id} ${trainer2.id} ${pokemon1.id} ${pokemon2.id}`);

    // Create a new Trade proposal record
    await Trade.create({
      trainer1: trainer1.id,
      trainer2: trainer2.id,
      pokemon1: pokemon1.id,
      pokemon2: pokemon2.id,
      status: 'pending',
    });

    // Return a response indicating that the trade proposal was successfully submitted
    logger.info('Trade proposal submitted successfully !');
    res.send({
      message: 'Trade proposal submitted',
    });
  } catch (error) {
    logger.info(`Error during trade: ${error}`);
    // Handle any errors that occurred during the trade proposal
    res.status(500).send({
      message: error,
    });
  }
};

exports.accept_reject_trade = async (req, res) => {
  const {
    tradeId,
    status,
  } = req.body;

  try {
    // Find the Trade proposal 
    const trade = await Trade.findByPk(tradeId);

    if (status === 'accepted') {
      // Find the Pokemon involved in the trade
      const pokemon1 = await Pokemon.findByPk(trade.pokemon1);
      const pokemon2 = await Pokemon.findByPk(trade.pokemon2);

      pokemon1.set('trainerId', trade.trainer2);
      pokemon2.set('trainerId', trade.trainer1);

      pokemon1.save();
      pokemon2.save();

      // Save the updated Pokemon to the database
      //await Promise.all(pokemon1.save(), pokemon2.save());
    }

    // Update the status field of the Trade proposal 
    trade.set('status', status);

    // Save the updated Trade proposal to the database
    await trade.save();

    // Return a response indicating that the trade proposal was successfully accepted or rejected
    res.send({
      message: 'Trade proposal has been ' + status,
    });
  } catch (error) {
    // Handle any errors that occurred during the accept/reject process
    res.status(500).send({
      message: error,
    });
  }
};

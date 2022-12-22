/* eslint-disable camelcase */
const db = require('../models');

const Trainer = db.trainers;
const Pokemon = db.pokemons;
const Trade = db.trades;
const logger = require('../../logger');

// Propose un échange entre deux dresseurs
exports.propose_trade = async (req, res) => {
  const {
    idTrainer1,
    idTrainer2,
    idPokemon1,
    idPokemon2,
  } = req.body;

  try {
    const trainer1 = await Trainer.findByPk(idTrainer1);
    const trainer2 = await Trainer.findByPk(idTrainer2);
    const pokemon1 = await Pokemon.findByPk(idPokemon1);
    const pokemon2 = await Pokemon.findByPk(idPokemon2);

    logger.info(`--->>${trainer1.id} ${trainer2.id} ${pokemon1.id} ${pokemon2.id}`);

    // Créer une nouvelle proposition d'échange
    await Trade.create({
      trainer1: trainer1.id,
      trainer2: trainer2.id,
      pokemon1: pokemon1.id,
      pokemon2: pokemon2.id,
      status: 'pending',
    });

    // Retourne une réponse indiquant que la proposition d'échange a été soumise avec succès
    logger.info('Trade proposal submitted successfully !');
    res.send({
      message: 'Trade proposal submitted',
    });
  } catch (error) {
    logger.info(`Error during trade: ${error}`);
    res.status(500).send({
      message: error,
    });
  }
};

// Accepter ou refuser une proposition d'échange
exports.accept_reject_trade = async (req, res) => {
  const {
    tradeId,
    status,
  } = req.body;

  try {
    const trade = await Trade.findByPk(tradeId);

    if (status === 'accepted') {
      // Find the Pokemon involved in the trade
      const pokemon1 = await Pokemon.findByPk(trade.pokemon1);
      const pokemon2 = await Pokemon.findByPk(trade.pokemon2);

      pokemon1.set('trainerId', trade.trainer2);
      pokemon2.set('trainerId', trade.trainer1);

      pokemon1.save();
      pokemon2.save();
    }

    // Update du status de la proposition d'échange
    trade.set('status', status);

    await trade.save();

    res.send({
      message: 'Trade proposal has been ' + status,
    });
  } catch (error) {
    res.status(500).send({
      message: error,
    });
  }
};

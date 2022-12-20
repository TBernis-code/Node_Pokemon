const router = require('express').Router();
const { authJwt } = require('../middleware');
const trainers = require('../controllers/trainer.controller');

module.exports = (app) => {
  // Create a new trainer
  router.post('/', [authJwt.verifyToken, authJwt.isAdmin], trainers.create);

  // Retrieve all trainers
  router.get('/', [authJwt.verifyToken, authJwt.isAdmin], trainers.findAll);

  // Retrieve a single trainer with id
  router.get('/:id', [authJwt.verifyToken], trainers.findOne);

  // Retrieve all pokemons of a trainer
  router.get('/:id/pokemons', [authJwt.verifyToken], trainers.findAllPokemons);

  // Update a trainer with id
  router.put('/:id', [authJwt.verifyToken, authJwt.verifyDresseur], trainers.update);

  // Delete a trainer with id
  router.delete('/:id', [authJwt.verifyToken, authJwt.verifyDresseur], trainers.delete);

  app.use('/trainers', router);
};

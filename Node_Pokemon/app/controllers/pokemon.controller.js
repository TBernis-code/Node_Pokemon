const db = require('../models');
const logger = require('../../logger');

const Pokemon = db.pokemons;


// Créer et sauvegarder un nouveau Pokemon
exports.create = (req, res) => {
  // Validate request
  if (!req.body.nom) {
    logger.info('empty request');
    res.status(400).send({
      message: 'Content can not be empty!',
    });
    return;
  }

  // Créer un Pokemon
  const pokemon = {
    espece: req.body.espece,
    nom: req.body.nom,
    niveau: req.body.niveau,
    genre: req.body.genre,
    taille: req.body.taille,
    poids: req.body.poids,
    chromatique: req.body.chromatique,
    trainerId: req.body.trainerId,
  };

  // Sauvegarder le Pokemon dans la base de données
  Pokemon.create(pokemon)
    .then((data) => {
      logger.info('Pokemon created');
      res.send(data);
    })
    .catch((err) => {
      logger.error(`Pokemon creation failed :${err}`);
      res.status(500).send({
        message:
          err.message || 'Some error occurred while creating the Pokemon.',
      });
    });
};

// Réccupérer tous les Pokemons de la base de données
exports.findAll = (req, res) => {
  Pokemon.findAll()
    .then((data) => {
      logger.info('All pokemons requested sent');
      res.send(data);
    })
    .catch((err) => {
      logger.error(`All pokemons request failed :${err}`);
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving Pokemons.',
      });
    });
};

// Réccupérer un Pokemon avec un id
exports.findOne = (req, res) => {
  const { id } = req.params;

  Pokemon.findByPk(id)
    .then((data) => {
      if (data) {
        logger.info('Pokemon requested sent');
        res.send(data);
      } else {
        logger.info(`Pokemon requested not found :${id}`);
        res.status(404).send({
          message: `Cannot find Pokemon with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      logger.error(`Pokemon request failed :${err}`);
      res.status(500).send({
        message: `Error retrieving Pokemon with id=${id}`,
      });
    });
};

// Update d'un Pokemon avec un id
exports.update = (req, res) => {
  const { id } = req.params;

  Pokemon.update(req.body, {
    where: { id },
  })
    .then((num) => {
      if (num === 1) {
        logger.info(`Pokemon updated successfully : ${id}`);
        res.send({
          message: 'Pokemon was updated successfully.',
        });
      } else {
        logger.info(`Pokemon not found or request empty : ${id}`);
        res.send({
          message: `Cannot update Pokemon with id=${id}. Maybe Pokemon was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      logger.error(`Pokemon update failed :${err}`);
      res.status(500).send({
        message: `Error updating Pokemon with id=${id}`,
      });
    });
};

// Suppression d'un Pokemon avec un id
exports.delete = (req, res) => {
  const { id } = req.params;

  Pokemon.destroy({
    where: { id },
  })
    .then((num) => {
      if (num === 1) {
        logger.info(`Pokemon deleted successfully : ${id}`);
        res.send({
          message: 'Pokemon was deleted successfully!',
        });
      } else {
        logger.info(`Pokemon not found or request empty : ${id}`);
        res.send({
          message: `Cannot delete Pokemon with id=${id}. Maybe Pokemon was not found!`,
        });
      }
    })
    .catch((err) => {
      logger.error(`Pokemon delete failed :${err}`);
      res.status(500).send({
        message: `Could not delete Pokemon with id=${id}`,
      });
    });
};

const db = require("../models");
const Pokemon = db.pokemons;
const Op = db.Sequelize.Op;
const logger = require('../../logger');

// Create and Save a new Pokemon
exports.create = (req, res) => {
  // Validate request
  if (!req.body.login) {
    logger.info("empty request");
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Pokemon
  const pokemon = {
    espece: req.body.espece,
    nom: req.body.nom,
    niveau: req.body.niveau,
    genre: req.body.genre,
    taille: req.body.taille,
    poids: req.body.poids,
    chromatique: req.body.chromatique,
  };

  // Save Pokemon in the database
  Pokemon.create(pokemon)
    .then(data => {
      logger.info('Pokemon created');
      res.send(data);
    })
    .catch(err => {
      logger.error('Pokemon creation failed :' + err);
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Pokemon."
      });
    });
};

// Retrieve all Pokemons from the database.
exports.findAll = (req, res) => {
  Pokemon.findAll()
    .then(data => {
      logger.info('All pokemons requested sent');
      res.send(data);
    })
    .catch(err => {
      logger.error('All pokemons request failed :' + err);
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Pokemons."
      });
    });
};

// Find a single Pokemon with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Pokemon.findByPk(id)
    .then(data => {
      if (data) {
        logger.info('Pokemon requested sent');
        res.send(data);
      } else {
        logger.info('Pokemon requested not found :' + id);
        res.status(404).send({
          message: `Cannot find Pokemon with id=${id}.`
        });
      }
    })
    .catch(err => {
      logger.error('Pokemon request failed :' + err);
      res.status(500).send({
        message: "Error retrieving Pokemon with id=" + id
      });
    });
};

// Update a Pokemon by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Pokemon.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        logger.info( 'Pokemon updated successfully : ' + id);
        res.send({
          message: "Pokemon was updated successfully."
        });
      } else {
        logger.info( 'Pokemon not found or request empty : ' + id);
        res.send({
          message: `Cannot update Pokemon with id=${id}. Maybe Pokemon was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      logger.error('Pokemon update failed :' + err);
      res.status(500).send({
        message: "Error updating Pokemon with id=" + id
      });
    });
};

// Delete a Pokemon with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Pokemon.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        logger.info( 'Pokemon deleted successfully : ' + id);
        res.send({
          message: "Pokemon was deleted successfully!"
        });
      } else {
        logger.info( 'Pokemon not found or request empty : ' + id);
        res.send({
          message: `Cannot delete Pokemon with id=${id}. Maybe Pokemon was not found!`
        });
      }
    })
    .catch(err => {
      logger.error('Pokemon delete failed :' + err);
      res.status(500).send({
        message: "Could not delete Pokemon with id=" + id
      });
    });
};


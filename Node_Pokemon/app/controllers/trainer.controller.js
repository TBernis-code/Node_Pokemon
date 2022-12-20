const bcrypt = require('bcrypt');
const db = require('../models');

const Trainer = db.trainers;
const logger = require('../../logger');

// Create and Save a new Trainer
exports.create = (req, res) => {
  // Validate request
  if (!req.body.login) {
    logger.info('empty request');
    res.status(400).send({
      message: 'Content can not be empty!',
    });
    return;
  }

  // Create a Trainer
  const trainer = {
    nom: req.body.nom,
    prenom: req.body.prenom,
    login: req.body.login,
    password: bcrypt.hashSync(req.body.password, 5),
    age: req.body.age,
  };

  // Save Trainer in the database
  Trainer.create(trainer)
    .then((data) => {
      logger.info(`Trainer created :${data}`);
      res.send(data);
    })
    .catch((err) => {
      logger.error(`Trainer creation failed :${err}`);
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the Trainer.',
      });
    });
};

// Retrieve all Trainers from the database.
exports.findAll = (req, res) => {
  Trainer.findAll(
    { attributes: ['nom', 'prenom', 'age'], include: ['pokemons'] },
  )
    .then((data) => {
      logger.info(`All trainers requested sent : ${data.length}`);
      res.send(data);
    })
    .catch((err) => {
      logger.error(`All trainers request failed : ${err}`);
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving Trainers.',
      });
    });
};

// Find a single Trainer with an id
exports.findOne = (req, res) => {
  const { id } = req.params;

  Trainer.findByPk(id, {
    include: ['pokemons'],
    attributes: ['nom', 'prenom', 'age'],
  })
    .then((data) => {
      if (data) {
        logger.info(`Trainer requested sent : ${data}`);
        res.send(data);
      } else {
        logger.info(`Trainer not found : ${id}`);
        res.status(404).send({
          message: `Cannot find Trainer with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      logger.error(`Trainer request failed : ${err}`);
      res.status(500).send({
        message: `Error retrieving Trainer with id=${id}`,
      });
    });
};

const getPagination = (page, size) => {
  const limit = size ? +size : 2;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: pokemons } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return {
    totalItems, pokemons, totalPages, currentPage,
  };
};

// get all pokemons of a trainer
exports.findAllPokemons = (req, res) => {
  const { id } = req.params;

  const { page, size } = req.query;
  const { limit } = getPagination(page, size);

  Trainer.findByPk(id, {
    include: ['pokemons'],
    attributes: [],
  })
    .then((data) => {
      if (data) {
        const response = getPagingData(data.pokemons, page, limit);
        res.send(response);
        logger.info(`Trainer requested sent : ${response}`);
      } else {
        logger.info(`Trainer not found : ${id}`);
        res.status(404).send({
          message: `Cannot find Trainer with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      logger.error(`Trainer request failed : ${err}`);
      res.status(500).send({
        message: `Error retrieving Trainer with id=${id}`,
      });
    });
};

// Update a Trainer by the id in the request
exports.update = (req, res) => {
  const { id } = req.params;

  Trainer.update(req.body, {
    where: {
      id,
    },
  })
    .then((num) => {
      if (num === 1) {
        logger.info(`Trainer updated : ${id}`);
        res.send({
          message: 'Trainer was updated successfully.',
        });
      } else {
        logger.info(`Trainer not found : ${id}`);
        res.send({
          message: `Cannot update Trainer with id=${id}. Maybe Trainer was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      logger.error(`Trainer update failed : ${err}`);
      res.status(500).send({
        message: `Error updating Trainer with id=${id}`,
      });
    });
};

// Delete a Trainer with the specified id in the request
exports.delete = (req, res) => {
  const { id } = req.params;

  Trainer.destroy({
    where: {
      id,
    },
  })
    .then((num) => {
      if (num === 1) {
        logger.info(`Trainer deleted : ${id}`);
        res.send({
          message: 'Trainer was deleted successfully!',
        });
      } else {
        logger.info(`Trainer not found : ${id}`);
        res.send({
          message: `Cannot delete Trainer with id=${id}. Maybe Trainer was not found!`,
        });
      }
    })
    .catch((err) => {
      logger.error(`Trainer delete failed : ${err}`);
      res.status(500).send({
        message: `Could not delete Trainer with id=${id}`,
      });
    });
};

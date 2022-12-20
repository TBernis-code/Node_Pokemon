/* eslint-disable consistent-return */
/* eslint-disable no-undef */

const jwt = require('jsonwebtoken');
const db = require('../models');

const Trainer = db.trainers;
const Pokemon = db.pokemons;
const logger = require('../../logger');

// Vérifie si un token a été envoyé avec la requête
verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    logger.info('No token provided!');
    return res.status(403).send({
      message: 'No token provided!',
    });
  }

  const bearerToken = token.split(' ');

  if (bearerToken.length !== 2 || bearerToken[0] !== 'Bearer') {
    logger.info('Invalid token!');
    return res.status(401).send({
      error: 'Invalid token!',
    });
  }

  jwt.verify(bearerToken[1], process.env.secret, (err, decoded) => {
    if (err) {
      logger.info(`Unauthorized :${err}`);
      return res.status(401).send({
        message: 'verifyToken : Unauthorized!',
      });
    }
    req.trainerId = decoded.id;
    next();
  });
};

// vérifie si l'utilisateur qui a envoyé la requête est le propriétaire de la ressource demandé
verifyDresseur = (req, res, next) => {
  const { id } = req.params;
  Trainer.findByPk(req.trainerId).then((trainer) => {
    trainer.getRole().then((role) => {
      if (
        role.name === 'ADMIN'
                || req.trainerId === id
      ) {
        next();
        return;
      }

      res.status(403).send({
        message: 'Require Admin Role!',
      });
    });
  });
};

// vérifie si l'utilisateur qui a envoyé la requête est le propriétaire du Pokemon demandé
verifyPokemon = (req, res, next) => {
  const { id } = req.params;
  Pokemon.findByPk(id).then((pokemon) => {
    if (pokemon.trainerId === req.trainerId || req.isAdmin === true) {
      next();
      return;
    }
    res.status(403).send({
      message: 'Require Admin Role!',
    });
  });
};

// Vérifie si l'utilisateur qui a envoyé la requête est un admin
isAdmin = (req, res, next) => {
  Trainer.findByPk(req.trainerId).then((trainer) => {
    trainer.getRole().then((role) => {
      if (role.name === 'ADMIN') {
        next();
        return;
      }

      res.status(403).send({
        message: 'Require Admin Role!',
      });
    });
  });
};

// Vérifie si l'utilisateur qui a envoyé la requête est un USER
isUser = (req, res, next) => {
  Trainer.findByPk(req.trainerId).then((trainer) => {
    trainer.getRole().then((role) => {
      if (role.name === 'USER' || role.name === 'ADMIN') {
        next();
        return;
      }

      res.status(403).send({
        message: 'Require USER Role!',
      });
    });
  });
};

const authJwt = {
  verifyToken,
  verifyDresseur,
  verifyPokemon,
  isAdmin,
  isUser,
};
module.exports = authJwt;

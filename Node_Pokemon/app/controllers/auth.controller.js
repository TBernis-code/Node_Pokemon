/* eslint-disable consistent-return */
const bcrypt = require('bcrypt');

// const Role = db.roleModel;
// const Op = db.Sequelize.Op;

const jwt = require('jsonwebtoken');
const logger = require('../../logger');
const db = require('../models');

const Trainer = db.trainers;

exports.register = (req, res) => {
  Trainer.create({
    nom: req.body.nom,
    prenom: req.body.prenom,
    login: req.body.login,
    password: bcrypt.hashSync(req.body.password, 8),
    age: req.body.age,
  })
    .then((trainer) => {
      logger.info('Trainer created successfully');

      // Automatically create a User ACCOUNT (type 2)
      trainer.setRole(2).then(() => {
        logger.info(`${trainer.nom}is now user`);
        res.status(200).send({
          message: 'Trainer enregistré avec succès!',
        });
      });
    });
};

exports.login = (req, res) => {
  Trainer.findOne({
    where: {
      login: req.body.login,
    },
  })
    .then((trainer) => {
      if (!trainer) {
        logger.info('Trainer not found');
        return res.status(440).send({
          message: 'Trainer non trouvé.',
        });
      }

      const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        trainer.password,
      );

      if (!passwordIsValid) {
        logger.info('Invalid password');
        return res.status(440).send({
          accessToken: null,
          message: 'Mot de passe invalide!',
        });
      }

      const token = jwt.sign({
        id: trainer.id,
      }, process.env.secret, {
        expiresIn: 86400, // 24 heures
      });

      // eslint-disable-next-line no-unused-vars
      let authority;
      trainer.getRole().then((role) => {
        logger.info(`Role: ${role.name}`);
        authority = `ROLE_${role.name.toUpperCase()}`;

        res.status(200).send({
          accessToken: token,
        });
      });
    })
    .catch((err) => {
      logger.error(err);
      res.status(500).send({
        message: err.message,
      });
    });
};

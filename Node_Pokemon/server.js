const express = require('express');
const cors = require('cors');
require('dotenv').config();

// import express from "express";
// import cors from "cors";
// import swaggerUi from "swagger-ui-express";
const swaggerUi = require('swagger-ui-express');
const bcrypt = require('bcrypt');
const swaggerDocument = require('./swagger.json');
// import swaggerDocument from "./swagger.json" assert { type: "json" };
// import { db } from "./app/models";

const app = express();

const db = require('./app/models');

// Init the base value
const Trainer = db.trainers;
const Role = db.roles;
const Pokemon = db.pokemons;
const logger = require('./logger');

const corsOptions = {
  origin: 'http://localhost:8081',
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

db.sequelize.sync()
  .then(() => {
    console.log('Synced db.');
    try {
      Role.create({
        id: 1,
        name: 'ADMIN',
      });

      Role.create({
        id: 2,
        name: 'USER',
      });

      Trainer.create({
        id: 1,
        nom: 'Pokemaniac',
        prenom: 'Léo',
        login: 'leopkmn',
        password: bcrypt.hashSync('cynthia', 5),
        age: 23,
      // role: "admin"
      }).then((trainer) => {
        trainer.setRole(1).then(() => {
          console.log(
            `${trainer.nom}is now admin`,
          );
        });
      });

      Trainer.create({
        id: 2,
        nom: 'Bourg-Palette',
        prenom: 'Sacha',
        login: 'toto',
        password: bcrypt.hashSync('123456', 5),
        age: 15,
      }).then((trainer) => {
        trainer.setRole(2).then(() => {
          console.log(
            `${trainer.nom}is now user`,
          );
        });
      });
    } catch (error) {
      console.log(`Trainer create init failed${error}`);
    }

    Pokemon.create({
      espece: 'Pikachu',
      nom: 'Pikachu',
      niveau: 1,
      genre: 'M',
      taille: 0.4,
      poids: 6,
      chromatique: false,
      trainerId: 1,
    });

    Pokemon.create({
      espece: 'Bulbizarre',
      nom: 'Bulbizarre',
      niveau: 10,
      genre: 'M',
      taille: 0.7,
      poids: 6.9,
      chromatique: false,
      trainerId: 1,
    });

    Pokemon.create({
      espece: 'Carapuce',
      nom: 'Carapuce',
      niveau: 50,
      genre: 'F',
      taille: 0.5,
      poids: 9,
      chromatique: false,
      trainerId: 1,
    });

    Pokemon.create({
      espece: 'Salameche',
      nom: 'Salameche',
      niveau: 20,
      genre: 'M',
      taille: 0.6,
      poids: 8.5,
      chromatique: true,
      trainerId: 2,
    });

    Pokemon.create({
      espece: 'Rondoudou',
      nom: 'Rondoudou',
      niveau: 1,
      genre: 'F',
      taille: 0.3,
      poids: 1.8,
      chromatique: true,
      trainerId: 2,
    });
  })
  .catch((err) => {
    console.log(`Failed to sync db: ${err.message}`);
  });

// // drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

// simple route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome' });
});

// routes
require('./app/routes/pokemon.routes')(app);
require('./app/routes/trainer.routes')(app);
require('./app/routes/auth.routes')(app);
require('./app/routes/trade.routes')(app);
require('./app/routes/log.routes')(app);

// set port, listen for requests
const PORT = process.env.NODE_DOCKER_PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
  logger.info(`Server is running on port ${PORT}.`);
});

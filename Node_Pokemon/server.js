const express = require("express");
const cors = require("cors");
require("dotenv").config();

//import express from "express";
//import cors from "cors";
//import swaggerUi from "swagger-ui-express";
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
//import swaggerDocument from "./swagger.json" assert { type: "json" };
//import { db } from "./app/models";

const app = express();

const db = require("./app/models");

//Init the base value
const Trainer = db.trainers;
const Role = db.roles;
const Pokemon = db.pokemons;
const Op = db.Sequelize.Op;
const Trade = db.trades;
const bcrypt = require("bcrypt");
const logger = require('../../logger')


var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
    try {
      Role.create({
        id: 1,
        name: "ADMIN"
    });

    Role.create({
        id: 2,
        name: "USER"
    });

    Trainer.create({
      id: 1,
      nom: "Pokemaniac",
      prenom: "Léo",
      login: "leopkmn",
      password: bcrypt.hashSync("cynthia", 5),
      age: 23,
      //role: "admin"
  }) .then((trainer) => { 
    trainer.setRole(1).then(() => {
      console.log(
        trainer.nom + "is now admin"
        );
      });
    });

    Trainer.create({
      id: 2,
      nom: "Bourg-Palette",
      prenom: "Sacha",
      login: "toto",
      password: bcrypt.hashSync("123456", 5),
      age: 15,
  }) .then((trainer) => { 
    trainer.setRole(2).then(() => {
      console.log(
        trainer.nom + "is now user"
        );
      });
    });

    }
    catch (error) {
      console.log("Trainer create init failed"+error)
    };
    

    Pokemon.create({
      espece: "Pikachu",
      nom: "Pikachu",
      niveau: 1,
      genre: "M",
      taille: 0.4,
      poids: 6,
      chromatique: false,
      trainerId: 1
    });

    Pokemon.create({
      espece: "Bulbizarre",
      nom: "Bulbizarre",
      niveau: 10,
      genre: "M",
      taille: 0.7,
      poids: 6.9,
      chromatique: false,
      trainerId: 1
    });

    Pokemon.create({
      espece: "Carapuce",
      nom: "Carapuce",
      niveau: 50,
      genre: "F",
      taille: 0.5,
      poids: 9,
      chromatique: false,
      trainerId: 1
    });

    Pokemon.create({
      espece: "Salameche",
      nom: "Salameche",
      niveau: 20,
      genre: "M",
      taille: 0.6,
      poids: 8.5,
      chromatique: true,
      trainerId: 2
    });

    Pokemon.create({
      espece: "Rondoudou",
      nom: "Rondoudou",
      niveau: 1,
      genre: "F",
      taille: 0.3,
      poids: 1.8,
      chromatique: true,
      trainerId: 2
    });




  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

// // drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome" });
});


/*


app.post('/propose-trade', async (req, res) => {
  const { oldTrainerId, newTrainerId, oldPokemonId, newPokemonId } = req.body;

  try {
    // Find the Trainer records
    const oldTrainer = await Trainer.findByPk(oldTrainerId);
    const newTrainer = await Trainer.findByPk(newTrainerId);
    const oldPokemon = await Pokemon.findByPk(oldPokemonId);
    const newPokemon = await Pokemon.findByPk(newPokemonId);

    console.log("---------------------------->>"+oldTrainer.id + " " + newTrainer.id + " " + oldPokemon.id + " " + newPokemon.id);


    // Create a new Trade proposal record
    await Trade.create({
      old_trainer_id: oldTrainer.id,
      new_trainer_id: newTrainer.id,
      old_pokemon_id: oldPokemon.id,
      new_pokemon_id: newPokemon.id,
      status: 'pending',
    });

    // Return a response indicating that the trade proposal was successfully submitted
    res.send({ message: 'Trade proposal submitted' });
  } catch (error) {
    // Handle any errors that occurred during the trade proposal
    res.status(500).send({ message: error });
  }
});


app.post('/accept-reject-trade', async (req, res) => {
  const { tradeId, status } = req.body;

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
    res.send({ message: 'Trade proposal accepted or rejected' });
  } catch (error) {
    // Handle any errors that occurred during the accept/reject process
    res.status(500).send({ message: error });
  }
});


*/



// routes
require("./app/routes/pokemon.routes")(app);
require("./app/routes/trainer.routes")(app);
require("./app/routes/auth.routes")(app);





// set port, listen for requests
const PORT = process.env.NODE_DOCKER_PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
  logger.info( `Server is running on port ${PORT}.`);
});




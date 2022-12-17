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
const Dresseur = db.dresseurs;
const Role = db.roles;
const bcrypt = require("bcrypt");

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

    Dresseur.create({
      id: 1,
      nom: "Pokemaniac",
      prenom: "Léo",
      login: "leopkmn",
      password: bcrypt.hashSync("cynthia", 5),
      age: 23,
      //role: "admin"
  }) .then((dresseur) => { 
    dresseur.setRole(1).then(() => {
      console.log(
        dresseur.nom + "is now admin with id"
        );
      });
    });
    }
    catch (error) {
      console.log("Dresseur create init failed"+error)
    }

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

const auth = require("./app/controllers/auth.controller.js");
const { verifyRegister } = require("./app/middleware");

app.post(
  "/register",
  [
    verifyRegister.checkRolesExisted,
  ],
  auth.register
);


app.post("/login", auth.login);
*/

// routes
require("./app/routes/pokemon.routes")(app);
require("./app/routes/dresseur.routes")(app);
require("./app/routes/auth.routes")(app);





// set port, listen for requests
const PORT = process.env.NODE_DOCKER_PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


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

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));



app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const db = require("./app/models");



db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
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

require("./app/routes/dresseur.routes")(app);

// set port, listen for requests
const PORT = process.env.NODE_DOCKER_PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


module.exports = app => {
  const dresseurs = require("../controllers/dresseur.controller.js");

  var router = require("express").Router();

  // Create a new dresseur
  router.post("/", dresseurs.create);

  // Retrieve all dresseurs
  router.get("/", dresseurs.findAll);

  // Retrieve a single dresseur with id
  router.get("/:id", dresseurs.findOne);

  // Update a dresseur with id
  router.put("/:id", dresseurs.update);

  // Delete a dresseur with id
  router.delete("/:id", dresseurs.delete);


  app.use('/dresseurs', router);
};

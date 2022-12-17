const { authJwt } = require("../middleware");

module.exports = app => {
  const dresseurs = require("../controllers/dresseur.controller.js");

  var router = require("express").Router();

  // Create a new dresseur
  router.post("/",[authJwt.verifyToken, authJwt.isAdmin], dresseurs.create);

  // Retrieve all dresseurs
  router.get("/",[authJwt.verifyToken, authJwt.isAdmin], dresseurs.findAll);

  // Retrieve a single dresseur with id
  router.get("/:id",[authJwt.verifyToken], dresseurs.findOne);

  // Update a dresseur with id
  router.put("/:id",[authJwt.verifyToken, authJwt.verifyDresseur], dresseurs.update);

  // Delete a dresseur with id
  router.delete("/:id",[authJwt.verifyToken, authJwt.verifyDresseur], dresseurs.delete);


  app.use('/dresseurs', router);
};

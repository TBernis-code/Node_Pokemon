const authJwt = require("../middleware/authJwt.js");

module.exports = app => {
    const pokemons = require("../controllers/pokemon.controller.js");
  
    var router = require("express").Router();
  
    // Create a new pokemon
    router.post("/",[authJwt.verifyToken, authJwt.isAdmin], pokemons.create);
  
    // Retrieve all pokemons
    router.get("/",[authJwt.verifyToken], pokemons.findAll);
  
    // Retrieve a single pokemon with id
    router.get("/:id",[authJwt.verifyToken], pokemons.findOne);
  
    // Update a pokemon with id
    router.put("/:id",[authJwt.verifyToken, authJwt.verifyPokemon], pokemons.update);
  
    // Delete a pokemon with id
    router.delete("/:id",[authJwt.verifyToken, authJwt.verifyPokemon], pokemons.delete);
  
  
    app.use('/pokemons', router);
  };
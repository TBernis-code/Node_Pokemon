module.exports = app => {
    const pokemons = require("../controllers/pokemon.controller.js");
  
    var router = require("express").Router();
  
    // Create a new pokemon
    router.post("/", pokemons.create);
  
    // Retrieve all pokemons
    router.get("/", pokemons.findAll);
  
    // Retrieve a single pokemon with id
    router.get("/:id", pokemons.findOne);
  
    // Update a pokemon with id
    router.put("/:id", pokemons.update);
  
    // Delete a pokemon with id
    router.delete("/:id", pokemons.delete);
  
  
    app.use('/pokemons', router);
  };
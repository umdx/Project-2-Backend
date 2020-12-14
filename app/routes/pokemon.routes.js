module.exports = app => {
  const pokemons = require("../controllers/pokemon.controller.js");

  var router = require("express").Router();

  // Create a new pokemon
  router.post("/", pokemons.create);

  // Retrieve all pokemon
  router.get("/", pokemons.findAll);
ial
  // Retrieve all published pokemon
  router.get("/published", pokemons.findAllPublished);

  // Retrieve a single pokemon with id
  router.get("/:id", pokemons.findOne);

  // Update a pokemon with id
  router.put("/:id", pokemons.update);

  // Delete a pokemon with id
  router.delete("/:id", pokemons.delete);

  // Delete all pokemon
  router.delete("/", pokemons.deleteAll);

  app.use('/api/pokemons', router);
};

const db = require("../models");
const Pokemon = db.pokemons;
const Op = db.Sequelize.Op;

// Create and Save a new Pokemon
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Pokemon
  const pokemon = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false
  };

  // Save Pokemon in the database
  Pokemon.create(pokemon)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Pokemon."
      });
    });
};

// Retrieve all Pokemon from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Pokemon.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Pokemons."
      });
    });
};

// Find a single Pokemon with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Pokemon.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Pokemon with id=" + id
      });
    });
};

// Update a Pokemon by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Pokemon.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Pokemon was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Pokemon with id=${id}. Maybe Pokemon was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Pokemon with id=" + id
      });
    });
};

// Delete a Pokemon with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Pokemon.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Pokemon was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Pokemon with id=${id}. Maybe Pokemon was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Pokemon with id=" + id
      });
    });
};

// Delete all Pokemon from the database.
exports.deleteAll = (req, res) => {
  Pokemon.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Pokemon were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Pokemon."
      });
    });
};

// find all published Pokemon
exports.findAllPublished = (req, res) => {
  Pokemon.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Pokemon."
      });
    });
};

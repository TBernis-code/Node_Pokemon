const db = require("../models");
const Dresseur = db.dresseurs;
const Op = db.Sequelize.Op;
var bcrypt = require("bcrypt");

// Create and Save a new Dresseur
exports.create = (req, res) => {
  // Validate request
  if (!req.body.login) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Dresseur
  const dresseur = {
    nom: req.body.nom,
    prenom: req.body.prenom,
    login: req.body.login,
    password: bcrypt.hashSync(req.body.password, 5),
    age: req.body.age,
  };

  // Save Dresseur in the database
  Dresseur.create(dresseur)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Dresseur."
      });
    });
};

// Retrieve all Dresseurs from the database.
exports.findAll = (req, res) => {

  Dresseur.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Dresseurs."
      });
    });
};

// Find a single Dresseur with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Dresseur.findByPk(id, {
      include: ["pokemons"],
      attributes: ["nom", "prenom", "age"]
    })
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Dresseur with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Dresseur with id=" + id
      });
    });
};

// Update a Dresseur by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Dresseur.update(req.body, {
      where: {
        id: id
      }
    })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Dresseur was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Dresseur with id=${id}. Maybe Dresseur was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Dresseur with id=" + id
      });
    });
};

// Delete a Dresseur with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Dresseur.destroy({
      where: {
        id: id
      }
    })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Dresseur was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Dresseur with id=${id}. Maybe Dresseur was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Dresseur with id=" + id
      });
    });
};
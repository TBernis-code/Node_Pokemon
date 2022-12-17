/*
This file has all the verification that the routes will go through to check if the dresseur has the correct authorization
*/

const jwt = require("jsonwebtoken");
const db = require("../models");
const Dresseur = db.dresseurModel;
const Pokemon = db.pokemonModel;

//Vérifie si un token a été envoyé avec la requête
verifyToken = (req, res, next) => {
    let token = req.headers["authorization"];
    if (!token) {
        console.log(req.headers);
        return res.status(403).send({
            message: "No token provided!",
        });
    }

    const bearerToken = token.split(" ");

    if (bearerToken.length !== 2 || bearerToken[0] !== "Bearer") {
        return res.status(401).send({
            error: "Invalid token!",
        });
    }



    jwt.verify(bearerToken[1], process.env.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "verifyToken : Unauthorized!",
            });
        }
        req.dresseurId = decoded.id;
        next();
    });
};

//vérifie si l'utilisateur qui a envoyé la requête est le propriétaire de la ressource demandé
verifyDresseur = (req, res, next) => {
    const id = req.params.id;
    Dresseur.findByPk(req.dresseurId).then((dresseur) => {
        dresseur.getRole().then((role) => {
            if (
                role.name === "ADMIN" ||
                req.dresseurId == id
            ) {
                next();
                return;
            }

            res.status(403).send({
                message: "Require Admin Role!",
            });
            return;
        });
    });
};

//vérifie si l'utilisateur qui a envoyé la requête est le propriétaire du pokemon demandé
verifyPokemon = (req, res, next) => {
    const id = req.params.id;
    Pokemon.findByPk(id).then((pokemon) => {
        if (pokemon.dresseurId == req.dresseurId || req.isAdmin == true) {
            next();
            return;
        }
        res.status(403).send({
            message: "Require Admin Role!",
        });
        return;
    });
};

//Vérifie si l'utilisateur qui a envoyé la requête est un admin
isAdmin = (req, res, next) => {
    Dresseur.findByPk(req.dresseurId).then((dresseur) => {
        dresseur.getRole().then((role) => {
            if (role.name === "ADMIN") {
                next();
                return;
            }

            res.status(403).send({
                message: "Require Admin Role!",
            });
            return;
        });
    });
};

//Vérifie si l'utilisateur qui a envoyé la requête est un USER
isUser = (req, res, next) => {
    Dresseur.findByPk(req.dresseurId).then((dresseur) => {
        dresseur.getRole().then((role) => {
            if (role.name === "USER" || role.name === "ADMIN") {
                next();
                return;
            }

            res.status(403).send({
                message: "Require USER Role!",
            });
        });
    });
};

const authJwt = {
    verifyToken: verifyToken,
    verifyDresseur: verifyDresseur,
    verifyPokemon: verifyPokemon,
    isAdmin: isAdmin,
    isUser: isUser,
};
module.exports = authJwt;
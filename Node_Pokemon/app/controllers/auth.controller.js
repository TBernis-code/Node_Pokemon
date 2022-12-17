const db = require("../models");
const Dresseur = db.dresseurs;
//const Role = db.roleModel;
//const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");



exports.register = (req, res) => {

    Dresseur.create({
            nom: req.body.nom,
            prenom: req.body.prenom,
            login: req.body.login,
            password: bcrypt.hashSync(req.body.password, 8),
            age: req.body.age,
        })
        .then((dresseur) => {
            console.log("create dresseur ==============> ", dresseur);

            //Automatically create a User ACCOUNT (type 2)
            dresseur.setRole(2).then(() => {
                console.log(
                    "user create successfully (avec compte subscriber) ==============> "
                );
                res.status(200).send({
                    message: "Dresseur enregistré avec succès!",
                });
            });
        })

};

exports.login = (req, res) => {
    Dresseur.findOne({
            where: {
                login: req.body.login,
            },
        })
        .then((dresseur) => {
            if (!dresseur) {
                return res.status(440).send({
                    message: "Dresseur non trouvé."
                });
            }

            var passwordIsValid = bcrypt.compareSync(
                req.body.password,
                dresseur.password
            );

            if (!passwordIsValid) {
                return res.status(440).send({
                    accessToken: null,
                    message: "Mot de passe invalide!",
                });
            }

            var token = jwt.sign({
                id: dresseur.id
            }, process.env.secret, {
                expiresIn: 86400, // 24 heures
            });

            var authority;
            dresseur.getRole().then((role) => {
                console.log(role);
                authority = "ROLE_" + role.name.toUpperCase();

                res.status(200).send({
                    accessToken: token,
                });
            });
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message
            });
        });
};
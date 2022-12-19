const db = require("../models");
const ROLES = db.ROLES;
const logger = require('../../logger')


// Check if role already exists
checkRolesExisted = (req, res, next) => {
    if (req.body.roles) {
        for (let i = 0; i < req.body.roles.length; i++) {
            if (!ROLES.includes(req.body.roles[i])) {
                logger.info( "Failed! Role does not exist = " + req.body.roles[i]);
                res.status(400).send({
                    message: "Failed! Role does not exist = " + req.body.roles[i]
                });
                return;
            }
        }
    }

    next();
};

const verifyRegister = {
    checkRolesExisted: checkRolesExisted
};

module.exports = verifyRegister;
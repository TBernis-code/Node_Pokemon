const db = require('../models');

const { ROLES } = db;
const logger = require('../../logger').default;

// Check if role already exists
function checkRolesExisted(req, res, next) {
  if (req.body.roles) {
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        logger.info(`Failed! Role does not exist = ${req.body.roles[i]}`);
        res.status(400).send({
          message: `Failed! Role does not exist = ${req.body.roles[i]}`,
        });
        return;
      }
    }
  }

  next();
}

const verifyRegister = {
  checkRolesExisted,
};

module.exports = verifyRegister;

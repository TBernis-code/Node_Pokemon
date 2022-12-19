
const { authJwt } = require("../middleware");
const controller = require("../controllers/log.controller");

module.exports = function (app) {

  app.get("/logs", [authJwt.isAdmin], controller.log);

};

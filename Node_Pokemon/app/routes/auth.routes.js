/*
const { verifyRegister } = require("../middleware");
const controller = require("../controllers/auth.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/register",
    [
      verifyRegister.checkRolesExisted,
    ],
    controller.register
  );


  app.post("/login", controller.login);

  app.use('/', router);

};
*/
module.exports = app => {
    const auth = require("../controllers/auth.controller.js");
    const { verifyRegister } = require("../middleware");
  
    var router = require("express").Router();
  
    router.post("/register",
    [
      verifyRegister.checkRolesExisted,
    ], auth.register);
  
    router.get("/login", auth.login);
  
  
    app.use('/', router);
  };
  

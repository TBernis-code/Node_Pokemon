const { verifyRegister } = require('../middleware');
const controller = require('../controllers/auth.controller');

module.exports = function (app) {
  app.post(
    '/register',
    [
      verifyRegister.checkRolesExisted,
    ],
    controller.register,
  );

  app.post('/login', controller.login);
};

/*
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
  */

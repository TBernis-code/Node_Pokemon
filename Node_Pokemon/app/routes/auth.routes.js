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

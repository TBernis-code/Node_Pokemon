const controller = require('../controllers/trade.controller');
const { authJwt } = require('../middleware');

module.exports = function (app) {
  app.post('/propose-trade',[authJwt.verifyToken], controller.propose_trade);

  app.post('/accept-reject-trade',[authJwt.verifyToken], controller.accept_reject_trade);
};

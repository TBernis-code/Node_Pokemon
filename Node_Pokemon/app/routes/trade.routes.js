const controller = require('../controllers/trade.controller');

module.exports = function (app) {
  app.post('/propose-trade', controller.propose_trade);

  app.post('/accept-reject-trade', controller.accept_reject_trade);
};

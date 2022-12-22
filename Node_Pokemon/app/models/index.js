/* eslint-disable global-require */
const Sequelize = require('sequelize');
const dbConfig = require('../config/db.config');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  port: dbConfig.port,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.trainers = require('./trainer.model')(sequelize, Sequelize.DataTypes);
db.pokemons = require('./pokemon.model')(sequelize, Sequelize.DataTypes);
db.roles = require('./role.model')(sequelize, Sequelize.DataTypes);
db.trades = require('./trade.model')(sequelize, Sequelize.DataTypes);

const models = [
  require('./trainer.model')(sequelize, Sequelize.DataTypes),
  require('./pokemon.model')(sequelize, Sequelize.DataTypes),
  require('./role.model')(sequelize, Sequelize.DataTypes),
  require('./trade.model')(sequelize, Sequelize.DataTypes),
];

models.forEach((model) => {
  db[model.name] = model;
});

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.ROLES = ['USER', 'ADMIN'];

db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;

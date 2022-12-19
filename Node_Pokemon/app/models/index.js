const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  port: dbConfig.port,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.trainers = require("./trainer.model.js")(sequelize, Sequelize);
db.pokemons = require("./pokemon.model.js")(sequelize, Sequelize);  
db.roles = require("./role.model.js")(sequelize, Sequelize);
db.trades = require("./trade.model.js")(sequelize, Sequelize);


let models = [
  require("../models/trainer.model.js")(sequelize, Sequelize.DataTypes),
  require("../models/pokemon.model.js")(sequelize, Sequelize.DataTypes),
  require("../models/role.model.js")(sequelize, Sequelize.DataTypes),
  require("../models/trade.model.js")(sequelize, Sequelize.DataTypes)
];

models.forEach((model) => {
  db[model.name] = model;
});

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});


db.ROLES = ["USER", "ADMIN"];

module.exports = db;

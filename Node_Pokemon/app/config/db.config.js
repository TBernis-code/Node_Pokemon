
//production
module.exports = {
  HOST: process.env.DB_HOST,
  USER: process.env.DB_USER,
  PASSWORD: process.env.DB_PASSWORD,
  DB: process.env.DB_NAME,
  port: process.env.DB_PORT,
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
/*
//development
module.exports = {
  HOST: "localhost",
  USER: "eleda_db_admin",
  PASSWORD: "2ClxGPICJ29TyET6",
  DB: "poke_db",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
*/
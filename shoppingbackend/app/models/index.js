const dbConfig = require("../config/db.config.js");
const express = require("express");
const app = express();
const Sequelize = require("sequelize");
var session = require('express-session');
var SequelizeStore = require('connect-session-sequelize')(session.Store);


const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, 
{
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});
var sessionStore = new SequelizeStore({
   db: sequelize,
   checkExpirationInterval: 15 * 60 * 1000,
   expiration: 7 * 24 * 60 * 60 * 1000
});

app.use(session({
  secret: 'keyboard cat',
  resave: false, saveUninitialized: false,
  store: sessionStore
}));

sessionStore.sync()

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./user.model.js")(sequelize, Sequelize);
db.items = require("./item.model.js")(sequelize, Sequelize);
db.categories = require("./category.model.js")(sequelize, Sequelize);


module.exports = db;
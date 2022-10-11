const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  port: dbConfig.port,
  // operatorsAliases: false,

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

// db.tutorials = require("./tutorial.model.js")(sequelize, Sequelize);

// UTILISATEURS
db.accounts = require("./account.model.js")(sequelize, Sequelize);
db.roles = require("./role.model.js")(sequelize, Sequelize);
db.states = require("./state.model.js")(sequelize, Sequelize);

db.roles.hasMany(db.accounts);
db.accounts.belongsTo(db.roles, { foreignKey: "roleId" });

db.states.hasMany(db.accounts);
db.accounts.belongsTo(db.states, { foreignKey: "stateId" });

module.exports = db;

const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  port: dbConfig.port,

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

// UTILISATEURS
db.accounts = require("./account.model")(sequelize, Sequelize);
db.roles = require("./role.model")(sequelize, Sequelize);
db.states = require("./state.model")(sequelize, Sequelize);
db.teamleadpwds = require("./teamleadpwd.model")(sequelize, Sequelize);

db.roles.hasMany(db.accounts);
db.states.hasMany(db.accounts);

db.accounts.belongsTo(db.roles, { foreignKey: "roleId" });
db.accounts.belongsTo(db.states, { foreignKey: "stateId" });

// INVENTAIRE
db.products = require("./product.model")(sequelize, Sequelize);
db.categoryproducts = require("./categoryproduct.model")(sequelize, Sequelize);
db.mesurements = require("./mesurement.model")(sequelize, Sequelize);
db.vendor = require("./vendor.model")(sequelize, Sequelize);

db.categoryproducts.hasMany(db.products);
db.mesurements.hasMany(db.products);
db.vendor.hasMany(db.products);

db.products.belongsTo(db.categoryproducts, { foreignKey: "categoryId" });
db.products.belongsTo(db.mesurements, { foreignKey: "mesurementId" });
db.products.belongsTo(db.vendor, { foreignKey: "vendorId" });

// CARNET

// TÂCHES

// ANNONCES

module.exports = db;

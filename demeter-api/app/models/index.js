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
db.vendors = require("./vendor.model")(sequelize, Sequelize);

db.categoryproducts.hasMany(db.products);
db.mesurements.hasMany(db.products);
db.vendors.hasMany(db.products);

db.products.belongsTo(db.categoryproducts, { foreignKey: "categoryproductId" });
db.products.belongsTo(db.mesurements, { foreignKey: "mesurementId" });
db.products.belongsTo(db.vendors, { foreignKey: "vendorId" });

// TÂCHES
db.tasks = require("./task.model")(sequelize, Sequelize);
db.categorytasks = require("./categorytask.model")(sequelize, Sequelize);

db.categorytasks.hasMany(db.tasks);
db.tasks.hasMany(db.tasks);

db.tasks.belongsTo(db.categorytasks, { foreignKey: "categorytaskId" });
db.tasks.belongsTo(db.tasks, { foreignKey: "parentId" });

// ANNONCES
db.annoucements = require("./announcement.model")(sequelize, Sequelize);

db.roles.hasMany(db.annoucements);
db.tasks.hasMany(db.annoucements);

db.annoucements.belongsTo(db.roles, { foreignKey: "roleId" });
db.annoucements.belongsTo(db.tasks, { foreignKey: "taskId" });

// CARNET DE RECETTES
db.recipes = require("./recipe.model")(sequelize, Sequelize);
db.categoryrecipes = require("./categoryrecipe.model")(sequelize, Sequelize);
db.rel_productrecipe = require("./rel_productrecipe.model")(sequelize, Sequelize);

db.categoryrecipes.hasMany(db.recipes);
db.recipes.belongsTo(db.categoryrecipes, { foreignKey: "categoryrecipeId" });

db.products.belongsToMany(db.recipes, { through: db.rel_productrecipe });
db.recipes.belongsToMany(db.products, { through: db.rel_productrecipe });

db.mesurements.hasMany(db.rel_productrecipe);
db.rel_productrecipe.belongsTo(db.mesurements, { foreignKey: "mesurementId" });

module.exports = db;

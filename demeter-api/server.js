const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const key = "$2a$10$"
const devPassword = key + process.env.REACT_DEV_PASSWORD;

var corsOptions = {
  origin: process.env.CLIENT_ORIGIN,
};

// express setup
app.use(cors(corsOptions)); // use CORS options
app.use(express.json({limit: "25mb"})); // parse application/json
app.use(express.urlencoded({ extended: true, limit: "25mb" })); // parse application/x-www-form-urlencoded

// initilizes the database
const db = require("./app/models");
db.sequelize.sync({})                 // {force: true} drops the db
  .then(() => {
    console.log("Synced db.");

    // insert roles
    db.roles
      .bulkCreate(
        [
          { id: "1", role: "Administrateur" },
          { id: "2", role: "Succursale" },
          { id: "3", role: "Livreur" },
          { id: "4", role: "Développeur" },
          { id: "5", role: "Cuisine" },
          { id: "6", role: "Boulangerie" },
          { id: "7", role: "Viennoiserie" },
          { id: "8", role: "Pâtisserie" },
          { id: "9", role: "App" },
        ],
        { ignoreDuplicates: true }
      )
      .then(() => console.log("Roles inserted."));

    // insert states
    db.states
      .bulkCreate(
        [
          { id: "1", state: "Inactif" },
          { id: "2", state: "Actif" },
          { id: "3", state: "Banni" },
        ],
        { ignoreDuplicates: true }
      )
      .then(() => console.log("States inserted."));

    // insert category product
    db.categoryproducts
      .bulkCreate(
        [
          { id: "1", category: "Périssable" },
          { id: "2", category: "Non-périssable" },
        ],
        { ignoreDuplicates: true }
      )
      .then(() => console.log("Product categories inserted."));

    // insert mesurements
    db.mesurements
      .bulkCreate(
        [
          { id: "1", mesurement: "g", weight: "1" },
          { id: "2", mesurement: "kg", weight: "1000" },
          { id: "3", mesurement: "mL", weight: "1" },
          { id: "4", mesurement: "L", weight: "1000" },
          { id: "5", mesurement: "Unité", weight: "1" },
          { id: "6", mesurement: "lb", weight: "1" },
        ],
        { ignoreDuplicates: true }
      )
      .then(() => console.log("Mesurements inserted."));

    // insert category task
    db.categorytasks
      .bulkCreate(
        [
          { id: "1", category: "Quotidienne", occurence: "1" },
          { id: "2", category: "Hebdomadaire", occurence: "7" },
          { id: "3", category: "Autre", occurence: "0" },
          { id: "4", category: "Annonces", occurence: "0" },
        ],
        { ignoreDuplicates: true }
      )
      .then(() => console.log("Task categories inserted."));

    // insert category recipe
    db.categoryrecipes
      .bulkCreate(
        [
          { id: "1", category: "Boulangerie" },
          { id: "2", category: "Pâtisserie" },
          { id: "3", category: "Viennoiserie" },
          { id: "4", category: "Cuisine" },
        ],
        { ignoreDuplicates: true }
      )
      .then(() => console.log("Recipe categories inserted."));

    // insert dev user
    db.accounts
      .bulkCreate(
        [
          {
            id: "1",
            accName: "dev",
            accPassword: devPassword,
            roleId: 4,
            stateId: 2,
          },
        ],
        { ignoreDuplicates: true }
      )
      .then(() => console.log('"dev" user inserted.'));
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Partie backend de l'application." });
});

// routes
require("./app/routes/account.routes")(app);            // utilisateurs
require("./app/routes/announcement.routes")(app);       // annonces
require("./app/routes/categories.routes")(app);         // catégories et autres tables de "typage"
require("./app/routes/product.routes")(app);            // produits
require("./app/routes/recipe.routes")(app);             // recettes
require("./app/routes/rel_productrecipe.routes")(app);  // table relationnelle recette/produit
require("./app/routes/task.routes")(app);               // tâches
require("./app/routes/vendor.routes")(app);             // fournisseurs
require("./app/routes/verify.routes")(app);             // vérification de login
require("./app/routes/taskHistory.routes")(app);        // historique des tâches

// set port, listen for requests
const PORT = process.env.NODE_DOCKER_PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

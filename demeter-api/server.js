const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

var corsOptions = {
  origin: process.env.CLIENT_ORIGIN || "http://localhost:8081"
};

// express setup
app.use(cors(corsOptions));                       // use CORS options
app.use(express.json());                          // parse application/json
app.use(express.urlencoded({ extended: true }));  // parse application/x-www-form-urlencoded

// initilizes the database
const db = require("./app/models");
db.sequelize.sync()                 // {force: true} drops the db
  .then(() => {
    console.log("Synced db.");

    // insert roles
    db.roles.bulkCreate([
      { id: "1", role: "Administrateur" },
      { id: "2", role: "Employé" },
      { id: "3", role: "Livreur" },
      { id: "4", role: "Developpeur" }
    ], { ignoreDuplicates: true })
      .then(() => console.log("Roles inserted."));

    // insert states
    db.states.bulkCreate([
      { id: "1", state: "Inactif" },
      { id: "2", state: "Actif" },
      { id: "3", state: "Banni" }
    ], { ignoreDuplicates: true })
      .then(() => console.log("States inserted."));

    // insert category product
    db.categoryproducts.bulkCreate([
      { id: "1", category: "Périssable" },
      { id: "2", category: "Non-périssable" }
    ], { ignoreDuplicates: true })
      .then(() => console.log("Category products inserted."));

    // insert mesurements
    db.mesurements.bulkCreate([
      { id: "1", mesurement: "g", weight: "1" },
      { id: "2", mesurement: "kg", weight: "1000" },
      { id: "3", mesurement: "mL", weight: "1" },
      { id: "4", mesurement: "L", weight: "1000" },
    ], { ignoreDuplicates: true })
      .then(() => console.log("Mesurements inserted."));

    // insert dev user
    db.accounts.create({
      id: "1", 
      accName: "dev", 
      accPassword: "$2a$10$vytbqrffFfu5EKGP657yEu6soYC3diLemoILZLXtsJaSqHRB64YIy", 
      roleId: 4,
      stateId: 2
    }, { ignore: true });
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Partie backend de l'application." });
});

// routes
require("./app/routes/account.routes")(app);
require("./app/routes/verify.routes")(app);
require("./app/routes/teamleadpwd.routes")(app);
require("./app/routes/product.routes")(app);
require("./app/routes/vendor.routes")(app);

// set port, listen for requests
const PORT = process.env.NODE_DOCKER_PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

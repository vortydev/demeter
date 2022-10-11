const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

var corsOptions = {
  origin: process.env.CLIENT_ORIGIN || "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// load database
const db = require("./app/models");
db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");

    db.roles.bulkCreate([
      {id: "1", role: "Administrateur"},
      {id: "2", role: "Employé"},
      {id: "3", role: "Livreur"}
    ], {ignoreDuplicates: true})
    .then(() => console.log("Roles inserted."));

    db.states.bulkCreate([
      {id: "1", state: "Inactif"},
      {id: "2", state: "Actif"},
      {id: "3", state: "Banni"}
    ], {ignoreDuplicates: true})
    .then(() => console.log("States inserted."));
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

// drop existing tables and resync
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Partie backend de l'application." });
});

// routes
// require("./app/routes/tutorial.routes")(app);
require("./app/routes/account.routes")(app);
require("./app/routes/teamleadpwd.routes.js")(app);

// set port, listen for requests
const PORT = process.env.NODE_DOCKER_PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

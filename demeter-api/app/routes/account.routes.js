module.exports = app => {
  const accounts = require("../controllers/account.controller.js");

  var router = require("express").Router();

  // Create a new Account
  router.post("/", accounts.create);

  // Retrieve all Accounts
  router.get("/", accounts.findAll);

  // Retrieve a single Account with id
  router.get("/:id", accounts.findOne);

  // Update an Account with id
  router.put("/:id", accounts.update);

  // Delete an Account with id
  router.delete("/:id", accounts.delete);

  // Delete all Accounts
  router.delete("/", accounts.deleteAll);

  // roles
  router.get("/roles", accounts.findAllRoles);
  router.get("/roles/:id", accounts.findOneRole);

  // states
  router.get("/states", accounts.findAllStates);
  router.get("/states/:id", accounts.findOneState);

  app.use('/api/accounts', router);
};
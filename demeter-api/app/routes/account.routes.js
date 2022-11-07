module.exports = app => {
  const accounts = require("../controllers/account.controller");

  var router = require("express").Router();

  // Create a new Account
  router.post("/", accounts.create);

  // Retrieve all Accounts
  router.get("/", accounts.findAll);

  // Retrieve a single Account with id
  router.get("/:id", accounts.findOne);

  // Update an Account with name
  router.put("/:user", accounts.update);

  // Delete an Account with name
  router.delete("/:user", accounts.delete);

  // Delete all Accounts
  router.delete("/", accounts.deleteAll);

  app.use('/api/accounts', router);
};
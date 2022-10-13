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

  // Delete an Account with id
  router.delete("/:id", accounts.delete);

  // Delete all Accounts
  router.delete("/", accounts.deleteAll);

  // router.get("/verify", accounts.verify);

  app.use('/api/accounts', router);
};
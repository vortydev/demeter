module.exports = app => {
    const teamleadpwds = require("../controllers/teamleadpwd.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Account
    router.post("/", teamleadpwds.create);
  
    // Retrieve all Accounts
    router.get("/", teamleadpwds.findAll);
  
    // Retrieve a single Account with id
    router.get("/:id", teamleadpwds.findOne);
  
    // Update an Account with id
    router.put("/:id", teamleadpwds.update);
  
    // Delete an Account with id
    router.delete("/:id", teamleadpwds.delete);
  
    // Delete all Accounts
    router.delete("/", teamleadpwds.deleteAll);
  
    app.use('/api/teamleadpwd', router);
  };
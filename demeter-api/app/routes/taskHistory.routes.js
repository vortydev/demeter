module.exports = app => {
    const th = require("../controllers/taskHistory.controller");
  
    var router = require("express").Router();
  
    // Create a new History
    router.post("/", th.create);
  
    // Retrieve all Accounts
    router.get("/", th.findAll);
  
    // Retrieve a single Account with id
    router.get("/:id", th.findOne);
  
    // Update an Account with name
    router.put("/:id", th.update);
  
    // Delete an Account with name
    router.delete("/:id", th.delete);
  
    // Delete all Accounts
    router.delete("/", th.deleteAll);
  
    app.use('/api/th', router);
  };
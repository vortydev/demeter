module.exports = app => {
    const vendors = require("../controllers/vendor.controller");
  
    var router = require("express").Router();
  
    router.post("/", vendors.create);
    router.get("/", vendors.findAll);
    router.get("/:id", vendors.findOne);
    router.put("/:id", vendors.update);
    router.delete("/:id", vendors.delete);
    router.delete("/", vendors.deleteAll);
  
    app.use('/api/vendors', router);
};
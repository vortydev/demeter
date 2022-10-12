module.exports = app => {
    const accounts = require("../controllers/account.controller.js");
    var router = require("express").Router();
    router.get("/", accounts.verify);
    router.get("/:user", accounts.findByName);
    app.use('/api/verify', router);
}

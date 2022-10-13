module.exports = app => {
    const accounts = require("../controllers/account.controller");
    
    var router = require("express").Router();

    router.get("/:user", accounts.findByName);

    app.use('/api/verify', router);
}

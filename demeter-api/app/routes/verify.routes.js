module.exports = app => {
    const accounts = require("../controllers/account.controller.js");
    var router = require("express").Router();
    router.get("/", accounts.verify);
    app.use('/api/verify', router);
}

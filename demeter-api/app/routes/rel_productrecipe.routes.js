module.exports = app => {
    const recipes = require("../controllers/recipe.controller");

    var router = require("express").Router();

    router.post("/", recipes.createRPR);
    router.get("/", recipes.findAllRPR);
    router.put("/", recipes.updateRPR);
    router.delete("/", recipes.deleteRPR);

    app.use('/api/rpr', router);
};

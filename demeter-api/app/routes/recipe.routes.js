module.exports = app => {
    const recipes = require("../controllers/recipe.controller");

    var router = require("express").Router();

    router.post("/", recipes.create);
    router.get("/", recipes.findAll);
    router.get("/:id", recipes.findOne);
    router.put("/:id", recipes.update);
    router.delete("/:id", recipes.delete);
    router.delete("/", recipes.deleteAll);

    app.use('/api/recipes', router);
};

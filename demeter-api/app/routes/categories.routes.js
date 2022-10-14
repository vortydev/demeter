module.exports = app => {
    const accounts = require("../controllers/account.controller");
    const products = require("../controllers/product.controller");
    const tasks = require ("../controllers/task.controller");

    var router = require("express").Router();

    // roles
    router.get("/roles", accounts.findAllRoles);
    router.get("/roles/:id", accounts.findOneRole);

    // states
    router.get("/states", accounts.findAllStates);
    router.get("/states/:id", accounts.findOneState);

    // category product
    router.get("/products", products.findAllCategoryProduct);
    router.get("/products/:id", products.findOneCategoryProduct);

    // mesurements
    router.get("/mesurements", products.findAllMesurements);
    router.get("/mesurements/:id", products.findOneMesurement);

    // category task
    router.get("/tasks", tasks.findAllCategoryTask);
    router.get("/tasks/:id", tasks.findOneCategoryTask);

    app.use('/api/categories', router); // la racine des routes
}

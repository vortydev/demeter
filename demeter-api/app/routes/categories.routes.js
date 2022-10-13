module.exports = app => {
    const accounts = require("../controllers/account.controller");
    const products = require("../controllers/product.controller");

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

    app.use('/api/categories', router); // la racine des routes
}

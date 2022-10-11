module.exports = app => {
  const products = require("../controllers/product.controller.js");

  var router = require("express").Router();

  // Create a new Account
  router.post("/", products.create);

  // Retrieve all Accounts
  router.get("/", products.findAll);

  // Retrieve a single Account with id
  router.get("/:id", products.findOne);

  // Update an Account with id
  router.put("/:id", products.update);

  // Delete an Account with id
  router.delete("/:id", products.delete);

  // Delete all Accounts
  router.delete("/", products.deleteAll);

  // category product
  router.get("/category", products.findAllCategoryProduct);
  router.get("/category/:id", products.findOneCategoryProduct);

  // mesurements
  router.get("/mesurements", products.findAllMesurements);
  router.get("/mesurements/:id", products.findOneMesurement);

  app.use('/api/products', router);
};
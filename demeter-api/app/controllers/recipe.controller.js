const db = require("../models");
const Recipe = db.recipes;
const CategoryRecipe = db.categoryrecipes;
const Rel_ProductRecipe = db.rel_productrecipe;
const Op = db.Sequelize.Op;

// Create and Save a new Recipe
exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Recipe
    const recipe = {
        title: req.body.recipe,
        categoryrecipeId: req.body.categoryrecipeId,
        available: req.body.completed | true,
        instruction: req.body.instruction,
        nbUnitCreated:req.body.nbUnitCreated,
        otherCost: req.body.otherCost,
    };

    // Save Recipe in the database
    Recipe.create(recipe)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Recipe."
            });
        });
};

// Retrieve all Recipes from the database.
exports.findAll = (req, res) => {
    const category = req.query.categoryrecipeId;
    var condition = category ? { categoryrecipeId: { [Op.like]: `%${category}%` } } : null;

    Recipe.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving recipes."
            });
        });
};

// Find a single Recipe with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Recipe.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Recipe with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Recipe with id=" + id
            });
        });
};

// Update a Recipe by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Recipe.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Recipe was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Recipe with id=${id}. Maybe Recipe was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Recipe with id=" + id
            });
        });
};

// Delete a Recipe with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Recipe.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Recipe was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Recipe with id=${id}. Maybe Recipe was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Recipe with id=" + id
            });
        });
};

// Delete all Recipes from the database.
exports.deleteAll = (req, res) => {
    Recipe.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Recipe were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all vendors."
            });
        });
};

// category recipe
exports.findOneCategoryRecipe = (req, res) => {
    const id = req.params.id;

    CategoryRecipe.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find recipe category with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving recipe category with id=" + id
            });
        });
};

exports.findAllCategoryRecipe = (req, res) => {
    const categoryrecipe = req.query.category;
    var condition = categoryrecipe ? { category: { [Op.like]: `%${categoryrecipe}%` } } : null;

    CategoryRecipe.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Mesurement."
            });
        });
};

// rel_productrecipe
exports.createRPR = (req, res) => {
    // Validate request
    if (!req.body.recipeId) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Recipe
    const rpr = {
        recipeId: req.body.recipeId,
        productId: req.body.productId,
        qty: req.body.qty,
        mesurementId: req.body.mesurementId
    };

    Rel_ProductRecipe.create(rpr)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Rel_ProductRecipe."
            });
        });
};

exports.findAllRPR = (req, res) => {
    const recipe = req.query.recipeId;
    const product = req.query.productId;
    var conditionR = recipe ? { recipeId: { [Op.like]: `%${recipe}%` } } : null;
    var conditionP = product ? { productId: { [Op.like]: `%${product}%` } } : null;

    Rel_ProductRecipe.findAll({ where: { conditionR, conditionP } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Rel_ProductRecipe."
            });
        });
};

exports.updateRPR = (req, res) => {
    const recipe = req.query.recipeId;
    const product = req.query.productId;
    var conditionR = recipe ? { recipeId: { [Op.like]: `%${recipe}%` }, } : null;
    var conditionP = product ? { productId: { [Op.like]: `%${product}%` }, } : null;

    Rel_ProductRecipe.update(req.body, {
        where: { conditionR, conditionP }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Rel_ProductRecipe was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Rel_ProductRecipe with recipeId=${recipe}. Maybe Rel_ProductRecipe was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Rel_ProductRecipe with recipeId=" + recipe
            });
        });
};

exports.deleteRPR = (req, res) => {
    const recipe = req.query.recipeId;
    const product = req.query.productId;
    var conditionR = recipe ? { recipeId: { [Op.like]: `%${recipe}%` }, } : null;
    var conditionP = product ? { productId: { [Op.like]: `%${product}%` }, } : null;

    Rel_ProductRecipe.destroy({
        where: { conditionR, conditionP }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Rel_ProductRecipe was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Recipe with id=${id}. Maybe Rel_ProductRecipe was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Rel_ProductRecipe with id=" + id
            });
        });
};

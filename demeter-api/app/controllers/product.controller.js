const db = require("../models");
const Product = db.products;
const CategoryProduct = db.categoryproducts;
const Mesurement = db.mesurements;
const Op = db.Sequelize.Op;

// Create and Save a new account
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
        res.status(400).send({ 
            message: "Content can not be empty!" 
        });
        return;
    }

    // Create an account
    const product = {
        name: req.body.name,
        categoryproductId: req.body.categoryproductId,
        vendorId: req.body.vendorId,
        price: req.body.price,
        qtyInv: req.body.qtyInv,
        qtyUnit: req.body.qtyUnit,
        mesurementId: req.body.mesurementId,
        format: req.body.format
    };

    // Save account in the database
    Product.create(product)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Account."
        });
    });
};

// Retrieve all Accounts from the database.
exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;
  
    Product.findAll({ where: condition })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving products."
        });
    });
};

// Find a single Account with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Product.findByPk(id)
    .then(data => {
        if (data) {
            res.send(data);
        } else {
            res.status(404).send({
                message: `Cannot find Product with id=${id}.`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error retrieving Product with id=" + id
        });
    });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Product.update(req.body, {
        where: { id: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Product was updated successfully."
            });
        } else {
            res.send({
                message: `Cannot update Product with id=${id}. Maybe Product was not found or req.body is empty!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error updating Product with id=" + id
        });
    });
};

// Delete an Account with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Product.destroy({
        where: { id: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Product was deleted successfully!"
            });
        } else {
            res.send({
                message: `Cannot delete Product with id=${id}. Maybe Product was not found!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Could not delete Product with id=" + id
        });
    });
};

// Delete all Accounts from the database.
exports.deleteAll = (req, res) => {
    Product.destroy({
        where: {},
        truncate: false
    })
    .then(nums => {
        res.send({ message: `${nums} Product were deleted successfully!` });
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while removing all products."
        });
    });
};

// category product
exports.findOneCategoryProduct = (req, res) => {
    const id = req.params.id;

    CategoryProduct.findByPk(id)
    .then(data => {
        if (data) {
            res.send(data);
        } else {
            res.status(404).send({
                message: `Cannot find CategoryProduct with id=${id}.`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error retrieving Role with id=" + id
        });
    });
};

exports.findAllCategoryProduct = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;
  
    CategoryProduct.findAll({ where: condition })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving category product."
        });
    });
};

// mesurement
const db = require("../models");
const Vendor = db.vendors;
const Op = db.Sequelize.Op;

// Create and Save a new Vendor
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
        res.status(400).send({ 
            message: "Content can not be empty!" 
        });
        return;
    }

    // Create a Vendor
    const vendor = {
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        address: req.body.address
    };

    // Save Vendor in the database
    Vendor.create(vendor)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Vendor."
        });
    });
};

// Retrieve all Vendors from the database.
exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;
  
    Vendor.findAll({ where: condition })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving vendors."
        });
    });
};

// Find a single Vendor with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Vendor.findByPk(id)
    .then(data => {
        if (data) {
            res.send(data);
        } else {
            res.status(404).send({
                message: `Cannot find Vendor with id=${id}.`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error retrieving Vendor with id=" + id
        });
    });
};

// Update a Vendor by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Vendor.update(req.body, {
        where: { id: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Vendor was updated successfully."
            });
        } else {
            res.send({
                message: `Cannot update Vendor with id=${id}. Maybe Vendor was not found or req.body is empty!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error updating Vendor with id=" + id
        });
    });
};

// Delete a Vendor with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Vendor.destroy({
        where: { id: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Vendor was deleted successfully!"
            });
        } else {
            res.send({
                message: `Cannot delete Vendor with id=${id}. Maybe Vendor was not found!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Could not delete Vendor with id=" + id
        });
    });
};

// Delete all Vendors from the database.
exports.deleteAll = (req, res) => {
    Vendor.destroy({
        where: {},
        truncate: false
    })
    .then(nums => {
        res.send({ message: `${nums} Vendor were deleted successfully!` });
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while removing all vendors."
        });
    });
};

const db = require("../models");
const TeamLeadPwd = db.teamleadpwds;
const Op = db.Sequelize.Op;

// Create and Save a new account
exports.create = (req, res) => {
    // Validate request
    if (!req.body.pwdName) {
        res.status(400).send({ 
            message: "Content can not be empty!" 
        });
        return;
    }

    // Create a TeamLeadPassword
    const pwd = {
        pwdName: req.body.pwdName,
        pwdPassword: req.body.pwdPassword
    };

    // Save password in the database
    TeamLeadPwd.create(pwd)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Password."
        });
    });
};

// Retrieve all Accounts from the database.
exports.findAll = (req, res) => {
    const pwdName = req.query.pwdName;
    var condition = pwdName ? { pwdName: { [Op.like]: `%${pwdName}%` } } : null;
  
    TeamLeadPwd.findAll({ where: condition })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving passwords."
        });
    });
};

// Find a single Password with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    TeamLeadPwd.findByPk(id)
    .then(data => {
        if (data) {
            res.send(data);
        } else {
            res.status(404).send({
                message: `Cannot find Password with id=${id}.`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error retrieving Password with id=" + id
        });
    });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    TeamLeadPwd.update(req.body, {
        where: { id: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Password was updated successfully."
            });
        } else {
            res.send({
                message: `Cannot update Password with id=${id}. Maybe Password was not found or req.body is empty!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error updating Password with id=" + id
        });
    });
};

// Delete an Account with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    TeamLeadPwd.destroy({
        where: { id: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Password was deleted successfully!"
            });
        } else {
            res.send({
                message: `Cannot delete Password with id=${id}. Maybe Password was not found!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Could not delete Password with id=" + id
        });
    });
};

// Delete all Accounts from the database.
exports.deleteAll = (req, res) => {
    TeamLeadPwd.destroy({
        where: {},
        truncate: false
    })
    .then(nums => {
        res.send({ message: `${nums} Passwords were deleted successfully!` });
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while removing all passwords."
        });
    });
};

const db = require("../models");
const Account = db.accounts;
const Role = db.roles;
const State = db.states;
const Op = db.Sequelize.Op;

// Create and Save a new account
exports.create = async (req, res) => {
    // Validate request
    if (!req.body.accName) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create an account
    const hashedPwd = await hashPwd(req.body.accPassword);
    const account = {
        accName: req.body.accName,
        accPassword: req.body.accPassword,
        roleId: req.body.roleId,
        stateId: req.body.stateId
    };

    // Save account in the database
    Account.create(account)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Account."
            });
        });
};

// Retrieve all Accounts from the database.
exports.findAll = (req, res) => {
    const accName = req.query.accName;
    var condition = accName ? { accName: { [Op.like]: `%${accName}%` } } : null;

    Account.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving accounts."
            });
        });
};

// Find a single Account with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Account.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Account with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Account with id=" + id
            });
        });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Account.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Account was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Account with id=${id}. Maybe Account was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Account with id=" + id
            });
        });
};

// Delete an Account with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Account.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Account was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Account with id=${id}. Maybe Account was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Account with id=" + id
            });
        });
};

// Delete all Accounts from the database.
exports.deleteAll = (req, res) => {
    Account.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Account were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all accounts."
            });
        });
};

exports.findAllRoles = (req, res) => {
    const role = req.query.role;
    var condition = role ? { role: { [Op.like]: `%${role}%` } } : null;

    Role.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving roles."
            });
        });
};

// Find a single Account with an id
exports.findOneRole = (req, res) => {
    const id = req.params.id;

    Role.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Role with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Role with id=" + id
            });
        });
};

exports.findAllStates = (req, res) => {
    const state = req.query.state;
    var condition = state ? { state: { [Op.like]: `%${state}%` } } : null;

    State.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving states."
            });
        });
};

exports.findOneState = (req, res) => {
    const id = req.params.id;

    State.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find State with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving State with id=" + id
            });
        });
};

const bcrypt = db.bcrypt;
async function comparePwd(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
}

async function hashPwd(password) {
    const salt = await bcrypt.genSalt(6);
    const hashed = await bcrypt.hash(password, salt);
    return hashed;
}

exports.verify = (req, res) => {
    console.log("REQUETE IN VERIFY", req.body);
    const accName = req.body.accName;
    var condition = accName ? { accName: { [Op.like]: `%${accName}%` } } : null;

    Account.findAll({ where: condition })
        .then(async data => {
            console.log(req.body.accPwd, data.accPassword);
            const valid = await comparePwd(req.body.accPwd, data.accPassword);
            if (valid) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Account with name=${accName}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Account with name=" + accName
            });
        });
};

exports.findByName = (req, res) => {
    const user = req.query.user;
    var condition = user ? { accName: { [Op.like]: `%${user}%` } } : null;

    Account.findAll({ where: condition })
        .then(data => {
            res.send(data[0]);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving accounts."
            });
        });
};
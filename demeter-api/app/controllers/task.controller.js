const db = require("../models");
const Task = db.tasks;
const CategoryTask = db.categorytasks;
const Op = db.Sequelize.Op;

// Create and Save a new Task
exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Task
    const task = {
        title: req.body.title,
        categorytaskId: req.body.categorytaskId,
        parentId: req.body.parentId | null,
        description: req.body.description,
        completed: req.body.completed | false,
        responsable: req.body.responsable | null
    };

    // Save Task in the database
    Task.create(task)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Task."
            });
        });
};

// Retrieve all Tasks from the database.
exports.findAll = (req, res) => {
    const category = req.query.categorytaskId;
    //const parent = req.query.parentId;
    var conditionC = category ? { categorytaskId: { [Op.eq]: category} } : null;
    //var conditionP = parent ? { parentId: { [Op.like]: `%${parent}%` } } : null;

    Task.findAll({ where: conditionC })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving announcements."
            });
        });
};

// Find a single Task with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Task.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Task with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Task with id=" + id
            });
        });
};

// Update a Task by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Task.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Task was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Task with id=${id}. Maybe Task was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Task with id=" + id
            });
        });
};

// Delete a Task with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    console.log("controller",id);
    Task.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Task was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Task with id=${id}. Maybe Task was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Task with id=" + id
            });
        });
};

// Delete all Vendors from the database.
exports.deleteAll = (req, res) => {
    Task.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Task were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all tasks."
            });
        });
};

// category task
exports.findOneCategoryTask = (req, res) => {
    const id = req.params.id;

    CategoryTask.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find task category with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving task category with id=" + id
            });
        });
};

exports.findAllCategoryTask = (req, res) => {
    const categorytask = req.query.category;
    var condition = categorytask ? { category: { [Op.like]: `%${categorytask}%` } } : null;

    CategoryTask.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving task categories."
            });
        });
};

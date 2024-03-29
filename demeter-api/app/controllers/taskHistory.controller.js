const db = require("../models");
const TH = db.taskHistory;
const Op = db.Sequelize.Op;

// Create and Save a new Task
exports.create = (req, res) => {
  // Validate request
  if (!req.body.taskName) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a TaskHistory
  const taskHistory = {
      completionDate: req.body.completionDate,
      taskName: req.body.taskName,
      whoDid: req.body.whoDid,
      parentId: req.body.parentId,
      categorytaskId: req.body.categorytaskId,
      receiver: req.body.receiver,
      ogTaskId: req.body.ogTaskId,
      whenToDo: req.body.whenToDo,
  };

  // Save Task in the database
  TH.create(taskHistory)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Task.",
      });
    });
};

// Retrieve all Tasks from the database.
exports.findAll = (req, res) => {
    const week = req.query.week;
    const today = req.query.today;
    const category = req.query.categorytaskId;
    const receiver = req.query.receiver;

    var conditionW = week
      ? { completionDate: { [Op.gte]: `%${week}%` } }
      : null;
    var conditionT = today
      ? { completionDate: { [Op.eq]: `%${today}%` } }
      : null;
    var conditionC = category
      ? { categorytaskId: { [Op.eq]: category } }
      : null;
    var conditionR = receiver
      ? { receiver: { [Op.eq]: receiver } }
      : null;

  if (conditionW !== null) {
    TH.findAll({conditionW})
      .then((data) => {
  
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message ||
            "Some error occurred while retrieving announcements.",
        });
      });
    }

    if (conditionT!== null) {
      TH.findAll({ where: {[Op.and]: [conditionT, conditionC, conditionR]} })
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message ||
            "Some error occurred while retrieving announcements.",
        });
      });
    }
};

// Find a single Task with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  TH.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Task with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Task with id=" + id,
      });
    });
};

// Update a Task by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  TH.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Task was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Task with id=${id}. Maybe Task was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Task with id=" + id,
      });
    });
};

// Delete a Task with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  TH.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Task was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Task with id=${id}. Maybe Task was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Task with id=" + id,
      });
    });
};

// Delete all Vendors from the database.
exports.deleteAll = (req, res) => {
  TH.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Task were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all tasks.",
      });
    });
};


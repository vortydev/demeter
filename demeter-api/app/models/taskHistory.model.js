module.exports = (sequelize, Sequelize) => {
    const TaskHistory = sequelize.define("taskhistory", {
      completionDate: {
        type: Sequelize.DATE
      },
      taskName: {
        type: Sequelize.STRING
      },
      whoDid: {
        type: Sequelize.STRING
      },
      parentId: {
        type: Sequelize.INTEGER
      },
      categorytaskId: {
        type: Sequelize.INTEGER
      },
      receiver: {
        type: Sequelize.STRING
      },
      ogTaskId: {
        type: Sequelize.INTEGER
      },
      whenToDo: {
        type: Sequelize.STRING
      },
    });
  
    return TaskHistory;
  };
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
      }
    });
  
    return TaskHistory;
  };
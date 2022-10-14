module.exports = (sequelize, Sequelize) => {
    const Task = sequelize.define("task", {
        name: { type: Sequelize.STRING },
        completed: { type: Sequelize.BOOLEAN },
        responsable: { type: Sequelize.STRING }
    });
    
    return Task;
  };
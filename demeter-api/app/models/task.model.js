module.exports = (sequelize, Sequelize) => {
    const Task = sequelize.define("task", {
        name: { type: Sequelize.STRING },
        description: { type: Sequelize.TEXT },
        completed: { type: Sequelize.BOOLEAN },
        responsable: { type: Sequelize.STRING }
    });
    
    return Task;
  };
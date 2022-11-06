module.exports = (sequelize, Sequelize) => {
    const Task = sequelize.define("task", {
        title: { type: Sequelize.TEXT },
        description: { type: Sequelize.TEXT },
        completed: { type: Sequelize.BOOLEAN },
        responsable: { type: Sequelize.STRING }, 
        parentId: { type: Sequelize.INTEGER }
    });
    
    return Task;
  };
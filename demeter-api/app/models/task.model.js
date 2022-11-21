module.exports = (sequelize, Sequelize) => {
    const Task = sequelize.define("task", {
        title: { type: Sequelize.TEXT },
        description: { type: Sequelize.TEXT },
        completed: { type: Sequelize.BOOLEAN },
        active: { type: Sequelize.BOOLEAN },
        responsable: { type: Sequelize.STRING }, 
        taskMaster: { type: Sequelize.STRING }, 
        parentId: { type: Sequelize.INTEGER },
        priority : {type: Sequelize.BOOLEAN},
        receiver: { type: Sequelize.STRING },
        whenToDo: { type: Sequelize.STRING }, 
    });
    
    return Task;
  };
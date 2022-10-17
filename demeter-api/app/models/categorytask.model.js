module.exports = (sequelize, Sequelize) => {
    const CategoryTask = sequelize.define("categorytask", {
        category: { type: Sequelize.STRING },
        occurence: { type: Sequelize.INTEGER }
    });
  
    return CategoryTask;
  };
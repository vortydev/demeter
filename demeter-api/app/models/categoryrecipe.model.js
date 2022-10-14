module.exports = (sequelize, Sequelize) => {
    const CategoryRecipe = sequelize.define("categoryrecipe", {
        category: { type: Sequelize.STRING }
    });
  
    return CategoryRecipe;
  };
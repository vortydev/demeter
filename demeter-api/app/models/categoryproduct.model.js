module.exports = (sequelize, Sequelize) => {
    const CategoryProduct = sequelize.define("categoryproduct", {
        category: { type: Sequelize.STRING }
    });
  
    return CategoryProduct;
  };
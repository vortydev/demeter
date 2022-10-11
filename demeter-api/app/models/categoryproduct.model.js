module.exports = (sequelize, Sequelize) => {
    const CategoryProduct = sequelize.define("categoryproduct", {
        name: { type: Sequelize.STRING }
    });
  
    return CategoryProduct;
  };
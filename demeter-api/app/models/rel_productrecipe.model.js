module.exports = (sequelize, Sequelize) => {
    const ProductRecipe = sequelize.define("rel_productrecipe", {
        qty: { type: Sequelize.FLOAT }
    });

    return ProductRecipe;
};
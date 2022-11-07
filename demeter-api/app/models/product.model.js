module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define("product", {
        name: { type: Sequelize.STRING },
        price: { type: Sequelize.DECIMAL(11, 2) },
        qtyInv: { type: Sequelize.INTEGER },
        qtyUnit: { type: Sequelize.FLOAT },
        format: { type: Sequelize.TEXT }
    });

    return Product;
};
module.exports = (sequelize, Sequelize) => {
    const Recipe = sequelize.define("recipe", {
        title: { type: Sequelize.STRING },
        available: { type: Sequelize.BOOLEAN },
        instruction: { type: Sequelize.TEXT },
        nbUnitCreated: { type: Sequelize.INTEGER },
        otherCost: { type: Sequelize.DECIMAL(15, 2) }
    });

    return Recipe;
};
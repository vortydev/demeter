module.exports = (sequelize, Sequelize) => {
    const Mesurement = sequelize.define("mesurement", {
        mesurement: { type: Sequelize.STRING },
        weight: { type: Sequelize.INTEGER }
    });
  
    return Mesurement;
  };
module.exports = (sequelize, Sequelize) => {
    const Role = sequelize.define("role", {
      role: {
        type: Sequelize.STRING
      }
    });
  
    return Role;
  };
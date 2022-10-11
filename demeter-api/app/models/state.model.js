module.exports = (sequelize, Sequelize) => {
    const State = sequelize.define("state", {
      state: {
        type: Sequelize.STRING
      }
    });
  
    return State;
  };
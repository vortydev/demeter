module.exports = (sequelize, Sequelize) => {
    const State = sequelize.define("state", {
      state: {
        type: Sequelize.STRING
      }
    });

    Role.bulkCreate([
      {role: "Inactif"},
      {role: "Actif"},
      {role: "Banni"}
    ], {ignoreDuplicates: true}).then(() => console.log("States inserted."));
  
    return State;
  };
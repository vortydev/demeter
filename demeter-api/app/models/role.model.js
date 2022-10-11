module.exports = (sequelize, Sequelize) => {
    const Role = sequelize.define("role", {
      role: {
        type: Sequelize.STRING
      }
    });

    Role.bulkCreate([
      {role: "Administrateur"},
      {role: "Employé"},
      {role: "Livreur"}
    ], {ignoreDuplicates: true}).then(() => console.log("Roles inserted."));
  
    return Role;
  };
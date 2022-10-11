module.exports = (sequelize, Sequelize) => {
  const Account = sequelize.define("account", {
    accName: {
      type: Sequelize.STRING
    },
    accPassword: {
      type: Sequelize.STRING
    }
  });

  return Account;
};
module.exports = (sequelize, Sequelize) => {
    const TeamLeadPassword = sequelize.define("teamleadpwd", {
      pwdName: {
        type: Sequelize.STRING
      },
      pwdPassword: {
        type: Sequelize.STRING
      }
    });
  
    return TeamLeadPassword;
  };
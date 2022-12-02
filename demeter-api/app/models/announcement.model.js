module.exports = (sequelize, Sequelize) => {
  const Announcement = sequelize.define("announcement", {
    title: { type: Sequelize.STRING },
    description: { type: Sequelize.TEXT },
    active: { type: Sequelize.BOOLEAN },
    author: { type: Sequelize.STRING },
    taskId: { type: Sequelize.INTEGER },
    date: { type: Sequelize.DATE },
    priority : {type: Sequelize.BOOLEAN}
  });

  return Announcement;
};

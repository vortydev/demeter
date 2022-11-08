module.exports = (sequelize, Sequelize) => {
  const Announcement = sequelize.define("announcement", {
    title: { type: Sequelize.STRING },
    description: { type: Sequelize.TEXT },
    img: { type: Sequelize.STRING },
    active: { type: Sequelize.BOOLEAN },
    author: { type: Sequelize.STRING },
    taskId: { type: Sequelize.BIGINT },
    date: { type: Sequelize.DATE }
  });

  return Announcement;
};

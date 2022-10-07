module.exports = (sequelize, Sequelize) => {
    const Tutorial = sequelize.define("tutorial", {
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      published: {
        type: Sequelize.TINYINT
      }
    });
  
    return Tutorial;
};

// This Sequelize Model represents tutorials table in MySQL database. These columns will be generated automatically: id, title, description, published, createdAt, updatedAt.
// https://www.bezkoder.com/node-js-express-sequelize-mysql/
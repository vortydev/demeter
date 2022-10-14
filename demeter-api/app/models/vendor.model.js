module.exports = (sequelize, Sequelize) => {
    const Vendor = sequelize.define("vendor", {
        vendor: { type: Sequelize.STRING },
        phone: { type: Sequelize.STRING },
        email: { type: Sequelize.STRING },
        address: { type: Sequelize.STRING }
    });
  
    return Vendor;
  };
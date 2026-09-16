const sequelize = require("../config/dbConnect");
const Product = require("./product.model");



// Sync all models
sequelize.sync({ alter: true })
  .then(() => console.log("Database synced"))
  .catch(err => console.error(" Error syncing DB:", err));

module.exports = {Product};

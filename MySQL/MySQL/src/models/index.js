const sequelize = require("../config/dbConnect");
const Product = require("./product.model");
const User = require("./user.model");
const Post = require("./post.model");
const Test = require("./test");
const Comment=require('./comment.model')



// Sync all models
sequelize.sync()
  .then(() => console.log("Database synced"))
  .catch(err => console.error(" Error syncing DB:", err));

module.exports = {Product,User,Post,Test,Comment};

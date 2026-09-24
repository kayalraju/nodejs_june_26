// models/Post.js

const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConnect");

const Post = sequelize.define("post", {

  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  content: {
    type: DataTypes.TEXT,
  },

  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Post;
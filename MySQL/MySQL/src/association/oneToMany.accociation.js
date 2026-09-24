// models/associations.js

const User = require("../models/user.model");
const Post = require("../models/post.model");
const Comment = require("../models/comment.model");

// User → Posts
User.hasMany(Post, {
  foreignKey: "userId",
  as: "posts",
});

Post.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});





//********************************* */
// User → Comments
User.hasMany(Comment, {
  foreignKey: "userId",
  as: "comments",
});

Comment.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});

// Post → Comments
Post.hasMany(Comment, {
  foreignKey: "postId",
  as: "comments",
});

Comment.belongsTo(Post, {
  foreignKey: "postId",
  as: "post",
});

module.exports = {
  User,
  Post,
  Comment,
};

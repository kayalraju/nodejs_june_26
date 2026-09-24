const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConnect");

const Comment = sequelize.define("comment", {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    conmment: {
        type: DataTypes.TEXT,
        allowNull: false
    },

    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    postId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }

});

module.exports = Comment;
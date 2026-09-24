const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConnect");

const User = sequelize.define(
  "user",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    phone: {
      type: DataTypes.STRING(15),
      allowNull: false,
      unique: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "https://via.placeholder.com/150",
    },
    password: {
      type: DataTypes.STRING,
      defaultValue: "password",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = User;

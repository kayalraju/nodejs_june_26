require("dotenv").config();
const express = require("express");
const sequelize = require("./src/config/dbConnect");
require("./src/models/index"); // sync tables
const path = require("path");

const app = express();
app.use(express.json());
//app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// Routes

const productRoute=require('./src/router/Product.route')
app.use(productRoute)

const PORT = process.env.PORT;
sequelize.authenticate()
  .then(() => {
    console.log("Database connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error(" DB connection error:", err));

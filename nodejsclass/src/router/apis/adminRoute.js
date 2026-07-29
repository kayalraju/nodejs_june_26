const express = require("express");
const router = express.Router();
const Validation = require("../../validate/index");
const UserSchemaValidation = require("../../validate/userSchema");
const adminController = require("../../controller/Apis/AdminController");
const AuthMiddleware = require("../../middleware/authmiddleware");



router.post(
  "/login/create",
  Validation.validate(UserSchemaValidation.login),
  adminController.login,
);



router.get(
  "/dashboard",
  AuthMiddleware.verifyToken,
  adminController.dashboard,
);


module.exports = router;

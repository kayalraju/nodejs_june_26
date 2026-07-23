const express = require("express");
const router = express.Router();
const Validation = require("../../validate/index");
const UserSchemaValidation = require("../../validate/userSchema");
const authController = require("../../controller/Apis/authController");
const AuthMiddleware = require("../../middleware/authmiddleware");


router.post(
  "/signup",
  Validation.validate(UserSchemaValidation.signup),
  authController.signup,
);
router.post(
  "/login",
  Validation.validate(UserSchemaValidation.login),
  authController.login,
);

//router.use(AuthMiddleware.verifyToken);

router.get(
  "/dashboard",
  AuthMiddleware.verifyToken,
  authController.dashboard,
);


module.exports = router;

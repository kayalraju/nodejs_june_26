const User = require("../../models/user");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

class AdminController {
  async login(req, res) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({
          success: false,
          message: "User not found",
        });
      }
      const isMatch = await bcryptjs.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({
          success: false,
          message: "Invalid credentials",
        });
      }

      if (isMatch && user.role === "admin") {
        const token = await jwt.sign(
          {
            id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            role: user.role,
          },
          process.env.JWT_SECRET_KEY,
          { expiresIn: "1d" },
        );
        return res.status(200).json({
          success: true,
          message: "Login successful",
          data: {
            id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            role: user.role,
          },
          token: token,
        });
      } else {
        return res.status(400).json({
          success: false,
          message: "only admin can login",
        });
      }
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async dashboard(req, res) {
    try {
      return res.status(200).json({
        success: true,
        message: "welcome to admin dashboard",
        user: req.user,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
}

module.exports = new AdminController();

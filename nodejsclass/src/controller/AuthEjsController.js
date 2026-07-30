const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
class AuthEjsController {

      async CheckAuth(req, res, next) {
        try {
            if (req.user) {
                next()
            } else {
                res.redirect('/login');
            }
        } catch (err) {
            console.log(err)
        }
    }
  async register(req, res) {
    try {
      res.render("register", {
        title: "register page",
      });
    } catch (error) {
      console.log(error);
    }
  }
  async registercreate(req, res) {
    try {
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10)),
      });
      const result = await user.save();
      console.log("data", result);

      if (result) {
        console.log("register successfully");
        res.redirect("/login");
      } else {
        console.log("register failed");

        res.redirect("/register");
      }
    } catch (err) {
      console.log(err);
    }
  }
  async login(req, res) {
    try {
      res.render("login", {
        title: "login page",
      });
    } catch (error) {
      console.log(error);
    }
  }
  async loginCreate(req, res) {
    try {
      // Get user input
      const { email, password } = req.body;

      // Validate user input
      if (!(email && password)) {
        console.log("All input is required");
        res.redirect("/login");
      }
      // Validate if user exist in our database
      const user = await User.findOne({ email });

      if (user && (await bcrypt.compare(password, user.password))) {
        // Create token
        const tokendata = await jwt.sign(
          {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
          process.env.JWT_SECRET_KEY,
          {
            expiresIn: "2h",
          },
        );
        if (tokendata) {
          res.cookie("token", tokendata);
          res.redirect("/dashboard");
        } else {
          console.log("login failed");
        }
      }
      console.log("login failed");
      res.redirect("/login");
    } catch (err) {
      console.log(err);
    }
  }

  async dashboard(req, res) {
    try {
      return res.render("dashboard", {
        title: "dashboard page",
        user: req.user,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async logout(req, res) {
    try {
       res.clearCookie("token");
      return res.redirect("/login");
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new AuthEjsController();

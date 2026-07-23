const User = require("../../models/user");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

class AuthController {
  async signup(req, res) {
    try {
      const { name, email, phone, password } = req.body;
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: "User already exists",
        });
      }
      //password hashing
      const salt = 10;
      const hashedPassword = await bcryptjs.hash(password, salt);
      const data = new User({
        name: name,
        email: email,
        phone: phone,
        password: hashedPassword,
      });
      const result = await data.save();
      return res.status(201).json({
        success: true,
        message: "User created successfully",
        data: result,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async login(req, res) {
    try{

        const{email,password}=req.body

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

        const token= await jwt.sign({
            id:user._id,
            name:user.name,
            email:user.email,
            phone:user.phone,
            role:user.role
        },process.env.JWT_SECRET_KEY,{expiresIn:"1d"})

        return res.status(200).json({
          success: true,
          message: "Login successful",
          data:{
              id:user._id,
              name:user.name,
              email:user.email,
              phone:user.phone,
              role:user.role
          },
          token:token
        });

    }catch(error){
        return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async dashboard(req,res){
    try{
        return res.status(200).json({
        success: true,
        message:"welcome to dashboard",
        user:req.user
      });

    }catch(error){
        return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
}

module.exports = new AuthController();

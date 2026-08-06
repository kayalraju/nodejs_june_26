const User = require("../../models/user");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const verifyEmailOTP = require("../../utils/sendMail");
const Otp=require('../../models/otp')

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
      const user = await data.save();
      await verifyEmailOTP(req, user)
      return res.status(201).json({
        success: true,
        message: "User created successfully and email sent for verification",
        // data: user,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }



  async verify(req,res){
    try {
            const { email, otp } = req.body;
            // Check if all required fields are provided
            if (!email || !otp) {
                return res.status(400).json({ status: false, message: "All fields are required" });
            }
            const existingUser = await User.findOne({ email });

            // Check if email doesn't exists
            if (!existingUser) {
                return res.status(404).json({ status: "failed", message: "user doesn't exists" });
            }

            // Check if email is already verified
            if (existingUser.isVerified) {
                return res.status(400).json({ status: false, message: "Email is already verified" });
            }
            // Check if there is a matching email verification OTP
            const emailVerification = await Otp.findOne({ userId: existingUser._id, otp });
            if (!emailVerification) {
                if (!existingUser.isVerified) {
                    // console.log(existingUser);
                    await verifyEmailOTP(req, existingUser);
                    return res.status(400).json({ status: false, message: "Invalid OTP, new OTP sent to your email" });
                }
                return res.status(400).json({ status: false, message: "Invalid OTP" });
            }
            // Check if OTP is expired
            const currentTime = new Date();
            // 15 * 60 * 1000 calculates the expiration period in milliseconds(15 minutes).
            const expirationTime = new Date(emailVerification.createdAt.getTime() + 15 * 60 * 1000);
            if (currentTime > expirationTime) {
                // OTP expired, send new OTP
                await verifyEmailOTP(req, existingUser);
                return res.status(400).json({ status: "failed", message: "OTP expired, new OTP sent to your email" });
            }
            // OTP is valid and not expired, mark email as verified
            existingUser.isVerified = true;
            await existingUser.save();

            // Delete email verification document
            await Otp.deleteMany({ userId: existingUser._id });
            return res.status(200).json({ status: true, message: "Email verified successfully" });


        } catch (error) {
            console.error(error);
            res.status(500).json({ status: false, message: "Unable to verify email, please try again later" });
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

        if(!user.isVerified){
            return res.status(400).json({
                success: false,
                message: "Please verify your email",
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

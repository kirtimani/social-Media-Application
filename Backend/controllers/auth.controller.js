import sendMail from "../config/mail.js";
import genToken from "../config/token.js";
import User from "../models/User.Model.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  try {
    const { name, email, password, userName } = req.body;

    const findByEmail = await User.findOne({ email });
    if (findByEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const findByUserName = await User.findOne({ userName });
    if (findByUserName) {
      return res.status(400).json({ message: "Username already exists" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      userName,
      email,
      password: hashedPassword,
    });

    const token = await genToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 10 * 365 * 24 * 60 * 60 * 1000,
      secure: false,
      sameSite: "Strict",
    });

    return res.status(201).json(user);
  } catch (error) {
    return res.status(400).json({ message: `Signup error: ${error.message}` });
  }
};

export const signin = async (req, res) => {
  try {
    const { password, userName } = req.body;

    const user = await User.findOne({ userName });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password); // ✅ Added await
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password!" });
    }

    const token = await genToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 10 * 365 * 24 * 60 * 60 * 1000,
      secure: false,
      sameSite: "Strict",
    });

    return res.status(201).json(user);
  } catch (error) {
    return res.status(400).json({ message: `Signin error: ${error.message}` });
  }
};

export const signout = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ message: "Signout Successfully" });
  } catch (error) {
    return res.status(400).json({ message: `Signout error: ${error.message}` });
  }
};


const sendOTP = async(req, res) => {
  try {
    const {email} = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const otp = Math.floor(100000 + Math.random() * 900000).toString() // Generate a 6-digit OTP
    user.resetOtp = otp;
    user.otpExpires = new Date(Date.now() + 5 * 60 * 1000); // OTP valid for 5 minutes
    user.isotpVerified = false;

    await user.save();
    await sendMail(email, otp)
    return res.status(200).json({ message: "OTP sent to your email" });

  } catch (error) {
    return res.status(500).json({ message: `Error sending OTP: ${error.message}` });
  }
}
export default sendOTP;

export const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email});
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    if(!user || user.resetOtp != otp || user.otpExpires < Date.now()) {
      return res.status(400).json({ message: "Invalid OTP" });
    }
    user.isotpVerified = true;
    user.resetOtp = null; // Clear OTP after verification
    user.otpExpires = null; // Clear OTP expiration after verification
    await user.save();
    return res.status(200).json({ message: "OTP verified successfully" });
  } catch (error) {
    return res.status(500).json({ message: `Error verifying OTP: ${error.message}` });
  }
}

export const resetPassword = async (req, res) => {
  try {
    const { newPassword, email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    if (!user.isotpVerified) {
      return res.status(400).json({ message: "OTP not verified" });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.isotpVerified = false; // Reset OTP verification status

    await user.save();
    return res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    return res.status(500).json({ message: `Error resetting password: ${error.message}` });
  }
}
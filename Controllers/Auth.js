//Login, Signup and Logout controller
const User = require("../Models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const OTP = require("../Models/OTP");
const uploadImageToCloudinary = require("../Utils/ImageUploader");


require("dotenv").config();

// **********************  Signup  **********************
exports.signUp = async () => {
  try {
    // fetch data from request body
    const {
      name,
      phoneNumber,
      email,
      accountType,
      password,
      purpose,
      location,
      confirmPassword,
    } = req.body;
    // validation

    const { photo } = req.files || {};
    // check all feild present or not
    if (
      !name ||
      !phoneNumber ||
      !email ||
      !accountType ||
      !password ||
      !purpose ||
      !location ||
      !confirmPassword
    ) {
      return res.status(400).json({
        success: false,
        msg: "All fields are required",
      });
    }

    if (accountType === "Orphanage" && !photo) {
      return res.status(400).json({
        success: false,
        msg: "Please upload images for your organization",
      });
    }

    //match password and confirmPassword
    if (confirmPassword !== password) {
      return res.status(400).json({
        success: false,
        msg: "password and confirm password do not match",
      });
    }

    //check user is already present or not
    const checkUser = await User.findOne({ email });
    if (checkUser) {
      return res.status(400).json({
        success: false,
        msg: "User is already registered",
      });
    }

    // OTP Verification
    // Find the most recent OTP for the email
    const response = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
    console.log(response);
    if (response.length === 0) {
      // OTP not found for the email
      return res.status(400).json({
        success: false,
        message: "The OTP is not valid",
      });
    } else if (otp !== response[0].otp) {
      // Invalid OTP
      return res.status(400).json({
        success: false,
        message: "The OTP is not valid",
      });
    }

    //Hash password
    const hashPassword = await bcrypt.hash(password, 10);

    // Upload the Photo of the Organization to Cloudinary  
    const cloudinaryResponse = await uploadImageToCloudinary(
      photo,
      process.env.FOLDER_NAME
    );
    if (!cloudinaryResponse) {
      return res.status(500).json({
        success: false,
        message: "Failed to upload image",
      });
    }

    photoUrl = cloudinaryResponse.secure_url;

    //Create user entry in database
    const user = await User.create({
      name,
      phoneNumber,
      email,
      accountType,
      password: hashPassword,
      photo:photoUrl,
      purpose,
      location,
    });

    //return  successfull response
    return res.status(200).json({
      success: true,
      msg: "User registered successfully ",
      user,
    });
  } catch (error) {
    console.log("Error occuring while registering ", error);
    return res.status(500).json({
      success: false,
      msg: "User can't be register..pls try again",
    });
  }
};

//   ********* Login ***********

exports.login = async (req, res) => {
  try {
    //validation
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).josn({
        success: false,
        msg: "All fields are required",
      });
    }

    //check user exist or not
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).josn({
        success: false,
        msg: "user doesn't exist",
      });
    }

    // console.log("User data while logging ", user);
    //compare password

    if (await bcrypt.compare(password, user.password)) {
      const payload = {
        email: email,
        id: user._id,
        accountType: user.accountType,
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
        expiresIn: "2d",
      });
      user.token = token;
      user.password = undefined;

      //send token to browser  cookie
      const options = {
        expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };

      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        user,
        msg: "Logged in successfully ",
      });
    } else {
      return res.status(400).json({
        success: false,
        msg: "password is incorrect ",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: "Login failure..pls try again",
    });
  }
};

// Send OTP For Email Verification
exports.sendotp = async (req, res) => {
  try {
    const { email } = req.body;

    // Check if user is already present
    // Find user with provided email
    const checkUserPresent = await User.findOne({ email });
    // to be used in case of signup

    // If user found with provided email
    if (checkUserPresent) {
      // Return 401 Unauthorized status code with error message
      return res.status(401).json({
        success: false,
        message: `User is Already Registered`,
      });
    }

    var otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    const result = await OTP.findOne({ otp: otp });
    console.log("Result is Generate OTP Func");
    console.log("OTP", otp);
    console.log("Result", result);
    while (result) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
      });
    }
    const otpPayload = { email, otp };
    const otpBody = await OTP.create(otpPayload);
    console.log("OTP Body", otpBody);
    res.status(200).json({
      success: true,
      message: `OTP Sent Successfully`,
      otp,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ success: false, error: error.message });
  }
};


// **************** Logout ****************
exports.logout = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({
      success: true,
      msg: "Logout successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: "Logout failure..pls try again",
    });
  }
}
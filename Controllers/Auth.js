//Login and Signup and Logout controller
const User = require("../Models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config();

// Signup
exports.signUp = async () => {
  try {
    // fetch data from request body
    const {
      firstName,
      lastName,
      phoneNumber,
      email,
      accountType,
      password,
      confirmPassword,
    } = req.body;
    // validation

    // check all feild present or not
    if (
      !firstName ||
      !lastName ||
      !phoneNumber ||
      !email ||
      !accountType ||
      !password ||
      !confirmPassword
    ) {
      return res.status(400).json({
        success: false,
        msg: "All fields are required",
      });
    }

    //match password and confirmPassword
    if (confirmPassword !== password) {
      return res.status(400).json({
        success: false,
        msg: "password and confirm password unmatched",
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

    //Hash password
    const hashPassword = await bcrypt.hash(password, 10);

    //Create user entry in database
    const user = await User.create({
      firstName,
      lastName,
      phoneNumber,
      email,
      accountType,
      password: hashPassword,
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

// Login

exports.login = async (req, res) => {
  try {
    //validation

    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).josn({
        success: false,
        msg: "pls fill all the fields",
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

    console.log("User data while logging ", user);
    //compare password

    if (await bcrypt.compare(password, user.password)) {
      const payload = {
        email: email,
        id: user._id,
        accountType: user.accountType,
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
        expiresIn: "2h",
      });
      user.token = token;
      user.password = undefined;

      //send token to browser  cookie
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
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

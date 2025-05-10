// Import the required modules
const express = require("express");
const router = express.Router();
const { login, signUp, sendotp,logout} = require("../Controllers/Auth");

// Route for user login
router.post("/login", login);

// Route for user signup
router.post("/signup", signUp);

// Route for sending OTP to the user's email
router.post("/sendotp", sendotp);

// Route for logout
router.post("/logout", logout);

module.exports = router;




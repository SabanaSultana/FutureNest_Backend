// Import the required modules
const express = require("express");
const router = express.Router();

const login=require("../Controllers/Auth");
const signUp=require("../Controllers/Auth");
const  sendotp=require("../Controllers/Auth");
const logout=require("../Controllers/Auth");

// Route for user login
router.post("/login", login)

// Route for user signup
router.post("/signup", signUp)

// Route for sending OTP to the user's email
router.post("/sendotp", sendotp)

router.post("/logout", logout)

module.exports = router;


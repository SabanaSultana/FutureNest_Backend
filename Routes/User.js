// Import the required modules
const express = require("express");
const router = express.Router();
const { login, signUp, sendotp,logout, currentUser} = require("../Controllers/Auth");
const {auth} = require("../Middlewares/auth");
// Route for user login
router.post("/login", login);

// Route for user signup
router.post("/signup", signUp);

// Route for sending OTP to the user's email
router.post("/sendotp", sendotp);

// Route for logout
router.post("/logout", logout);

//Route for getting the current user
router.get("/current-user", auth,currentUser);

module.exports = router;




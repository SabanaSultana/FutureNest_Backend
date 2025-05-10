const jwt = require("jsonwebtoken");
const User = require("../Models/User");
require("dotenv").config();

// Authentication Middleware
exports.auth = async (req, res, next) => {
  try {
    // Extract token from cookies, body, or headers
    const token =
      req.cookies?.token ||
      req.body?.token ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token is missing",
      });
    }

    // Verify the token
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.user = decoded;
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Token is invalid",
      });
    }

    // Check if user still exists
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    // // Check if token matches the user's token
    // if (user.token !== token) {
    //   return res.status(401).json({
    //     success: false,
    //     message: "Session expired. Please login again.",
    //   });
    // }

    next();
  } catch (error) {
    console.error("Error in auth middleware:", error);
    return res.status(500).json({
      success: false,
      message: "Authentication failed",
      error: error.message,
    });
  }
};

// Role-based Middleware
exports.isOrphanage = async (req, res, next) => {
  try {
    if (req.user.accountType !== "Orphanage") {
      return res.status(403).json({
        success: false,
        message: "This is a protected route for Orphanage accounts only",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User role verification failed",
    });
  }
};

exports.isDonor = async (req, res, next) => {
  try {
    if (req.user.accountType !== "Donor") {
      return res.status(403).json({
        success: false,
        message: "This is a protected route for Donor accounts only",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User role verification failed",
    });
  }
};

exports.isAdmin = async (req, res, next) => {
  try {
    if (req.user.accountType !== "Admin") {
      return res.status(403).json({
        success: false,
        message: "This is a protected route for Admin accounts only",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User role verification failed",
    });
  }
};


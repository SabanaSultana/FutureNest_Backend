const BookMeet = require("../Models/BookMeet");
const User = require("../Models/User");

exports.bookMeet = async (req, res) => {
  try {
    const { userId, orphanageId } = req.body;

    if (!userId || !orphanageId) {
      return res.status(400).json({
        success: false,
        msg: "All fields are required",
      });
    }
   // Find user by ID
    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).json({
            success: false,
            msg: "User not found",
        });
    }
    
    // Fetch user email
    const userEmail = user.email;
    const userPurpose = user.purpose;

    const orphanage = await User.findById(orphanageId);
    if (!orphanage) {
        return res.status(404).json({
            success: false,
            msg: "Orphanage not found",
        });
    }
    // Fetch orphanage email
    const orphanageEmail = orphanage.email;
    // VVII ***** Send email to orphanage (Further work) ***** then return success response 
  } catch (error) {
    console.error("Error while booking a meeting:", error);
    return res.status(500).json({
      success: false,
      msg: "Internal server error",
    });
  }
};

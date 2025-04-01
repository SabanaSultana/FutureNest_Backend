const BookMeet = require("../Models/BookMeet");
const User = require("../Models/User");

exports.bookMeet = async (req, res) => {
  try {
    const { userId, orphanageId, purpose } = req.body;

    // Validate inputs
    if (!userId || !orphanageId || !purpose) {
      return res.status(400).json({
        success: false,
        msg: "All fields are required",
      });
    }

    // Fetch user email
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        msg: "User not found",
      });
    }

    // Fetch orphanage email
    const orphanage = await User.findById(orphanageId);
    if (!orphanage) {
      return res.status(404).json({
        success: false,
        msg: "Orphanage not found",
      });
    }

    // Create a new meeting request
    const newMeeting = new BookMeet({
      user: userId,
      orphanage: orphanageId,
    });

    await newMeeting.save();

    return res.status(201).json({
      success: true,
      msg: "Meeting booked successfully",
      userEmail: user.email,
      orphanageEmail: orphanage.email,
    });
  } catch (error) {
    console.error("Error booking meeting:", error);
    return res.status(500).json({
      success: false,
      msg: "Internal server error",
    });
  }
};

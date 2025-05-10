const BookMeet = require("../Models/BookMeet");
const User = require("../Models/User");
const mailSender = require("../Utils/MailSender");
const BookMeetTemplate = require("../Mails/Templates/Book_Meet_Template");
require("dotenv").config();

exports.bookMeet = async (req, res) => {
  try {
    const { userId, orphanageId } = req.body;

    if (!userId || !orphanageId) {
      return res.status(400).json({
        success: false,
        msg: "All fields are required",
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, msg: "User not found" });
    }

    const orphanage = await User.findById(orphanageId);
    if (!orphanage) {
      return res
        .status(404)
        .json({ success: false, msg: "Orphanage not found" });
    }

    const userEmail = user.email;
    const userName = user.name;
    const userPurpose = user.purpose;
    const orphanageEmail = orphanage.email;

    // Send email to orphanage
    await mailSender(
      orphanageEmail,
      `Meeting Request from ${userName}`,
      BookMeetTemplate({ userName, userEmail, userPurpose })
    );

    // Save booking to DB
    const booking = await BookMeet.create({
      userId,
      orphanageId,
      purpose: userPurpose,
    });

    return res.status(201).json({
      success: true,
      msg: "Meeting request sent successfully to the orphanage.",
      booking,
    });
  } catch (error) {
    console.error("Error while booking a meeting:", error);
    return res.status(500).json({
      success: false,
      msg: "Internal server error",
    });
  }
};

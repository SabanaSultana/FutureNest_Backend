const Contact = require("../Models/ContactUs");
const mailSender = require("../Utils/MailSender");
const ContactUsTemplate = require("../Mails/Templates/Contact_Us_Template");
require("dotenv").config();

const contactUs = async (req, res) => {
  try {
    const { name, email, subject, message, phoneNumber } = req.body;

    if (!name || !email || !subject || !message || !phoneNumber) {
      return res.status(400).json({
        success: false,
        msg: "Please fill all the fields",
      });
    }

    const contact = await Contact.create({
      name,
      email,
      subject,
      message,
      phoneNumber,
    });

    const adminEmail = process.env.ADMIN_MAIL;

   const contactMail= await mailSender(
      adminEmail,
      `New Contact Request: ${subject}`,
      ContactUsTemplate({ name, email, subject, message, phoneNumber })
    );

    if (!contactMail) {
      return res.status(500).json({
        success: false,
        msg: "Failed to send email to admin",
      });
    }
    console.log("Contact mail sent successfully:", contactMail);

    res.status(201).json({
      success: true,
      msg: "Contact form has successfully submitted and email sent to admin.",
      contact,
    });
  } catch (error) {
    console.error("Error in Contact Us:", error);
    res.status(500).json({
      success: false,
      msg: "An error occurred while submitting contact form",
    });
  }
};

module.exports = { contactUs }; 

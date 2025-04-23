const Contact = require("../Models/ContactUs");

// ******Contact Us*********
export const contactUs = async (req, res) => {
  try {
    const { name, email, subject, message, phoneNumber } = req.body;

    // Check for required fields
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

    //VVIII ******  After adding it to db send it to the admin email (Further work)  ******
    

    res.status(201).json({
      success: true,
      msg: "Contact form has successfully Submitted ",
      contact,
    });
  } catch (error) {
    console.error("Error in Contact Us:", error);
    res.status(500).json({
      success: false,
      msg: "An error occurred while submitting contact form ",
    });
  }
};

const nodemailer = require("nodemailer");
require("dotenv").config();

const mailSender = async (email, title, body) => {
  try {
    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    let info = await transporter.sendMail({
      from: "FutureNest",
      to: `${email}`,
      subject: `${title}`,
      html: `${body}`,
    });
    console.log("mail sender info ", info);
    console.log("Mail sent! Preview URL:", nodemailer.getTestMessageUrl(info));
    return info;
  } catch (error) {
    console.log(
      "Error while sending mail using mailsender nodemailer and transporter "
    );
    console.error(error.message);
  }
};

module.exports = mailSender;

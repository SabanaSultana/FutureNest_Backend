const mailSender = require("../Utils/MailSender");
const otpTemplate = require("../Mails/Templates/Email_Verification_Template");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OtpSchema = new Schema(
  {
    otp: { type: Number, required: true },
    email: { type: String, required: true },
    createdAt: {
      type: Date,
      default: Date.now, 
      expires: 5 * 60, 
    },
  },
  { timestamps: true }
);



// Define a function to send emails
async function sendVerificationEmail(email, otp) {
	// Create a transporter to send emails
	// Define the email options
	// Send the email
	try {
		const mailResponse = await mailSender(
      email,
      "Verification Email",
      otpTemplate(otp)
    );
		console.log("Email sent successfully: ", mailResponse.response);
	} catch (error) {
		console.log("Error occurred while sending email: ", error);
		throw error;
	}
}


OtpSchema.pre("save", async function (next) {
  try {
    if (this.isNew) {
      console.log(
        "Hook triggered for email:",
        this.email,
        "with OTP:",
        this.otp
      );
      await sendVerificationEmail(this.email, this.otp);
    }
    next(); 
  } catch (err) {
    console.error("Error in OTP pre-save hook:", err);
    next(err); 
  }
});

module.exports = mongoose.model("OTP", OtpSchema);
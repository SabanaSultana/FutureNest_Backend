const mailSender = require("../Utils/MailSender");
const Email_Verification_Template =require("../Mails/Templates/Email_Verification_Template");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OtpSchema = new Schema(
  {
    otp: { type: Number, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: Number, required: true },
    createdAt: {
      type: Date,
      default: Date.now(),
      expires: 5 * 60,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("OTP", OtpSchema);

// Define a function to send emails
async function sendVerificationEmail(email, otp) {
	// Create a transporter to send emails
	// Define the email options
	// Send the email
	try {
		const mailResponse = await mailSender(
      email,
      "Verification Email",
      Email_Verification_Template(otp)
    );
		console.log("Email sent successfully: ", mailResponse.response);
	} catch (error) {
		console.log("Error occurred while sending email: ", error);
		throw error;
	}
}

// Define a post-save hook to send email after the document has been saved
OtpSchema.pre("save", async function (next) {
	console.log("New document saved to database");

	// Only send an email when a new document is created
	if (this.isNew) {
		await sendVerificationEmail(this.email, this.otp);
	}
	next();
});

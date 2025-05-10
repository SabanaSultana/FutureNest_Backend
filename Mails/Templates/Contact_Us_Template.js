module.exports = function ContactUsTemplate({
  name,
  email,
  subject,
  message,
  phoneNumber,
}) {
  return `
    <h2>📥 New Contact Form Submission</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Phone:</strong> ${phoneNumber}</p>
    <p><strong>Subject:</strong> ${subject}</p>
    <p><strong>Message:</strong><br/>${message}</p>
  `;
};

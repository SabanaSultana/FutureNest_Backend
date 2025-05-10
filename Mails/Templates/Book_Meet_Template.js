module.exports = function BookMeetTemplate({
  userName,
  userEmail,
  userPurpose,
}) {
  return `
    <h2>New Meeting Request</h2>
    <p><strong>Name:</strong> ${userName}</p>
    <p><strong>Email:</strong> ${userEmail}</p>
    <p><strong>Purpose:</strong> ${userPurpose}</p>
    <p>Please respond to the user to confirm the meeting.</p>
  `;
};

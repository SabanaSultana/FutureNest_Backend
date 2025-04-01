const mongoose = require("mongoose");

const bookMeet = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,   // No need of extra form for booking, I can directly fetch user data with their purpose and can send it to a orphange
    ref: "User",
  },
  orphange: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

});

module.exports = mongoose.model("BookMeet", bookMeet);

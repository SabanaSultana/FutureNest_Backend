const mongoose = require("mongoose");
const additionalInfoSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  QRCode: {
    type: String,
    // required:true, add this from frontend side
  },
  description: {
    type: String,
    // required:true,add this from frontend side
  },
  photo: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("AdditionalInfo", additionalInfoSchema);

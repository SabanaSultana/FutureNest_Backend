const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  accountType: {
    type: String,
    enum: ["Admin", "Donor", "Orphanage"],
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
 
  children: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Children",
    },
  ],
  additionalInfo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "AdditionalInfo",
  },
  purpose: {
    type: String,
    required: true,
  },
  location:{
    type: String,
    required: true,
  }
});

module.exports = mongoose.model("User", userSchema);

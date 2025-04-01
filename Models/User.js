const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  phoneNumber: {
    type: Number,
    required: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  accountType: {
    type: String,
    enum: ["Admin", "User", "Orphanage"],
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  photo:{
    type:String, // make required for orphanage and from frontend
  },
  children: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Children",
    },
  ],
  additionalInfo:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"AdditionalInfo",
  },
  purpose:{
    type:String,
    required:true,
  }
});

module.exports = mongoose.model("User", userSchema);

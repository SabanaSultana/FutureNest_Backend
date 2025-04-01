const mongoose = require("mongoose");

const childrenSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 20,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  age: {
    type: Number,
    required: true,
  },
  photoUrl: {
    type: String,
    required: true,
    trim: true,
  },
  videoUrl: {
    type: String,
    required: true,
    trim: true,
  },
  orphange: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  education:{
   type:String,
    required:true,
  },
  description: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Children", childrenSchema);

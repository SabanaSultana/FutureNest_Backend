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
  educationDetails:{
    type:String,
    required:true,
  },
  description: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Children", childrenSchema);

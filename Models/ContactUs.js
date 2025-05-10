const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 2, 
    maxlength: 100, 
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  subject: {
    type: String,
    required: true,
    trim: true,
    minlength: 5, 
    maxlength: 70, 
  },
  message: {
    type: String,
    required: true,
    trim: true,
    minlength: 10, 
    maxlength: 2000, 
  },
  date: {
    type: Date,
    default: Date.now, 
  },
  phoneNumber:{
    type:Number,
    required:true
  }
});

module.exports = mongoose.model("Contact", contactSchema);

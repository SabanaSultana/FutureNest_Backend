const express = require("express");
const router = express.Router();
const auth = require("../Middlewares/auth");

const bookMeet = require("../Controllers/BookMeet");
const contactUs = require("../Controllers/ContactUs");

router.post("/book-meet", auth, bookMeet); // Book a meeting with an orphanage

router.post("/contact-us", contactUs); 
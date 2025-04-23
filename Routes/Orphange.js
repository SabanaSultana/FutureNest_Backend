
const express = require("express");
const router = express.Router();
const orphanageController = require("../controllers/orphanageController");


router.get("/", orphanageController.getAllOrphanages); // Get all orphanages
router.get("/:id", orphanageController.getOrphanageById); // Get specific orphanage by ID

module.exports = router;
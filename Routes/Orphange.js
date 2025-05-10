
const express = require("express");
const router = express.Router();
const orphanageController = require("../Controllers/GetOrphanges");


router.get("/", orphanageController.getAllOrphanages); 
router.get("/:id", orphanageController.getOrphanageById); 

module.exports = router;
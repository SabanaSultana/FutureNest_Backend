const express = require("express");
const router = express.Router();
const { auth, isOrphanage } = require("../Middlewares/auth");
const childrenController = require("../Controllers/Children");

router.post("/addChildren", auth, isOrphanage, childrenController.addChildren);

router.get(
  "/orphanage/:orphanageId",
  childrenController.getChildrenByOrphanageId
);


router.get("/:id", childrenController.getChildrenDetailsById);


router.put("/:id", auth, isOrphanage, childrenController.updateChildrenDetails);


router.delete(
  "/:id",
  auth,
  isOrphanage,
  childrenController.deleteChildrenDetails
);

module.exports = router;

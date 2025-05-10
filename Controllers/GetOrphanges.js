const User = require("../Models/User");

// ******* Get All Orphanages*******
exports.getAllOrphanages = async (req, res) => {
  try {
    const orphanages = await User.find({ accountType: "Orphanage" }).populate(
      "children"
    ); 

    if (!orphanages.length) {
      return res.status(404).json({
        success: false,
        msg: "No orphanages found",
      });
    }

    return res.status(200).json({
      success: true,
      orphanages,
    });
  } catch (error) {
    console.error("Error fetching orphanages:", error);
    res.status(500).json({
      success: false,
      msg: "An error occurred while fetching orphanages",
    });
  }
};

// *******Get Orphanage by ID**********
exports.getOrphanageById = async (req, res) => {
  try {
    const orphanageId = req.params.id;

    const orphanage = await User.findById(orphanageId).populate("children");

    if (!orphanage) {
      return res.status(404).json({
        success: false,
        msg: "Orphanage not found",
      });
    }

    return res.status(200).json({
      success: true,
      orphanage,
    });
  } catch (error) {
    console.error("Error fetching orphanage:", error);
    res.status(500).json({
      success: false,
      msg: "An error occurred while fetching the orphanage",
    });
  }
};

const User = require("../Models/User");
const Children = require("../Models/Children");

// *****add Children details*******
exports.addChildren = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      age,
      photoUrl,
      videoUrl,
      description,
      orphanageId,
    } = req.body;

    if (
      !firstName ||
      !lastName ||
      !age ||
      !photoUrl ||
      !videoUrl ||
      !educationDetails ||
      !description ||
      !orphanageId
    ) {
      return res.status(400).json({
        success: false,
        msg: "All fields are required",
      });
    }

    //add details in db
    const childrenDetails = await Children.create({
      firstName,
      lastName,
      age,
      photoUrl,
      videoUrl,
      educationDetails,
      description,
    });

    // Add the child ID to the orphanage's (User's) children array
    const orphanage = await User.findById(orphanageId);
    if (!orphanage) {
      return res.status(404).json({
        success: false,
        msg: "Orphanage not found",
      });
    }

    // Push the child ID to the children array
    orphanage.children.push(childrenDetails._id);
    await orphanage.save();
  } catch (error) {
    console.error("Error adding child:", error);
    res.status(500).json({
      success: false,
      msg: "An error occurred while adding the child",
    });
  }
};

// *****get Children details by orphange id ********
exports.getChildrenByOrphanageId = async (req, res) => {
  try {
    const orphanageId = req.params.orphanageId;

    const orphanage = await User.findById(orphanageId).populate("children");
    if (!orphanage) {
      return res.status(404).json({
        success: false,
        msg: "Orphanage not found",
      });
    }

    // Fetch the children related to this orphanage
    const childrenDetails = orphanage.children;

    if (!childrenDetails || childrenDetails.length === 0) {
      return res.status(404).json({
        success: false,
        msg: "No children found for this orphanage",
      });
    }

    return res.status(200).json({
      success: true,
      children: childrenDetails,
    });
  } catch (error) {
    console.error("Error fetching children:", error);
    res.status(500).json({
      success: false,
      msg: "An error occurred while fetching children details from a specific orphanage",
    });
  }
};

//*******get Children details by id*********
exports.getChildrenDetailsById = async (req, res) => {
  try {
    const childrenId = req.params.id; // Use req.params.id to get the ID from the URL

    const child = await Children.findById({ _id: childrenId });

    if (!child) {
      return res.status(401).json({
        success: false,
        msg: "child doesn't exist",
      });
    }

    return res.status(200).json({
      success: true,
      child,
    });
  } catch (error) {
    console.error("Error getting child:", error);
    res.status(500).json({
      success: false,
      msg: "An error occurred while requesting for children the child",
    });
  }
};

//*******update Children details*********
exports.updateChildrenDetails = async (req, res) => {
  try {
    const { childrenId } = req.body; // from dashboard of each orphnage
    const { firstName, lastName, age, photoUrl, videoUrl, description } =
      req.body;

    const child = await Children.findById({ _id: childrenId });

    if (!child) {
      return res.status(401).json({
        success: false,
        msg: "child doesn't exist",
      });
    }

    // Update the child's details
    child.firstName = firstName || child.firstName;
    child.lastName = lastName || child.lastName;
    child.age = age || child.age;
    child.photoUrl = photoUrl || child.photoUrl;
    child.videoUrl = videoUrl || child.videoUrl;
    child.description = description || child.description;

    // Save the updated child details
    await child.save();

    res.status(200).json({
      success: true,
      msg: "Child details updated successfully",
      updatedChildDetails: child,
    });
  } catch (error) {
    console.error("Error getting child:", error);
    res.status(500).json({
      success: false,
      msg: "An error occurred while requesting for children the child",
    });
  }
};

//*******delete Children Details*******

exports.deleteChildrenDetails = async (req, res) => {
  try {
    //fetch child id from req body
    const { childId } = req.body;

    // delete child from Children Schema
    await Children.findByIdAndDelete({ childId });

    return res.status(200).json({
      success: true,
      msg: "Child details deleted successfully ",
    });
  } catch (error) {
    console.log("Error occuring while deleting Child details  ", error);
    return res.status(500).json({
      success: false,
      msg: "Child details deletion has failed ",
    });
  }
};

const User = require("../Models/User");

const Children = require("../Models/Children");

// add Children details
export const addChildren = async (req, res) => {
  try {
    const { firstName, lastName, age, photoUrl, videoUrl, description } =
      req.body;

    const orphanageId = req.param;

    if (
      !firstName ||
      !lastName ||
      !age ||
      !photoUrl ||
      !videoUrl ||
      !description
    ) {
      return res.status(400).json({
        success: false,
        msg: "Pls fill all the feilds",
      });
    }

    //add details in db

    const childrenDetails = await Children.create({
      firstName,
      lastName,
      age,
      photoUrl,
      videoUrl,
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

//get Children details

exports.getChildrenDetails = async (req, res) => {
  try {
    const childrenDetails = await Children.find();

    if (!childrenDetails) {
      return res.status(401).json({
        success: false,
        msg: "No children found ",
      });
    }

    return res.status(200).json({
      success: true,
      childrenDetails,
    });
  } catch (error) {
    console.error("Error getting child:", error);
    res.status(500).json({
      success: false,
      msg: "An error occurred while requesting for children the child",
    });
  }
};

//update Children details

exports.updateChildrenDetails = async (req, res) => {
  try {
    const childrenId = req.param;
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
      updatedChildDetails:child,
    });
  } catch (error) {
    console.error("Error getting child:", error);
    res.status(500).json({
      success: false,
      msg: "An error occurred while requesting for children the child",
    });
  }
};

//delete Children Details

export const deleteChildrenDetails=async(req,res)=>{
    try {
      //fetch child id from req body
      const childId = req.params;

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
}

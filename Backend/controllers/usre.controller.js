import uploadOnCloudinary from "../config/cloudinary.js";
import User from "../models/User.Model.js";

export const getCurrentUser = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId); // ✅ Correct

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Get current user error: ${error.message}` });
  }
};

export const suggestedUsers = async (req, res) => {
  try {
    const users = await User.find({
      _id: { $ne: req.userId },
    }).select("-password");
    return res.status(200).json(users);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Error fetching suggested users: ${error.message}` });
  }
};

export const editProfile = async (req, res) => {
  try {
    const { name, userName,bio,profession,gender} = req.body;
    const user = await User.findById(req.userId).select("-password");
    if(!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const sameUserWithUserName = await User.findOne({ userName }).select("-password");
    if(sameUserWithUserName && sameUserWithUserName._id!= req.userId) {
      return res.status(400).json({ message: "Username already exists" });
    }

    let profileImage;
    if(req.file) {
      profileImage = await uploadOnCloudinary(req.file.path)
    }
    user.name = name
    user.userName = userName;
    user.profileImage = profileImage 
    user.bio = bio 
    user.profession = profession
    user.gender = gender

    await user.save();
    return res.status(200).json(user);

  } catch (error) {
    return res
      .status(500)
      .json({ message: `Error Edit profile: ${error.message}` });
  }
};


export const getProfile = async (req, res) => {
  try {
    const userName = req.params.userName;
    const user = await User.findOne({ userName }).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Error get profile error:  ${error.message}` });
  }
}

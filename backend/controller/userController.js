import User from "../model/userModel.js";
import Fuse from "fuse.js";
import cloudinary from "../utils/cloudinary.js";

export const getVerifiedUsers = async (req, res) => {
  try {
    const { q } = req.query;
    const userId = req.userId;
    const users = await User.find({ isVerified: true , _id: { $ne: userId }  }).select("-password -__v -isVerified -publicId").limit(100);

    if (!q) return res.status(200).json({success:true, users});


    const fuse = new Fuse(users, {
      keys: ["name", "email"],
      threshold: 0.3 
    });

    const results = fuse.search(q).map(r => r.item);

    res.status(200).json({success:true, users:results});
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id).select("-password -__v -isVerified -publicId");
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        res.status(200).json({ success: true, user });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching user" });
    }
};

export const updateUser = async (req, res) => {
  try {
    const userId = req.userId; // from authMiddleware
    const { name, bio } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const oldPublicId = user.publicId;

    // If a new file is uploaded
    if (req.file) {
      try {
        const { public_id, secure_url } = await cloudinary.uploader.upload(req.file.path, {
          folder: "profile_pictures",
        });
        user.publicId = public_id;
        user.profilePicture = secure_url;
      } catch (cloudErr) {
        return res.status(500).json({ message: "Image upload failed" });
      }
    }

    // Update other fields
    if (name) user.name = name;
    if (bio) user.bio = bio;

    await user.save();

    // Delete old image only if new one uploaded
    if (req.file && oldPublicId) {
      try {
        await cloudinary.uploader.destroy(oldPublicId);
      } catch (delErr) {
      }
    }

    res.json({
      success: true,
      updatedUser: {
        _id: user._id,
        email: user.email,
        name: user.name,
        profilePicture: user.profilePicture,
        bio: user.bio
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

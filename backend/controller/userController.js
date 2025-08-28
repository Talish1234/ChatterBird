import User from "../model/userModel.js";

export const getVerifiedUsers = async (req, res) => {
    try {
        const users = await User.find({ isVerified: true }).select("-password -__v -isVerified");
        res.status(200).json({success:true, users});
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching users" });
    }
};

export const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id).select("-password -__v -isVerified");
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        res.status(200).json({ success: true, user });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching user" });
    }
};

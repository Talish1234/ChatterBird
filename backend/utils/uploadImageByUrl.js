import cloudinary from "../utils/cloudinary.js";

export const uploadImageByUrl = async (imageUrl) => {
  try {
        if (!imageUrl) {
      return res.status(400).json({ message: "Image URL is required" });
    }

    const data = await cloudinary.uploader.upload(imageUrl, {
      folder: "profile_pictures", 
    });

    return {
      profilePicture: data.secure_url, 
      publicId: data.public_id,      
    };
  } catch (err) {
    console.error("Cloudinary Upload Error:", err.message);
    throw err;
  }
};
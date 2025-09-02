import { OAuth2Client } from "google-auth-library";
import User from "../model/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "../utils/VerificationEmail.js";
import { uploadImageByUrl } from "../utils/uploadImageByUrl.js";

const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.BASE_URL
);

export const googleSignUpController = async (req, res) => {
  try {
    const { code } = req.body;
    const { tokens } = await client.getToken(code);

    const ticket = await client.verifyIdToken({
      idToken: tokens.id_token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const { email, name, picture, email_verified, at_hash } = ticket.getPayload();
    console.log(email);
    
    let user = await User.findOne({ email });
    if (!user) {
        const hashPassword = await bcrypt.hash(at_hash, 10);
        const {profilePicture,publicId} = await uploadImageByUrl(picture);
        user = await User.create({
            email: email,
            name: name,
            profilePicture,
            isVerified: email_verified,
            password: hashPassword,
            publicId
      });
    }
    const token = jwt.sign({ userId: user._id}, process.env.JWT_SECRET, {
      expiresIn: 1000 * 60 * 60 * 24 * 90,
    });
    
    return res.cookie("chatter-token", token, {
        sameSite: "None",
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 90,
    }).status(200).json({ success: true, user: { _id: user._id, email: user.email, name: user.name, profilePicture: user.profilePicture, bio:user.bio} });
  } catch (err) {
    console.error("Google Auth Error:", err);
    return res.status(400).json({ success: false, error: err.message });
  }
};

export const emailSignUpController = async (req, res) => {
  try {
    const { email, name, password } = req.body;

    let user = await User.findOne({ email });
    if (!user) {
      const hashPassword = await bcrypt.hash(password, 10);
      const {profilePicture,publicId} = await uploadImageByUrl(picture);
      user = await User.create({
        name,
        email,
        password: hashPassword,
        profilePicture,
        publicId
      });
    }
    if (user.isVerified) {
      return res.status(400).json({ success: false, error: "Duplicate email" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: 1000 * 60 * 60 * 24 * 7,
    });
    await sendVerificationEmail(email, token, req);
    return res.status(200).json({ success: true, user: { _id: user._id , email: user.email, name: user.name, profilePicture: user.profilePicture, bio:user.bio } });
  } catch (err) {
    console.error("Email Auth Error:", err);
    return res.status(400).json({ success: false, error: err.message });
  }
};

export const emailLoginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).select("-__v");
        if (!user) {
            return res.status(400).json({ success: false, error: "User not found" });
        }

        if (!user.isVerified) {
            return res.status(400).json({ success: false, error: "Email not verified" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, error: "Invalid credentials" });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: 1000 * 60 * 60 * 24 * 90,
        });

        return res.status(200).cookie("chatter-token", token, {
            sameSite: "None",
            secure: process.env.NODE_ENV === "production",
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 90,
        }).json({ success: true, user: { _id: user._id, email: user.email, name: user.name, profilePicture: user.profilePicture, bio:user.bio} });

    } catch (err) {
        console.error("Email Auth Error:", err);
        return res.status(400).json({ success: false, error: err.message });
    }
};

export const emailVerificationController = async (req, res) => {
  try {
    const { token } = req.query;

    if (!token) {
      return res.status(400).json('<div style="text-align: center;"><h1 style="color: red; ">Invalid token</h1></div>');
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).json('<div style="text-align: center;"><h1 style="color: red; ">User not found</h1></div>');
    }

    user.isVerified = true;
    await user.save();

    return res.status(200).send('<div style="text-align: center;"><h1 style="color: green; ">Email verified successfully</h1></div>');
  } catch (err) {
    console.error("Email Verification Error:", err);
    return res.status(400).send('<div style="text-align: center;"><h1 style="color: red; ">Email verification failed</h1></div>');
  }
};
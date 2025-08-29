import Chat from "../model/chatModel.js";
import Message from "../model/messageModel.js";
import mongoose from "mongoose";

export const openChat = async (req, res) => {
  try {
    let userId = req.userId;
    let { reciverId } = req.body;

    if (!userId || !reciverId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    userId = new mongoose.Types.ObjectId(userId);
    reciverId = new mongoose.Types.ObjectId(reciverId);

    let chat = await Chat.findOne({
      participants: { $all: [userId, reciverId] }
    });
    
    arr.sort((a,b)=> a-b);
    if (!chat) {
      chat = await Chat.create({
        participants: [userId, reciverId],
      });
      return res.status(201).json({ message: "Chat created", chat });
    }

    const messages = await Message.find({ chat: chat._id })
      .sort({ createdAt: -1 })
      .limit(50)
      .select("-__v -chat");

    res.status(200).json({
      success: true,
      chat,
      messages: messages.reverse()
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

import Chat from "../model/chatModel.js";
import Message from "../model/messageModel.js";
import mongoose from "mongoose";

export const openChat = async (req, res) => {
  try {
    let userId = new mongoose.Types.ObjectId(req.userId);
    let { receiverId } = req.body;

    if (!userId || !receiverId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    receiverId = new mongoose.Types.ObjectId(receiverId);
    const participants = [userId, receiverId].sort();

    let chat = await Chat.findOne({ participants });

    if (!chat) {
      chat = await Chat.create({ participants });
      return res
        .status(201)
        .json({ message: "Chat created", chat, messages: [] });
    }

    const messages = await Message.find({ chat: chat._id })
      .sort({ createdAt: -1 })
      .limit(50)
      .select("-__v -chat -seen");

    await Message.updateMany(
      { chat: chat._id, userId: receiverId },
      { $set: { seen: true } }
    );
    res.status(200).json({
      success: true,
      chat,
      messages: messages.reverse(),
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const getUnreadCounts = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.userId);

    const UnreadCounts = await Chat.aggregate([
      // Step 1: Match chats where this user is a participant
      {
        $match: {
          participants: userId,
        },
      },

      // Step 2: Lookup messages of this chat
      {
        $lookup: {
          from: "messages",
          localField: "_id",
          foreignField: "chat",
          as: "messages",
        },
      },

      // Step 3: Unwind messages
      { $unwind: "$messages" },

      // Step 4: Only unseen messages AND not sent by the current user
      {
        $match: {
          "messages.seen": false,
          "messages.userId": { $ne: userId },
        },
      },

      // Step 5: Group by sender (other participant)
      {
        $group: {
          _id: "$messages.userId",
          count: { $sum: 1 },
          lastMessageTime: { $max: "$messages.createdAt" },
        },
      },

      // Step 6: Rename fields
      {
        $project: {
          _id: 0,
          receiverId: "$_id",
          count: 1,
          lastMessageTime: 1,
        },
      },
    ]);

    return res.status(200).json({ success: true, UnreadCounts });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

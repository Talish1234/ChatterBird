import Chat from "../model/chatModel.js";
import Message from "../model/messageModel.js";

export const openChat = async (req, res) => {
  try {
    const userId = req.userId;
    const { reciverId } = req.body;

    if (!userId || !reciverId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    let chat = await Chat.findOne({
      participants: { $all: [userId, reciverId]} 
    });

    if (!chat) {
      chat = await Chat.create({
        participants: [userId, reciverId],
      });
      return res.status(201).json({ message: "Chat created", chat });
    }
    const messages = await Message.find({ chat: chat._id })
  .sort({ createdAt: -1 })
  .limit(50).select("-__v -chat");
  
    res.status(200).json({ success: true, chat, messages:messages.reverse()});
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};



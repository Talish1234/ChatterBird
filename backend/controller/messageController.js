import Message from "../model/messageModel.js";

export const createMessage  = async (req, res) => {
    try {
        const userId = req.userId;
        const { chatId, text } = req.body;

        if (!chatId || !userId || !text) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newMessage = await Message.create({
            chat: chatId,
            userId,
            text
        });

        res.status(201).json({ success: true, message: {
            userId: newMessage.userId,
            text: newMessage.text,
            createdAt: newMessage.createdAt
        } });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}
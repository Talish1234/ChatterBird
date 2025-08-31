import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    messages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message"
    }],
    lastMessage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Message"
},
    createdAt: {
        type: Date,
        default: Date.now
    }
})

chatSchema.pre("save", function (next) {
  this.participants = this.participants.sort();
  next();
});

// Unique index so same participants can't create duplicate chat
chatSchema.index({ participants: 1 });

const Chat = mongoose.model("Chat", chatSchema);

export default Chat;
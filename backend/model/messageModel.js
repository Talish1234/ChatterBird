import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    chat:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chat"
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    text: {
        type: String,
        required: true
    },
    seen: {
     type:Boolean,
     default:false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Message = mongoose.model("Message", messageSchema);

export default Message;
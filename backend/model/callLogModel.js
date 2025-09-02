import mongoose from "mongoose";

const callLogSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  receiverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  type: {
    type: String,
    enum: ["incoming", "outgoing", "missed", "rejected"],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


const CallLog = mongoose.model("CallLog", callLogSchema);

export default CallLog;

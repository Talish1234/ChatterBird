import CallLog from "../model/callLogModel.js";

export const getAllLogs = async (req, res) => {
  try {
    const userId = req.userId;
    const logs = await CallLog.find({
      $or: [{ userId: userId }, { receiverId: userId }],
    }).select('-__v')
      .populate("userId", "name")
      .populate("receiverId", "name")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, log: logs });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const createLog = async (req, res) => {
  try {
    const userId = req.userId;
    const { receiverId } = req.body;

    const newLog = await CallLog.create({
      userId,
      receiverId,
      type: "missed",
    });

    res.status(200).json({ success: true, log: newLog });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const updateLog = async (req, res) => {
  try {
    const { id } = req.params;
    const { type } = req.body;

    const log = await CallLog.findByIdAndUpdate(id, {
      type,
    });

    res.status(200).json({ success: true, log });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

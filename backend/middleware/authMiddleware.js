import jwt from 'jsonwebtoken';

export const authMiddleware = async (req,res,next) => {
    const token = req.cookies['chatter-token'] || req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
    }
}
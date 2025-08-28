import { mongoose } from "mongoose";

const connectDB = async (MONGO_URI) => {
    try {
        const db = await mongoose.connect(MONGO_URI);
        console.log("Database connected successfully:", db.connection.name);
    } catch (error) {
        console.error("Database connection failed:", error.message);
        process.exit(1);
    }
}

export default connectDB;
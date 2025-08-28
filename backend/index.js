import express from 'express';
import cors from 'cors';
import 'dotenv/config'; // Import dotenv and configure it
import googleAuthRoute from './routes/googleAuthRoute.js'; // Note the .js extension
import authRouter from './routes/authRouter.js';
import userRouter from './routes/userRouter.js';
import chatRouter from './routes/chatRouter.js';
import messageRouter from './routes/messageRouter.js';
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
import { authMiddleware } from './middleware/authMiddleware.js';
import { createServer } from "http"; 
import { Server } from "socket.io";

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: process.env.BASE_URL,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.use(cors({
  origin: process.env.BASE_URL,
  credentials: true,
}));

connectDB(process.env.DATABASE_URL);

app.use(cookieParser());

app.use(express.json());

app.get('/', authMiddleware, (req, res) => {
    res.send("User route");
});
app.use('/google', googleAuthRoute);
app.use('/email', authRouter);
app.use('/user', userRouter);
app.use('/chat', chatRouter);
app.use('/message', messageRouter);

io.on("connection", (socket) => {

  socket.on('join', (userId) => {
    socket.join(userId);
    console.log(`User ${socket.id} joined room ${userId}`);
  });

  socket.on('send-message', ({ receiverId, message }) => {
    socket.to(receiverId).emit('receive-message', message);
  });

  socket.on("disconnect", () => {
    console.log(`User ${socket.id} disconnected`);
  });
});

httpServer.listen(process.env.PORT || 8000, () =>
  console.log(`Backend running on http://localhost:${process.env.PORT || 8000}`)
);

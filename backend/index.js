import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import googleAuthRoute from './routes/googleAuthRoute.js';
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
  console.log("user is connected with id",socket.id);
  
  socket.on('join', (userId) => {
    socket.join(userId);
    socket.data.userId = userId;
    socket.broadcast.emit('online',userId);
  });

  socket.on('isOnline', (userId) => {
    const room = io.sockets.adapter.rooms.get(userId);
    if(room && room.size > 0)
    socket.emit('online',userId);
  });

  socket.on('send-message', ({ receiverId, message, name, profilePicture }) => {
    socket.to(receiverId).emit('receive-message', message);
    socket.to(receiverId).emit('receive-notification', { sender: { message, name, profilePicture } });
  });

  socket.on("disconnect", () => {
    console.log(`User ${socket.id} disconnected`);
    const userId = socket.data.userId;
      io.emit("offline", userId);
  });
});

httpServer.listen(process.env.PORT || 8000, () =>
  console.log(`Backend running on http://localhost:${process.env.PORT || 8000}`)
);

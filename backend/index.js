import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import googleAuthRoute from './routes/googleAuthRoute.js';
import authRouter from './routes/authRouter.js';
import userRouter from './routes/userRouter.js';
import chatRouter from './routes/chatRouter.js';
import messageRouter from './routes/messageRouter.js';
import callLogRoute from './routes/callLogRoute.js';
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
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

app.get('/', (req, res) => {
    res.send("App is working..");
});
app.use('/google', googleAuthRoute);
app.use('/email', authRouter);
app.use('/user', userRouter);
app.use('/chat', chatRouter);
app.use('/message', messageRouter);
app.use('/call', callLogRoute);

io.on("connection", (socket) => {
  
  socket.on('join', (userId) => {
    socket.join(userId);
    socket.data.userId = userId;
    socket.broadcast.emit('online',userId);
  });
   //** test logic* */
  socket.on("calling", ({ to,  from, callId}) => {
    io.to(to).emit("calling-notification", { from, callId });
  })
  //incomming-call
  socket.on('start-connecting', ({to}) => {
    socket.to(to).emit('start-connecting',{from:socket.id});
  });
  socket.on('call-connected', ({to , offer}) => {
  io.to(to).emit('incomming-call', {from:socket.id,offer});
  })

  socket.on('call-accepted', ({to, ans}) => {
    io.to(to).emit('call-accepted',{from:socket.id,ans})
  })

   socket.on("ice-candidate", ({ to, candidate }) => {
    io.to(to).emit("ice-candidate", { from: socket.id, candidate });
  });
   /*close test logic*/
   
  socket.on('isOnline', (userId) => {
    const room = io.sockets.adapter.rooms.get(userId);
    if(room && room.size > 0)
    socket.emit('online',userId);
  });

  socket.on('send-message', ({ receiverId, message, name, profilePicture }) => {
    socket.to(receiverId).emit('receive-message', message);
    socket.to(receiverId).emit('receive-notification', { sender: { message, name, profilePicture } });
  });
    socket.on("call-ended", ({ to }) => {
    io.to(to).emit("call-ended");
  });
  socket.on("disconnect", () => {
    const userId = socket.data.userId;
      io.emit("offline", userId);
  });
});

httpServer.listen(process.env.PORT || 8000, () =>
  console.log(`Backend running on http://localhost:${process.env.PORT || 8000}`)
);

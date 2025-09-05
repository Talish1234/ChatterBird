# 🐦 ChatterBird V2 – Real-Time Chat & Video Calling App  

A **full-stack real-time communication app** built with **React.js, Express.js, Socket.IO, Redux, and WebRTC**.  
ChatterBird lets users **chat, make video calls, see online/offline status, and receive instant notifications** — all with a modern and responsive UI.  

---

## 🚀 Features  
- 💬 **Real-Time Chat** – One-to-one messaging with instant updates.  
- 📞 **Video Calling (WebRTC)** – Peer-to-peer video calls with signaling via Socket.IO.  
- 🔔 **Live Notifications** – Get notified instantly for incoming messages and calls.  
- 🟢 **Presence System** – Know when users are online/offline in real time.  
- 🗂️ **Modular Architecture** – Clean separation of backend and frontend.  
- 🌗 **Light/Dark Mode** – Switch between themes to fit your preference.  
- 📱 **Responsive UI** – Works smoothly on desktop and mobile.  

---

## 🛠️ Tech Stack  
**Frontend** - React.js + Vite  
- Redux Toolkit  
- TypeScript  
- TailwindCSS  

**Backend** - Node.js + Express.js  
- Socket.IO  
- MongoDB (or your DB choice)
- Cloudinary

**Other** - WebRTC (video calls)  
- JWT / Authentication system  
- Vercel / Render (deployment ready)  

---

## 📂 Folder Structure
```dir
Chatter Bird/
├── backend/ # Express backend
│ ├── config/ # DB & server config
│ ├── controller/ # Controllers
│ ├── middleware/ # Auth & other middlewares
│ ├── model/ # Database models
│ ├── routes/ # API routes
│ ├── utils/ # Utility functions
│ └── index.js # App entry
│
├── frontend/ # React frontend
│ ├── public/ # Static files
│ └── src/
│   ├── assets/ # Images, icons
│   ├── Components/ # Reusable components
│   ├── Interfaces/ # TypeScript interfaces
│   ├── pages/ # Page-level components
│   ├── Redux/ # State management
│   ├── utils/ # Frontend utilities
│   ├── App.tsx # Main app component
│   └── main.tsx # Entry point
│
├── README.md
├── package.json
└── .gitignore
```

---

## ⚡ Getting Started  

### 1️⃣ Clone the Repository  
```bash
git clone https://github.com/Talish1234/ChatterBird
cd ChatterBird
```

### 2️⃣ Setup Backend
```bash
cd backend
npm install
npm run dev
```

Backend runs at: `http://localhost:8000`

### 3️⃣ Setup Frontend
```bash

cd frontend
npm install
npm run dev
```
Frontend runs at: `http://localhost:5173`

### ⚙️ Environment Variables
To run this project, you will need to create a .env file in the `backend folder` and add the following environment variables.

```.env
GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET=YOUR_GOOGLE_CLIENT_SECRET
BASE_URL=http://localhost:5173
DATABASE_URL=mongodb://127.0.0.1:27017
JWT_SECRET=YOUR_RANDOM_SECRET_STRING
SMTP_AUTH_USER=YOUR_MAILTRAP_USERNAME
SMTP_AUTH_PASS=YOUR_MAILTRAP_PASSWORD
CLOUD_NAME=YOUR_CLOUDINARY_CLOUD_NAME
UNSIGNED_PRESET=chatterBird
CLOUDINARY_KEY=YOUR_CLOUDINARY_API_KEY
CLOUDINARY_SECRET=YOUR_CLOUDINARY_API_SECRET
```

In the `frontend folder` and add the following environment variables.

```.env
VITE_GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID
VITE_BASE_URL=http://localhost:8000
```

<!-- ▶️ Demo
Real-Time Chat Preview
Video Call Preview
-->

### 📸 Screenshots
<div>
  <h3>Welcome Page</h3> <br>
  <img src="https://res.cloudinary.com/dwvvhxbgy/image/upload/v1757091363/Screenshot_2025-09-05_213832_yr8iwn.png" alt="/welcomePage"/>
  <h3>Signup & Login Page</h3>  <br>
  <img src="https://res.cloudinary.com/dwvvhxbgy/image/upload/v1757091537/Screenshot_2025-09-05_220133_topeix.png" alt="login and signup" />
  <div>
    <h3> Live Notifications & Chat Page</h3> <br>
    <img src="https://res.cloudinary.com/dwvvhxbgy/image/upload/v1757091536/Screenshot_2025-09-05_214731_ufppwp.png" width="45%"/>
    <img src="https://res.cloudinary.com/dwvvhxbgy/image/upload/v1757091349/Screenshot_2025-09-05_214830_jtajxj.png" width="45%"/>
  </div>
  <div>
    <h3> Video Call Page</h3> <br>
    <img src="https://res.cloudinary.com/dwvvhxbgy/image/upload/v1757091539/Screenshot_2025-09-05_215150_stcvcl.png" width="45%"/>
    <img src="https://res.cloudinary.com/dwvvhxbgy/image/upload/v1757091540/Screenshot_2025-09-05_215835_x7kifc.png" width="45%"/>
  </div>
  <div>
    <h3>Fuzzy Search , Setting & Call Logs Page</h3> <br>
     <img src="https://res.cloudinary.com/dwvvhxbgy/image/upload/v1757091347/Screenshot_2025-09-05_215033_ndfyh8.png" width="28%"/>
    <img src="https://res.cloudinary.com/dwvvhxbgy/image/upload/v1757091349/Screenshot_2025-09-05_213951_qddi0e.png" width="38%"/>
    <img src="https://res.cloudinary.com/dwvvhxbgy/image/upload/v1757094621/Screenshot_2025-09-05_215927_ewveq5.png" width="28%"/>
  </div>
</div>

### 🤝 Contributing
Contributions are welcome! Please fork this repo and submit a pull request.
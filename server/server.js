// server.js
import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";
import socketHandler from "./socket/socketHandler.js";

dotenv.config();

const app = express();
app.use(express.json());

const allowedOrigins = [
  "http://localhost:5173",
  "https://your-frontend.vercel.app"
];

app.use(cors({
  origin: allowedOrigins,
  methods: ["GET", "POST"]
}));

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"]
  }
});

app.get("/", (req, res) => {
  res.json({ message: "GeoSync Server Running !" });
});


socketHandler(io);

const PORT = process.env.PORT;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
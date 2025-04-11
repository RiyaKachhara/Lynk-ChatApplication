import dotenv from "dotenv";
dotenv.config(); // ⬅️ this should be FIRST

import express from "express";

import cookieParser from "cookie-parser";
import cors from "cors";
import bodyParser from "body-parser";
import {app, server} from "./lib/socket.js"

import {connectDB} from "./lib/db.js"  
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";

import path from "path";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(bodyParser.json({ limit: "10mb" }));  // Adjust size as needed
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

dotenv.config();

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

//const PORT = process.env.PORT;
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();


if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));
  
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    });
  }
  

server.listen(PORT, () => {
    console.log("server is running on PORT : " + PORT);
    connectDB();
});
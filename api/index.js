import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import messagesRoutes from "./routes/message.route.js";
import userRoutes from "./routes/user.route.js";
import connectToDb from "./config/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
const server = express();
dotenv.config();
server.use(express.json());
server.use(cookieParser());
server.use(cors());
server.use("/api/auth", authRoutes);
server.use("/api/message", messagesRoutes);
server.use("/api/users", userRoutes);

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  connectToDb(process.env.MONGO_URL);
});

import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import connectToDb from "./config/db.js";
const server = express();
dotenv.config();
server.use(express.json());
server.use("/api/auth", authRoutes);

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  connectToDb(process.env.MONGO_URL);
});

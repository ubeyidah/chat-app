import { Router } from "express";
import { sendMessage } from "../controllers/message.controller.js";
import protectRoute from "../middleware/protectRote.js";

const router = Router();

router.post("/send/:id", protectRoute, sendMessage);

export default router;

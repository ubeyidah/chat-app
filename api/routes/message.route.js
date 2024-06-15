import { Router } from "express";
import { sendMessage } from "../controllers/message.controller.js";

const router = Router();

router.post("/send/:id", sendMessage);

export default router;

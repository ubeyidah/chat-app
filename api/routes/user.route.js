import { Router } from "express";
import protectRoute from "../middleware/protectRote.js";
import { getUsers } from "../controllers/users.controller.js";

const router = Router();

router.get("/", protectRoute, getUsers);

export default router;

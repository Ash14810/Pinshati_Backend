import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { getDashboard } from "../controllers/dashboardController.js";

const router = express.Router();

router.get("/:role", verifyToken, getDashboard);

export default router;

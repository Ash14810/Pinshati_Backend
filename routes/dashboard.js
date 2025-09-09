import express from "express";
import { verifyToken,verifyRole } from "../middleware/auth.js";
import path from "path";

const router = express.Router();

// Student dashboard
router.get("/student", verifyToken, verifyRole("consumer-student"), (req, res) => {
  res.sendFile(path.resolve("views/dashboard-student.html"));
});

// Admin dashboard
router.get("/admin", verifyToken, verifyRole("admin"), (req, res) => {
  res.sendFile(path.resolve("views/dashboard-admin.html"));
});

// Wholesaler dashboard
router.get("/wholesaler", verifyToken, verifyRole("wholesaler"), (req, res) => {
  res.sendFile(path.resolve("views/dashboard-wholesaler.html"));
});

// Retailer dashboard
router.get("/retailer", verifyToken, verifyRole("retailer"), (req, res) => {
  res.sendFile(path.resolve("views/dashboard-retailer.html"));
});

export default router;

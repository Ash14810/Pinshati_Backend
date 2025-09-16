import express from "express";
import Post from "../models/Post.js";
import { verifyToken } from "../middleware/auth.js";
import multer from "multer";
import path from "path"

const router = express.Router();

// Storage settings
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // files stored in /uploads folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // unique file name
  }
});

const upload = multer({ storage });

// ✅ Handle file + text upload
router.post("/", verifyToken, upload.fields([
  { name: "design", maxCount: 1 },
  { name: "businessCard", maxCount: 1 }
]), async (req, res) => {
  try {
    const { title, name } = req.body;
    const design = req.files["design"] ? req.files["design"][0].filename : null;
    const businessCard = req.files["businessCard"] ? req.files["businessCard"][0].filename : null;

    const newPost = new Post({ title, name, design, businessCard });
    await newPost.save();

    res.status(201).json({ message: "Post created successfully", post: newPost });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create post" });
  }
});



export default router;
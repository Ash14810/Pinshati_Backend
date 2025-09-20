import express from "express";
import SellerPost from "../../models/seller/SellerPost.js";
import { verifyToken } from "../../middleware/auth.js";
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

    const newPost = new SellerPost({ title, name, design, businessCard });
    await newPost.save();

    res.status(201).json({ message: "Post created successfully", post: newPost });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create post" });
  }
});

// ✅ Get Single Post
router.get("/:id", verifyToken, async (req, res) => {
  try {
    const post = await SellerPost.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.status(200).json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch post" });
  }
});


// ✅ Get All Posts
router.get("/", verifyToken, async (req, res) => {
  try {
    const posts = await SellerPost.find().sort({ createdAt: -1 }); // newest first
    res.status(200).json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});

// ✅ Update Post
router.put("/:id", verifyToken, upload.fields([
  { name: "design", maxCount: 1 },
  { name: "businessCard", maxCount: 1 }
]), async (req, res) => {
  try {
    const { title, name } = req.body;

    // Build update object dynamically
    const updateData = { title, name };

    if (req.files["design"]) {
      updateData.design = req.files["design"][0].filename;
    }
    if (req.files["businessCard"]) {
      updateData.businessCard = req.files["businessCard"][0].filename;
    }

    const updatedPost = await SellerPost.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true } // return updated doc
    );

    if (!updatedPost) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.status(200).json({ message: "Post updated successfully", post: updatedPost });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update post" });
  }
});

// ✅ Delete Post
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const deletedPost = await SellerPost.findByIdAndDelete(req.params.id);

    if (!deletedPost) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete post" });
  }
});

export default router;
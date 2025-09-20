import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.js";
import dashboardRoutes from "./routes/dashboard.js";
import bodyParser from "body-parser";
import postRoutes from "./routes/post.js";
import postSellerRoutes from "./routes/seller/sellerPost.js";
import path from "path";

dotenv.config();

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true ,limit:"10mb"}));
app.use(express.json({limit:"10mb"}));
app.use(cookieParser());
app.use(express.static("public"));

// Routes
app.use("/auth", authRoutes);
app.use("/dashboard", dashboardRoutes);
app.use(bodyParser.json()); 
app.use("/api/posts", postRoutes); 
app.use("/api/seller/posts", postSellerRoutes); 
app.use("/uploads", express.static("uploads"));

// Serve home page
app.get("/", (req, res) => {
  res.sendFile(path.resolve("public/index.html"));
});

// DB connection
mongoose
  .connect(process.env.MONGO_URI, { dbName: "test" })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ DB Connection Error:", err));

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});

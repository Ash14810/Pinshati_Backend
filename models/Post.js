import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  name: { type: String, required: true },
  design: { type: String, required: true },
  businessCard: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Post", postSchema);


import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  companyName: { 
    type: String, 
    required: true, 
    trim: true 
  },
  registrationNumber: { 
    type: String, 
    required: true, 
    unique: true,
    uppercase: true, 
  },
  authorName: { 
    type: String, 
    required: true, 
    trim: true 
  },
  authorEmail: { 
    type: String, 
    required: true, 
    lowercase: true, 
    match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"]
  },
  authorContactNo: { 
    type: String, 
    required: true, 
    match: [/^[0-9]{10,15}$/, "Please provide a valid phone number"] 
    // 10–15 digit validation
  },
  authorPosition: { 
    type: String, 
    required: true, 
    trim: true 
  },
  productSample: { 
    type: String, 
    required: true 
    // This should ideally be a file URL or path → keep as String
  },
  websiteLink: { 
    type: String, 
    required: false, 
    match: [/^https?:\/\/.+/, "Please provide a valid URL"] 
  },
  licensing: { 
    type: String, 
    required: false,
    enum: ["licensed", "pending", "unlicensed"], 
    default: "pending" 
    // example enum, adjust as per your business logic
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

export default mongoose.model("SellerPost", postSchema);

import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    role: { type: String, required: true, enum: ["buyer", "seller", "wholesaler", "retailer"] }
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Register
export async function register(req, res) {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email, role });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already exists with this email & role" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ name, email, password: hashedPassword, role });
    await newUser.save();

    res.status(201).json({ success: true, message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
}

// Login
export async function login(req, res) {
  try {
    const { email, password, role } = req.body;

    const user = await User.findOne({ email, role });
    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid email or role" });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ success: false, message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE || "1h" }
    );

    let dashboardPath = `/dashboard/${user.role.replace("consumer-", "")}`;

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.json({ success: true, message: "Login successful", redirect: dashboardPath });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
}


//Logout
let blacklistedTokens = [];

export const logout = (req, res) => {
  try {
    const token = req.cookies.token; // ✅ get from cookie
    if (token) {
      blacklistedTokens.push(token);
    }

    res.clearCookie("token", {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
});
    res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (err) {
    res.status(500).json({ error: "Logout failed" });
  }
};

// Export blacklist so middleware can use it
export { blacklistedTokens };
import jwt from "jsonwebtoken";
import { blacklistedTokens } from "../controllers/authController.js";

export function verifyToken(req, res, next) {
  const token = req.cookies.token;
 console.log("Token from cookie:", token);
  console.log("Blacklisted tokens:", blacklistedTokens);
  if (!token) {
    return res.status(401).json({ success: false, message: "Access Denied" });
  }

    if (blacklistedTokens.includes(token)) {
    return res.status(401).json({ success: false, message: "Token is invalid (logged out)" });
  }
  
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
   return res.status(403).json({ success: false, message: "Invalid or Expired Token" });
  }
}

export function verifyRole(requiredRole) {
  return (req, res, next) => {
    if (!req.user || req.user.role !== requiredRole) {
      return res.status(403).json({ success: false, message: "Access denied" });
    }
    next();
  };
}


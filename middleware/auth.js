import jwt from "jsonwebtoken";

export function verifyToken(req, res, next) {
     const token = req.cookies.token;
  
  

  if (!token) {
    return res.status(401).send("Access Denied");
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).send("Invalid Token");
  }
}
export function verifyRole(requiredRole) {
  return (req, res, next) => {
    if (!req.user || req.user.role !== requiredRole) {
      return res.status(403).send("Access denied");
    }
    next();
  };
}

import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  try {
    const header = req.header("Authorization");
    if (!header) return res.status(401).json({ message: "No token, authorization denied" });

    const token = header.replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token invalid or expired" });
  }
};

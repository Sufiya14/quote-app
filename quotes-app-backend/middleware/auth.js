const jwt = require('jsonwebtoken');
const SECRET = "mysecret";

module.exports = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(403).json({ message: "No token" });

  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
};

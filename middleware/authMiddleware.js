const jwt = require('jsonwebtoken');
const User = require("../models/User")

const protect = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  // const token = req.cookies.accessToken;

  if (!token) return res.status(401).json({ message: 'No token, not authorized' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    // req.user = await User.findById(decoded.id);
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token invalid or expired' });
  }
};

module.exports = { protect };

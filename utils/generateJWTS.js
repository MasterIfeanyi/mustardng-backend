const jwt = require('jsonwebtoken');

// Shorter expiration for better security
const generateAccessToken = (userId) => {
    return jwt.sign({userId }, process.env.JWT_SECRET, { expiresIn: '15m' });
}

const generateRefreshToken = (userId) => {
  return jwt.sign({ userId }, process.env.REFRESH_SECRET, { expiresIn: '7d' });
};


module.exports = {
    generateRefreshToken,
    generateAccessToken
}
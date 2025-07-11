const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { generateRefreshToken, generateAccessToken } = require("../utils/generateJWTS");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Access token (short-lived)
    const accessToken = generateAccessToken(user_.id)

    // Refresh token (longer-lived)
    const refreshToken = generateRefreshToken(user._id);
    user.refreshToken = refreshToken;
    await user.save();

    // Set cookies with security flags
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      // Don't set domain unless you need cross-subdomain access
    };

    // Set access token cookie (short-lived)
    res.cookie('accessToken', accessToken, {
      ...cookieOptions,
      maxAge: 15 * 60 * 1000, // 15 minutes
    });

    // Set refresh token cookie (longer-lived but more secure)
    res.cookie('refreshToken', refreshToken, {
      ...cookieOptions,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // Send minimal user info if needed (don't include sensitive data)
    res.status(200).json({
      id: user._id,
      email: user.email,
      name: user.name // Only if needed
    });

  } catch (err) {
    console.error('Login error:', err); // Log for debugging
    res.status(500).json({ message: 'Internal server error' }); // Generic error message
  }
};

module.exports = { login };
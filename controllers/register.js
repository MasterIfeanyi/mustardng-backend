const User = require('../models/User');
const bcrypt = require('bcrypt');
const validator = require('validator');

const register = async (req, res) => {
  try {
    const { username, gender, email, dateOfBirth, employmentType, password } = req.body;

    // Input validation
    if (!username || !password || !email) {
      return res.status(400).json({ message: "Username, email and password are required." });
    }

    // Validate email format
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    // Validate password strength
    if (password.length < 8) {
      return res.status(400).json({ message: "Password must be at least 8 characters" });
    }

    // Check for duplicate username or email
    const existingUser = await User.findOne({ 
      $or: [{ username }, { email }] 
    }).lean().exec();

    if (existingUser) {
      if (existingUser.username === username) {
        return res.status(409).json({ message: "Username already exists" });
      }
      return res.status(409).json({ message: "Email already exists" });
    }

    // Hash password with proper salt rounds (10-12 is recommended)
    const hash = await bcrypt.hash(password, 12);

    // Create user without exposing sensitive data
    const user = await User.create({ 
      username, 
      gender, 
      email, 
      dateOfBirth, 
      employmentType, 
      password: hash 
    });

    // Return sanitized user data without password hash
    const userResponse = {
      id: user._id,
      username: user.username,
    };

    // DO NOT issue tokens during registration
    res.status(201).json({ 
      message: "Registration successful. Please log in.",
      user: userResponse 
    });

  } catch (err) {
    console.error('Registration error:', err); // Log for debugging
    
    // Generic error message to prevent information leakage
    res.status(500).json({ 
      message: "Registration failed due to server error" 
    });
  }
};

module.exports = { register };
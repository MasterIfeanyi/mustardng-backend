const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {generateRefreshToken} = require("../utils/generateJWTS")

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    // if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    // const isMatch = await bcrypt.compare(password, user.password);

    // if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    

    if(!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // refreshToken handler
    const refreshToken = generateRefreshToken(user._id);
    user.refreshToken = refreshToken;
    await user.save();

    res.cookie('accessToken', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict' }).send({ token });

    // res.json({ token });

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


module.exports = {login}
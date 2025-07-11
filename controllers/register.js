const User = require('../models/User');
const bcrypt = require('bcrypt');

const register = async (req, res) => {
  try {

    const { username, gender, email, dateOfBirth, employmentType, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ "message": "Username and password are required." });
    }

    // check for duplicate usernames in the db
    const duplicate = await User.findOne({ username }).exec();
    if (duplicate) return res.status(409).json({message: `User already exists`}); 

    const hash = await bcrypt.hash(password, 10);

    const user = await User.create({ username, gender, email, dateOfBirth, employmentType, password: hash });

    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).cookie('accessToken', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict' }).send({ token });

    // res.status(201).json({ message: `User registered ${user}` });

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {register}
const User = require('../models/User');
const bcrypt = require('bcrypt');

export const register = async (req, res) => {
  try {

    if (!username || !password) {
      return res.status(400).json({ "message": "Username and password are required." });
    }

    // check for duplicate usernames in the db
    const duplicate = await User.findOne({ username }).exec();

    // Conflict
    if (duplicate) return res.status(409).json({message: `Username already taken`}); 

    const { username, gender, email, dateOfBirth, employmentType, password } = req.body;

    const hash = await bcrypt.hash(password, 10);

    const user = await User.create({ username, gender, email, dateOfBirth, employmentType, password: hash });

    res.status(201).json({ message: `User registered ${user}` });

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


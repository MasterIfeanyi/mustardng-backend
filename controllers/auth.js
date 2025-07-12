const User = require('../models/User');
const bcrypt = require('bcrypt');

const auth = async (req, res) => {
    try {

        // find the user by their id and return all fields except the password field.
        const user = await User.findById(req.userId).select('-password');
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Return user data (excluding sensitive info)
        res.json({ 
            user: {
                id: user._id,
                email: user.email,
                name: user.name,
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

module.exports = {auth}
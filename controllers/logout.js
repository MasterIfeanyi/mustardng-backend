const logout = (req, res) => {

    const token = req.cookies.accessToken;
  
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        console.log(`User ${req.userId} logged out`);
        });
    }

    res.clearCookie('token');
    res.json({ message: 'Logged out successfully' });
};



module.exports = {logout}
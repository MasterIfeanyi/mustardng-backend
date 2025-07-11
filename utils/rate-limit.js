const rateLimit = require('express-rate-limit');

// Configure rate limiter for login endpoint
const loginRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 login requests per windowMs
  message: 'Too many login attempts, please try again later',
  handler: (req, res) => {
    res.status(429).json({
      message: 'Too many login attempts, please try again after 15 minutes'
    });
  },
  standardHeaders: true, // Return rate limit info in headers
  legacyHeaders: false, // Disable legacy headers
});


export default rateLimit
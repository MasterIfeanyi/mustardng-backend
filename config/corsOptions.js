const allowedOrigins = require("./allowedOrigins")

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
}


// const credentials = (req, res, next) => {
//   const origin = req.headers.origin;
//   if (allowedOrigins.includes(origin)) {
//     res.set({
//       "Access-Control-Allow-Origin": origin, // ==> new header
//       "Access-Control-Allow-Credentials": true
//     })
//   }
//   next();
// }

module.exports = corsOptions;
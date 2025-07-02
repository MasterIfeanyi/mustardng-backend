const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const authRoutes = require('./routes/auth');
const budgetRoutes = require('./routes/budget');
const { errorHandler } = require('./middleware/errorMiddleware');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;


// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan('dev'));


// Error Middleware
app.use(errorHandler);

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1); // Exit with failure
  }
};

startServer();

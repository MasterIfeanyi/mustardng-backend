const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  gender: { type: String },
  email: { type: String, required: true, unique: true },
  dateOfBirth: { type: Date },
  employmentType: { type: String },
  password: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);

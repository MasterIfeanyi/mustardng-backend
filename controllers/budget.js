const express = require('express');
const router = express.Router();
const Budget = require('../models/Budget');
const { protect } = require('../middleware/authMiddleware');

const createProudct = async (req, res) => {
  const { product, amount, date } = req.body;
  const newBudget = await Budget.create({
    userId: req.user.id,
    product,
    amount,
    date
  });
  res.status(201).json(newBudget);
};

const findUserProducts = async (req, res) => {
  const budgets = await Budget.find({ userId: req.user.id });
  res.json(budgets);
};

module.exports = {
    createProudct, findUserProducts
}
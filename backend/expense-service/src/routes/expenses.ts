import express from 'express';
import { Expense } from '../models/Expense';
import { auth } from '../middleware/auth';

const router = express.Router();

// Get all expenses for a user
router.get('/', auth, async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.user?.userId });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching expenses', error });
  }
});

// Create a new expense
router.post('/', auth, async (req, res) => {
  try {
    const { amount, description, category, date } = req.body;
    const expense = new Expense({
      userId: req.user?.userId,
      amount,
      description,
      category,
      date: date || new Date()
    });
    await expense.save();
    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({ message: 'Error creating expense', error });
  }
});

// Update an expense
router.put('/:id', auth, async (req, res) => {
  try {
    const { amount, description, category, date } = req.body;
    const expense = await Expense.findOneAndUpdate(
      { _id: req.params.id, userId: req.user?.userId },
      { amount, description, category, date },
      { new: true }
    );
    console.log(expense);
    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }
    res.json(expense);
  } catch (error) {
    res.status(500).json({ message: 'Error updating expense', error });
  }
});

// Delete an expense
router.delete('/:id', auth, async (req, res) => {
  try {
    const expense = await Expense.findOneAndDelete({
      _id: req.params.id,
      userId: req.user?.userId
    });
    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }
    res.json({ message: 'Expense deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting expense', error });
  }
});

export default router; 
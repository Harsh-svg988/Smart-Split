import express, { Request } from 'express';
import { Expense } from '../models/Expense';
import { auth } from '../middleware/auth';
import logger from '../utils/logger';

interface AuthRequest extends Request {
  user?: {
    userId: string;
  };
}

const router = express.Router();

router.get('/', auth, async (req: AuthRequest, res) => {
  try {
    const expenses = await Expense.find({ userId: req.user?.userId });
    logger.info(`Fetched ${expenses.length} expenses for user ${req.user?.userId}`);
    res.json(expenses);
  } catch (error) {
    logger.error('Error fetching expenses', error);
    res.status(500).json({ message: 'Error fetching expenses', error });
  }
});

router.post('/', auth, async (req: AuthRequest, res) => {
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
    logger.info(`Created expense for user ${req.user?.userId}: ${expense._id}`);
    res.status(201).json(expense);
  } catch (error) {
    logger.error('Error creating expense', error);
    res.status(500).json({ message: 'Error creating expense', error });
  }
});

router.put('/:id', auth, async (req: AuthRequest, res) => {
  try {
    const { amount, description, category, date } = req.body;
    const expense = await Expense.findOneAndUpdate(
      { _id: req.params.id, userId: req.user?.userId },
      { amount, description, category, date },
      { new: true }
    );
    if (!expense) {
      logger.warn(`Expense not found: ${req.params.id}`);
      return res.status(404).json({ message: 'Expense not found' });
    }
    logger.info(`Updated expense ${expense._id} for user ${req.user?.userId}`);
    res.json(expense);
  } catch (error) {
    logger.error('Error updating expense', error);
    res.status(500).json({ message: 'Error updating expense', error });
  }
});

router.delete('/:id', auth, async (req: AuthRequest, res) => {
  try {
    const expense = await Expense.findOneAndDelete({
      _id: req.params.id,
      userId: req.user?.userId
    });
    if (!expense) {
      logger.warn(`Expense not found to delete: ${req.params.id}`);
      return res.status(404).json({ message: 'Expense not found' });
    }
    logger.info(`Deleted expense ${req.params.id} for user ${req.user?.userId}`);
    res.json({ message: 'Expense deleted successfully' });
  } catch (error) {
    logger.error('Error deleting expense', error);
    res.status(500).json({ message: 'Error deleting expense', error });
  }
});

export default router;

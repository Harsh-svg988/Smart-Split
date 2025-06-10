import express from 'express';
import axios from 'axios';
import { auth } from '../middleware/auth';
import { Request } from 'express';

interface AuthRequest extends Request {
  user?: {
    userId: string;
  };
}

const router = express.Router();

// Get monthly expense summary
router.get('/monthly', auth, async (req: AuthRequest, res) => {
  console.log("hii");
  try {
    const { month, year } = req.query;
    const userId = req.user?.userId;

    // Call expense service to get expenses
    const response = await axios.get(
      `http://localhost:3002/api/expenses?userId=${userId}&month=${month}&year=${year}`,
      {
        headers: {
          Authorization: req.header('Authorization') || '',
        },
      }
    );

    const expenses = response.data;

    // Calculate summary
    const summary = expenses.reduce(
      (acc: any, expense: any) => {
        acc.total += expense.amount;
        acc.byCategory[expense.category] = (acc.byCategory[expense.category] || 0) + expense.amount;
        return acc;
      },
      { total: 0, byCategory: {} }
    );

    res.json(summary);
  } catch (error) {
    res.status(500).json({ message: 'Error generating report', error });
  }
});

// Get category-wise expense breakdown
router.get('/categories', auth, async (req: AuthRequest, res) => {
  try {
    const userId = req.user?.userId;
    const { startDate, endDate } = req.query;

    // Call expense service to get expenses
    const response = await axios.get(
      `http://localhost:3002/api/expenses?userId=${userId}&startDate=${startDate}&endDate=${endDate}`,
      {
        headers: {
          Authorization: req.header('Authorization') || '',
        },
      }
    );

    const expenses = response.data;

    // Calculate category breakdown
    const breakdown = expenses.reduce((acc: any, expense: any) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
      return acc;
    }, {});

    res.json(breakdown);
  } catch (error) {
    res.status(500).json({ message: 'Error generating category breakdown', error });
  }
});

export default router; 
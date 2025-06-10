import express from 'express';
import axios from 'axios';
import { auth } from '../middleware/auth';
import { Request } from 'express';
import dotenv from 'dotenv';

dotenv.config();

interface AuthRequest extends Request {
  user?: {
    userId: string;
  };
}

const router = express.Router();
const EXPENSE_SERVICE_URL = process.env.EXPENSE_SERVICE_URL || 'http://localhost:3002';

// Log the expense service URL on startup
console.log('Expense Service URL:', EXPENSE_SERVICE_URL);

// Get monthly expense summary
router.get('/monthly', auth, async (req: AuthRequest, res) => {
  try {
    const { month, year } = req.query;
    const userId = req.user?.userId;

    const requestUrl = `${EXPENSE_SERVICE_URL}/api/expenses?userId=${userId}&month=${month}&year=${year}`;
    console.log('Making request to:', requestUrl);

    // Call expense service to get expenses
    const response = await axios.get(
      requestUrl,
      {
        headers: {
          Authorization: req.header('Authorization') || '',
        },
        timeout: 5000, // Add timeout
      }
    );

    const expenses = response.data;
    console.log('Received expenses:', expenses.length);

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
  } catch (error: any) {
    console.error('Error in monthly report:', {
      message: error.message,
      code: error.code,
      url: error.config?.url,
      status: error.response?.status,
      data: error.response?.data
    });
    res.status(500).json({ message: 'Error generating report', error });
  }
});

// Get category-wise expense breakdown
router.get('/categories', auth, async (req: AuthRequest, res) => {
  try {
    const userId = req.user?.userId;
    const { startDate, endDate } = req.query;

    const requestUrl = `${EXPENSE_SERVICE_URL}/api/expenses?userId=${userId}&startDate=${startDate}&endDate=${endDate}`;
    console.log('Making request to:', requestUrl);

    // Call expense service to get expenses
    const response = await axios.get(
      requestUrl,
      {
        headers: {
          Authorization: req.header('Authorization') || '',
        },
        timeout: 5000, // Add timeout
      }
    );

    const expenses = response.data;
    console.log('Received expenses:', expenses.length);

    // Calculate category breakdown
    const breakdown = expenses.reduce((acc: any, expense: any) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
      return acc;
    }, {});

    res.json(breakdown);
  } catch (error: any) {
    console.error('Error in category breakdown:', {
      message: error.message,
      code: error.code,
      url: error.config?.url,
      status: error.response?.status,
      data: error.response?.data
    });
    res.status(500).json({ message: 'Error generating category breakdown', error });
  }
});

export default router; 
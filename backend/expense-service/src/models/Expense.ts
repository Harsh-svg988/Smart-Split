import mongoose from 'mongoose';

export interface IExpense extends mongoose.Document {
  userId: string;
  amount: number;
  description: string;
  category: string;
  date: Date;
  createdAt: Date;
}

const expenseSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    ref: 'User'
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Food', 'Transport', 'Housing', 'Entertainment', 'Shopping', 'Utilities', 'Other']
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export const Expense = mongoose.model<IExpense>('Expense', expenseSchema); 
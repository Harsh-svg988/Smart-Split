"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Expense = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const expenseSchema = new mongoose_1.default.Schema({
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
exports.Expense = mongoose_1.default.model('Expense', expenseSchema);

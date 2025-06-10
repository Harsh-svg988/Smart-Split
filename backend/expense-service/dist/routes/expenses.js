"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Expense_1 = require("../models/Expense");
const auth_1 = require("../middleware/auth");
const logger_1 = __importDefault(require("../utils/logger"));
const router = express_1.default.Router();
router.get('/', auth_1.auth, async (req, res) => {
    var _a, _b;
    try {
        const expenses = await Expense_1.Expense.find({ userId: (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId });
        logger_1.default.info(`Fetched ${expenses.length} expenses for user ${(_b = req.user) === null || _b === void 0 ? void 0 : _b.userId}`);
        res.json(expenses);
    }
    catch (error) {
        logger_1.default.error('Error fetching expenses', error);
        res.status(500).json({ message: 'Error fetching expenses', error });
    }
});
router.post('/', auth_1.auth, async (req, res) => {
    var _a, _b;
    try {
        const { amount, description, category, date } = req.body;
        const expense = new Expense_1.Expense({
            userId: (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId,
            amount,
            description,
            category,
            date: date || new Date()
        });
        await expense.save();
        logger_1.default.info(`Created expense for user ${(_b = req.user) === null || _b === void 0 ? void 0 : _b.userId}: ${expense._id}`);
        res.status(201).json(expense);
    }
    catch (error) {
        logger_1.default.error('Error creating expense', error);
        res.status(500).json({ message: 'Error creating expense', error });
    }
});
router.put('/:id', auth_1.auth, async (req, res) => {
    var _a, _b;
    try {
        const { amount, description, category, date } = req.body;
        const expense = await Expense_1.Expense.findOneAndUpdate({ _id: req.params.id, userId: (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId }, { amount, description, category, date }, { new: true });
        if (!expense) {
            logger_1.default.warn(`Expense not found: ${req.params.id}`);
            return res.status(404).json({ message: 'Expense not found' });
        }
        logger_1.default.info(`Updated expense ${expense._id} for user ${(_b = req.user) === null || _b === void 0 ? void 0 : _b.userId}`);
        res.json(expense);
    }
    catch (error) {
        logger_1.default.error('Error updating expense', error);
        res.status(500).json({ message: 'Error updating expense', error });
    }
});
router.delete('/:id', auth_1.auth, async (req, res) => {
    var _a, _b;
    try {
        const expense = await Expense_1.Expense.findOneAndDelete({
            _id: req.params.id,
            userId: (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId
        });
        if (!expense) {
            logger_1.default.warn(`Expense not found to delete: ${req.params.id}`);
            return res.status(404).json({ message: 'Expense not found' });
        }
        logger_1.default.info(`Deleted expense ${req.params.id} for user ${(_b = req.user) === null || _b === void 0 ? void 0 : _b.userId}`);
        res.json({ message: 'Expense deleted successfully' });
    }
    catch (error) {
        logger_1.default.error('Error deleting expense', error);
        res.status(500).json({ message: 'Error deleting expense', error });
    }
});
exports.default = router;

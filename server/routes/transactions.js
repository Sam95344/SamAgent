import express from 'express';
import Transaction from '../models/Transaction.js';
import { authMiddleware } from './auth.js';

const router = express.Router();

// All routes require authentication
router.use(authMiddleware);

// Get all transactions for user
router.get('/', async (req, res) => {
    try {
        const transactions = await Transaction.find({ userId: req.user._id })
            .sort({ date: -1 });
        res.json(transactions);
    } catch (error) {
        console.error('Get transactions error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Add transaction
router.post('/', async (req, res) => {
    try {
        const { type, amount, category, description, date } = req.body;

        const transaction = new Transaction({
            userId: req.user._id,
            type,
            amount,
            category,
            description,
            date: date || new Date()
        });

        await transaction.save();

        res.status(201).json({
            message: 'Transaction added',
            transaction
        });
    } catch (error) {
        console.error('Add transaction error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Delete transaction
router.delete('/:id', async (req, res) => {
    try {
        const transaction = await Transaction.findOneAndDelete({
            _id: req.params.id,
            userId: req.user._id
        });

        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }

        res.json({ message: 'Transaction deleted' });
    } catch (error) {
        console.error('Delete transaction error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get summary
router.get('/summary', async (req, res) => {
    try {
        const transactions = await Transaction.find({ userId: req.user._id });

        const income = transactions
            .filter(t => t.type === 'income')
            .reduce((acc, t) => acc + t.amount, 0);

        const expense = transactions
            .filter(t => t.type === 'expense')
            .reduce((acc, t) => acc + t.amount, 0);

        res.json({
            income,
            expense,
            balance: income - expense,
            totalTransactions: transactions.length
        });
    } catch (error) {
        console.error('Get summary error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;

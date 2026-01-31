import { createContext, useContext, useState, useEffect } from 'react';
import { generateId } from '../lib/utils';

const FinanceContext = createContext();

const MOCK_TRANSACTIONS = [
    { id: '1', type: 'income', amount: 5000, category: 'Salary', date: '2023-10-01', description: 'October Salary' },
    { id: '2', type: 'expense', amount: 1200, category: 'Rent', date: '2023-10-02', description: 'Monthly Rent' },
    { id: '3', type: 'expense', amount: 150, category: 'Food', date: '2023-10-03', description: 'Groceries' },
    { id: '4', type: 'expense', amount: 60, category: 'Transport', date: '2023-10-04', description: 'Uber' },
];

export function FinanceProvider({ children }) {
    const [transactions, setTransactions] = useState(() => {
        const saved = localStorage.getItem('finance_transactions');
        return saved ? JSON.parse(saved) : MOCK_TRANSACTIONS;
    });

    const [goals, setGoals] = useState(() => {
        const saved = localStorage.getItem('finance_goals');
        return saved ? JSON.parse(saved) : [];
    });

    const [notifications, setNotifications] = useState(() => {
        const saved = localStorage.getItem('finance_notifications');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('finance_transactions', JSON.stringify(transactions));
    }, [transactions]);

    useEffect(() => {
        localStorage.setItem('finance_goals', JSON.stringify(goals));
    }, [goals]);

    useEffect(() => {
        localStorage.setItem('finance_notifications', JSON.stringify(notifications));
    }, [notifications]);

    // Check for budget and goal alerts whenever transactions or goals change
    useEffect(() => {
        const { income, expense } = getSummary();
        const settings = JSON.parse(localStorage.getItem('finance_settings') || '{}');
        const budgetEnabled = settings.notifications?.budgetAlerts !== false;
        const goalEnabled = settings.notifications?.goalReminders !== false;

        const newNotifications = [];

        // 1. Budget Alerts (if expense > 80% of income or dynamic budget)
        if (budgetEnabled && income > 0 && expense > (income * 0.8)) {
            const budgetMsg = `Warning: You have spent ${((expense / income) * 100).toFixed(0)}% of your income.`;
            if (!notifications.some(n => n.message === budgetMsg && !n.read)) {
                newNotifications.push({
                    id: generateId(),
                    type: 'budget',
                    title: 'Budget Alert',
                    message: budgetMsg,
                    date: new Date().toISOString(),
                    read: false
                });
            }
        }

        // 2. Goal Progress Reminders
        if (goalEnabled) {
            goals.forEach(goal => {
                const progress = (goal.currentAmount / goal.targetAmount) * 100;
                if (progress >= 100) {
                    const goalMsg = `Congratulations! You've reached your goal: ${goal.title}`;
                    if (!notifications.some(n => n.message === goalMsg && !n.read)) {
                        newNotifications.push({
                            id: generateId(),
                            type: 'goal',
                            title: 'Goal Reached! 🎉',
                            message: goalMsg,
                            date: new Date().toISOString(),
                            read: false
                        });
                    }
                } else if (progress >= 80) {
                    const goalMsg = `Almost there! You are at ${progress.toFixed(0)}% of your goal: ${goal.title}`;
                    if (!notifications.some(n => n.message === goalMsg && !n.read)) {
                        newNotifications.push({
                            id: generateId(),
                            type: 'goal',
                            title: 'Goal Reminder',
                            message: goalMsg,
                            date: new Date().toISOString(),
                            read: false
                        });
                    }
                }
            });
        }

        // 3. Weekly Report Simulation (if enabled and 7 days passed since last report)
        const weeklyEnabled = settings.notifications?.weeklyReport !== false;
        const lastReportDate = localStorage.getItem('finance_last_report_date');
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        if (weeklyEnabled && (!lastReportDate || new Date(lastReportDate) < sevenDaysAgo)) {
            const reportMsg = "Your weekly spending summary is ready! Check your insights for the past 7 days.";
            if (!notifications.some(n => n.message === reportMsg && !n.read)) {
                newNotifications.push({
                    id: generateId(),
                    type: 'report',
                    title: 'Weekly Insights 📊',
                    message: reportMsg,
                    date: new Date().toISOString(),
                    read: false
                });
                localStorage.setItem('finance_last_report_date', new Date().toISOString());
            }
        }

        if (newNotifications.length > 0) {
            setNotifications(prev => [...newNotifications, ...prev]);
        }
    }, [transactions, goals]);

    const addTransaction = (transaction) => {
        setTransactions(prev => [{ ...transaction, id: generateId(), date: new Date().toISOString().split('T')[0] }, ...prev]);
    };

    const removeTransaction = (id) => {
        setTransactions(prev => prev.filter(t => t.id !== id));
    };

    const markAsRead = (id) => {
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    };

    const clearNotifications = () => {
        setNotifications([]);
    };

    const getSummary = () => {
        const income = transactions.filter(t => t.type === 'income').reduce((acc, t) => acc + Number(t.amount), 0);
        const expense = transactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + Number(t.amount), 0);
        const balance = income - expense;
        return { income, expense, balance };
    };

    return (
        <FinanceContext.Provider value={{
            transactions,
            addTransaction,
            removeTransaction,
            getSummary,
            goals,
            setGoals,
            notifications,
            markAsRead,
            clearNotifications
        }}>
            {children}
        </FinanceContext.Provider>
    );
}

export function useFinance() {
    return useContext(FinanceContext);
}

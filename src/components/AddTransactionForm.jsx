import { useState } from 'react';
import { useFinance } from '../context/FinanceContext';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

const CATEGORIES = {
    income: ['Salary', 'Freelance', 'Business', 'Investment', 'Gift', 'Other'],
    expense: ['Housing', 'Food', 'Transport', 'Utilities', 'Entertainment', 'Shopping', 'Health', 'Education', 'Travel', 'Other']
};

export function AddTransactionForm({ onClose }) {
    const { addTransaction } = useFinance();
    const [type, setType] = useState('expense');
    const [formData, setFormData] = useState({
        amount: '',
        category: '',
        date: new Date().toISOString().split('T')[0],
        description: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        addTransaction({
            ...formData,
            type,
            amount: Number(formData.amount)
        });
        onClose();
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* Type Toggle */}
            <div style={{
                display: 'flex',
                padding: '4px',
                background: 'rgba(10, 14, 26, 0.8)',
                borderRadius: '12px',
                marginBottom: '1.5rem',
                border: '1px solid rgba(148, 163, 184, 0.1)'
            }}>
                <button
                    type="button"
                    onClick={() => setType('income')}
                    style={{
                        flex: 1,
                        padding: '0.75rem',
                        borderRadius: '10px',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem',
                        fontWeight: 600,
                        fontSize: '0.875rem',
                        transition: 'all 0.2s',
                        background: type === 'income'
                            ? 'linear-gradient(135deg, #10b981, #059669)'
                            : 'transparent',
                        color: type === 'income' ? 'white' : '#64748b',
                        boxShadow: type === 'income' ? '0 4px 15px -3px rgba(16, 185, 129, 0.4)' : 'none'
                    }}
                >
                    <ArrowUpRight size={16} />
                    Income
                </button>
                <button
                    type="button"
                    onClick={() => setType('expense')}
                    style={{
                        flex: 1,
                        padding: '0.75rem',
                        borderRadius: '10px',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem',
                        fontWeight: 600,
                        fontSize: '0.875rem',
                        transition: 'all 0.2s',
                        background: type === 'expense'
                            ? 'linear-gradient(135deg, #f43f5e, #e11d48)'
                            : 'transparent',
                        color: type === 'expense' ? 'white' : '#64748b',
                        boxShadow: type === 'expense' ? '0 4px 15px -3px rgba(244, 63, 94, 0.4)' : 'none'
                    }}
                >
                    <ArrowDownRight size={16} />
                    Expense
                </button>
            </div>

            {/* Amount */}
            <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: '#94a3b8', marginBottom: '0.5rem' }}>
                    Amount
                </label>
                <div style={{ position: 'relative' }}>
                    <span style={{
                        position: 'absolute',
                        left: '1rem',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: '#64748b',
                        fontSize: '1.125rem',
                        fontWeight: 600
                    }}>$</span>
                    <input
                        type="number"
                        required
                        min="0"
                        step="0.01"
                        placeholder="0.00"
                        value={formData.amount}
                        onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                        style={{
                            paddingLeft: '2.5rem',
                            fontSize: '1.125rem',
                            fontWeight: 600
                        }}
                        autoFocus
                    />
                </div>
            </div>

            {/* Category */}
            <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: '#94a3b8', marginBottom: '0.5rem' }}>
                    Category
                </label>
                <select
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                    <option value="">Select a category</option>
                    {CATEGORIES[type].map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
            </div>

            {/* Date & Description Row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: '#94a3b8', marginBottom: '0.5rem' }}>
                        Date
                    </label>
                    <input
                        type="date"
                        required
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    />
                </div>
                <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: '#94a3b8', marginBottom: '0.5rem' }}>
                        Description
                    </label>
                    <input
                        type="text"
                        placeholder="Optional note"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                </div>
            </div>

            {/* Buttons */}
            <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button
                    type="button"
                    onClick={onClose}
                    className="btn btn-ghost"
                    style={{ flex: 1 }}
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ flex: 1 }}
                >
                    Save Transaction
                </button>
            </div>
        </form>
    );
}

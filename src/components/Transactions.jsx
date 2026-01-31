import { useState } from 'react';
import { useFinance } from '../context/FinanceContext';
import { formatCurrency } from '../lib/utils';
import { Modal } from './Modal';
import { AddTransactionForm } from './AddTransactionForm';
import { Plus, Search, Filter, ArrowUpRight, ArrowDownRight, Trash2, Calendar } from 'lucide-react';

export function Transactions({ onNavigate }) {
    const { transactions, removeTransaction } = useFinance();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('all');
    const [filterCategory, setFilterCategory] = useState('all');

    // Get unique categories
    const categories = [...new Set(transactions.map(t => t.category))];

    // Filter transactions
    const filteredTransactions = transactions.filter(t => {
        const matchesSearch = t.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            t.category.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = filterType === 'all' || t.type === filterType;
        const matchesCategory = filterCategory === 'all' || t.category === filterCategory;
        return matchesSearch && matchesType && matchesCategory;
    });

    // Summary stats
    const totalIncome = filteredTransactions.filter(t => t.type === 'income').reduce((acc, t) => acc + Number(t.amount), 0);
    const totalExpense = filteredTransactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + Number(t.amount), 0);

    return (
        <div className="animate-in">
            {/* Header */}
            <header className="dashboard-header-modern">
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontSize: '0.8rem', color: '#64748b' }}>
                        <span>App</span>
                        <span>/</span>
                        <span style={{ color: '#a78bfa', fontWeight: 500 }}>Transactions</span>
                    </div>
                    <h2 style={{ marginBottom: '0.25rem' }}>Transactions</h2>
                    <p className="text-slate-400 text-sm">Manage and track all your financial activities</p>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button className="btn btn-ghost" style={{ gap: '0.5rem', border: '1px solid rgba(255,255,255,0.05)' }}>
                        <ArrowUpRight size={18} />
                        Export CSV
                    </button>
                    <button className="btn btn-primary" onClick={() => setIsModalOpen(true)} style={{ gap: '0.5rem' }}>
                        <Plus size={18} />
                        Add Transaction
                    </button>
                </div>
            </header>

            {/* Summary Cards */}
            <div className="grid grid-cols-3 gap-4" style={{ marginBottom: '1.5rem' }}>
                <div className="glass-card" style={{ padding: '1rem 1.25rem' }}>
                    <div className="text-sm text-slate-400" style={{ marginBottom: '0.25rem' }}>Total Transactions</div>
                    <div className="text-2xl font-bold">{filteredTransactions.length}</div>
                </div>
                <div className="glass-card" style={{ padding: '1rem 1.25rem' }}>
                    <div className="text-sm text-slate-400" style={{ marginBottom: '0.25rem' }}>Income</div>
                    <div className="text-2xl font-bold text-emerald-400">{formatCurrency(totalIncome)}</div>
                </div>
                <div className="glass-card" style={{ padding: '1rem 1.25rem' }}>
                    <div className="text-sm text-slate-400" style={{ marginBottom: '0.25rem' }}>Expenses</div>
                    <div className="text-2xl font-bold text-rose-400">{formatCurrency(totalExpense)}</div>
                </div>
            </div>

            {/* Filters */}
            <div className="glass-card" style={{ padding: '1rem', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    {/* Search */}
                    <div style={{ flex: '1', minWidth: '200px', position: 'relative' }}>
                        <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
                        <input
                            type="text"
                            placeholder="Search transactions..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{ paddingLeft: '2.75rem' }}
                        />
                    </div>

                    {/* Type Filter */}
                    <select
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                        style={{ width: '150px' }}
                    >
                        <option value="all">All Types</option>
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                    </select>

                    {/* Category Filter */}
                    <select
                        value={filterCategory}
                        onChange={(e) => setFilterCategory(e.target.value)}
                        style={{ width: '180px' }}
                    >
                        <option value="all">All Categories</option>
                        {categories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Transactions List */}
            <div className="glass-card" style={{ padding: '0', overflow: 'hidden' }}>
                {/* Header Row */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 120px 150px 120px 60px',
                    gap: '1rem',
                    padding: '1rem 1.5rem',
                    background: 'rgba(0,0,0,0.2)',
                    borderBottom: '1px solid rgba(148, 163, 184, 0.1)',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    color: '#64748b',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                }}>
                    <div>Description</div>
                    <div>Category</div>
                    <div>Date</div>
                    <div style={{ textAlign: 'right' }}>Amount</div>
                    <div></div>
                </div>

                {/* Transaction Rows */}
                {filteredTransactions.length === 0 ? (
                    <div style={{ padding: '3rem', textAlign: 'center', color: '#64748b' }}>
                        No transactions found
                    </div>
                ) : (
                    filteredTransactions.map((t, index) => (
                        <div
                            key={t.id}
                            className="animate-in"
                            style={{
                                display: 'grid',
                                gridTemplateColumns: '1fr 120px 150px 120px 60px',
                                gap: '1rem',
                                padding: '1rem 1.5rem',
                                alignItems: 'center',
                                borderBottom: '1px solid rgba(148, 163, 184, 0.05)',
                                transition: 'all 0.2s',
                                animationDelay: `${index * 0.03}s`
                            }}
                            onMouseOver={(e) => e.currentTarget.style.background = 'rgba(139, 92, 246, 0.05)'}
                            onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
                        >
                            {/* Description */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <div style={{
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '10px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    background: t.type === 'income' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(244, 63, 94, 0.15)',
                                    color: t.type === 'income' ? '#34d399' : '#fb7185'
                                }}>
                                    {t.type === 'income' ? <ArrowUpRight size={18} /> : <ArrowDownRight size={18} />}
                                </div>
                                <div>
                                    <div className="font-medium">{t.description || t.category}</div>
                                    <div className="text-xs text-slate-500">{t.type === 'income' ? 'Income' : 'Expense'}</div>
                                </div>
                            </div>

                            {/* Category */}
                            <div>
                                <span style={{
                                    padding: '0.25rem 0.625rem',
                                    borderRadius: '9999px',
                                    background: 'rgba(139, 92, 246, 0.1)',
                                    color: '#a78bfa',
                                    fontSize: '0.75rem',
                                    fontWeight: 500
                                }}>
                                    {t.category}
                                </span>
                            </div>

                            {/* Date */}
                            <div className="text-slate-400 text-sm" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Calendar size={14} />
                                {t.date}
                            </div>

                            {/* Amount */}
                            <div style={{ textAlign: 'right' }}>
                                <span className={`font-semibold ${t.type === 'income' ? 'text-emerald-400' : 'text-slate-200'}`}>
                                    {t.type === 'expense' ? '-' : '+'}{formatCurrency(t.amount)}
                                </span>
                            </div>

                            {/* Actions */}
                            <div style={{ textAlign: 'center' }}>
                                <button
                                    onClick={() => removeTransaction(t.id)}
                                    style={{
                                        width: '32px',
                                        height: '32px',
                                        borderRadius: '8px',
                                        border: 'none',
                                        background: 'transparent',
                                        color: '#64748b',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        transition: 'all 0.2s'
                                    }}
                                    onMouseOver={(e) => {
                                        e.currentTarget.style.background = 'rgba(244, 63, 94, 0.1)';
                                        e.currentTarget.style.color = '#fb7185';
                                    }}
                                    onMouseOut={(e) => {
                                        e.currentTarget.style.background = 'transparent';
                                        e.currentTarget.style.color = '#64748b';
                                    }}
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add Transaction">
                <AddTransactionForm onClose={() => setIsModalOpen(false)} />
            </Modal>
        </div>
    );
}

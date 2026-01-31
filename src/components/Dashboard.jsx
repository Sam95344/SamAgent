import { useState } from 'react';
import { useFinance } from '../context/FinanceContext';
import { formatCurrency } from '../lib/utils';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Modal } from './Modal';
import { AddTransactionForm } from './AddTransactionForm';
import { TrendingUp, TrendingDown, Wallet, ArrowUpRight, ArrowDownRight, Plus, Sparkles, Calendar, AlertTriangle, Target } from 'lucide-react';

const CATEGORY_COLORS = ['#8b5cf6', '#06b6d4', '#f472b6', '#10b981', '#f59e0b', '#ef4444'];

export function Dashboard({ userName, onNavigate }) {
    const { getSummary, transactions, notifications } = useFinance();
    const { income, expense, balance } = getSummary();
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Prepare chart data
    const chartData = transactions
        .slice()
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .map(t => ({
            date: t.date,
            amount: t.type === 'expense' ? -t.amount : t.amount,
            type: t.type
        }));

    // Prepare category data for pie chart
    const categoryData = transactions
        .filter(t => t.type === 'expense')
        .reduce((acc, t) => {
            const existing = acc.find(item => item.name === t.category);
            if (existing) {
                existing.value += Number(t.amount);
            } else {
                acc.push({ name: t.category, value: Number(t.amount) });
            }
            return acc;
        }, []);

    return (
        <div className="animate-in" style={{ animationDelay: '0.1s' }}>
            {/* Header */}
            <header className="dashboard-header-modern">
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontSize: '0.8rem', color: '#64748b' }}>
                        <span>App</span>
                        <span>/</span>
                        <span style={{ color: '#a78bfa', fontWeight: 500 }}>Dashboard</span>
                    </div>
                    <h2 style={{ marginBottom: '0.25rem', background: 'linear-gradient(135deg, #f8fafc, #94a3b8)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                        Financial Overview
                    </h2>
                    <p className="text-slate-400 text-sm">Welcome back! Here's your summary for today.</p>
                </div>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        padding: '0.625rem 1rem',
                        background: 'rgba(255,255,255,0.03)',
                        borderRadius: '12px',
                        border: '1px solid rgba(255,255,255,0.05)',
                        fontSize: '0.875rem',
                        color: '#94a3b8',
                        cursor: 'pointer'
                    }}>
                        <Calendar size={16} />
                        <span>Jan 1, 2024 - Jan 31, 2024</span>
                    </div>
                    <button
                        className="btn btn-primary"
                        onClick={() => setIsModalOpen(true)}
                        style={{ gap: '0.5rem' }}
                    >
                        <Plus size={18} />
                        Add Transaction
                    </button>
                </div>
            </header>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-6" style={{ marginBottom: '2rem' }}>
                <StatCard
                    title="Total Balance"
                    amount={formatCurrency(balance)}
                    trend="+12.5%"
                    trendUp={true}
                    icon={<Wallet size={20} />}
                    color="violet"
                />
                <StatCard
                    title="Total Income"
                    amount={formatCurrency(income)}
                    trend="+8.2%"
                    trendUp={true}
                    icon={<ArrowUpRight size={20} />}
                    color="emerald"
                />
                <StatCard
                    title="Total Expenses"
                    amount={formatCurrency(expense)}
                    trend="-3.1%"
                    trendUp={false}
                    icon={<ArrowDownRight size={20} />}
                    color="rose"
                />
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-2 gap-6" style={{ marginBottom: '2rem' }}>
                {/* Area Chart */}
                <div className="glass-card" style={{ padding: '1.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                        <h3 className="text-lg font-semibold">Financial Activity</h3>
                        <div className="badge badge-success">Live</div>
                    </div>
                    <div style={{ height: '280px' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData}>
                                <defs>
                                    <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4} />
                                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.1)" vertical={false} />
                                <XAxis dataKey="date" stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
                                <YAxis stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value} `} />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: 'rgba(17, 24, 39, 0.95)',
                                        borderColor: 'rgba(139, 92, 246, 0.3)',
                                        borderRadius: '12px',
                                        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.4)'
                                    }}
                                    itemStyle={{ color: '#a78bfa' }}
                                    labelStyle={{ color: '#f8fafc' }}
                                />
                                <Area type="monotone" dataKey="amount" stroke="#8b5cf6" strokeWidth={2} fillOpacity={1} fill="url(#colorAmount)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Pie Chart */}
                <div className="glass-card" style={{ padding: '1.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                        <h3 className="text-lg font-semibold">Spending by Category</h3>
                    </div>
                    <div style={{ height: '280px', display: 'flex', alignItems: 'center' }}>
                        <div style={{ width: '50%', height: '100%' }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={categoryData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={90}
                                        paddingAngle={4}
                                        dataKey="value"
                                    >
                                        {categoryData.map((entry, index) => (
                                            <Cell key={`cell - ${index} `} fill={CATEGORY_COLORS[index % CATEGORY_COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: 'rgba(17, 24, 39, 0.95)',
                                            borderColor: 'rgba(139, 92, 246, 0.3)',
                                            borderRadius: '12px'
                                        }}
                                        formatter={(value) => formatCurrency(value)}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div style={{ width: '50%', paddingLeft: '1rem' }}>
                            {categoryData.slice(0, 4).map((cat, index) => (
                                <div key={cat.name} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                                    <div style={{
                                        width: '10px',
                                        height: '10px',
                                        borderRadius: '50%',
                                        backgroundColor: CATEGORY_COLORS[index % CATEGORY_COLORS.length]
                                    }} />
                                    <span className="text-sm text-slate-400" style={{ flex: 1 }}>{cat.name}</span>
                                    <span className="text-sm font-medium">{formatCurrency(cat.value)}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Alerts & Transactions Row */}
            <div className="grid grid-cols-3 gap-6" style={{ marginBottom: '2rem' }}>
                {/* Recent Alerts (1/3 width) */}
                <div className="glass-card" style={{ padding: '1.5rem', gridColumn: 'span 1' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                        <h3 className="text-lg font-semibold">Recent Alerts</h3>
                        <div style={{ padding: '0.25rem 0.75rem', borderRadius: '12px', background: 'rgba(139, 92, 246, 0.1)', color: '#a78bfa', fontSize: '0.75rem', fontWeight: 600 }}>
                            {notifications.filter(n => !n.read).length} New
                        </div>
                    </div>
                    <div className="space-y-4">
                        {notifications.length === 0 ? (
                            <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                                <p style={{ color: '#64748b', fontSize: '0.875rem' }}>No recent alerts</p>
                            </div>
                        ) : (
                            notifications.slice(0, 3).map((n) => (
                                <div key={n.id} style={{ display: 'flex', gap: '1rem', padding: '0.75rem', borderRadius: '12px', background: n.read ? 'transparent' : 'rgba(255,255,255,0.02)', border: n.read ? '1px solid transparent' : '1px solid rgba(139, 92, 246, 0.1)' }}>
                                    <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(255,255,255,0.03)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        {n.type === 'budget' ? <AlertTriangle size={16} className="text-rose-400" /> : <Target size={16} className="text-violet-400" />}
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#f8fafc', marginBottom: '0.125rem' }}>{n.title}</div>
                                        <p style={{ margin: 0, fontSize: '0.75rem', color: '#94a3b8', lineHeight: 1.4 }}>{n.message}</p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Recent Transactions (2/3 width) */}
                <div className="glass-card" style={{ padding: '1.5rem', gridColumn: 'span 2' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                        <h3 className="text-lg font-semibold">Recent Transactions</h3>
                        <button className="btn btn-ghost" style={{ padding: '0.5rem 1rem', fontSize: '0.8125rem' }}>
                            View All
                        </button>
                    </div>
                    <div className="space-y-2">
                        {transactions.slice(0, 4).map((t, index) => (
                            <div
                                key={t.id}
                                className="transaction-item animate-in"
                                style={{ animationDelay: `${index * 0.05}s` }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <div className={`transaction-icon ${t.type}`}>
                                        {t.type === 'income' ? <ArrowUpRight size={20} /> : <ArrowDownRight size={20} />}
                                    </div>
                                    <div>
                                        <div className="font-medium text-slate-100">{t.description || t.category}</div>
                                        <div className="text-xs text-slate-500">{t.date} • {t.category}</div>
                                    </div>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <div className={`font-semibold ${t.type === 'income' ? 'text-emerald-400' : 'text-slate-200'}`}>
                                        {t.type === 'expense' ? '-' : '+'}{formatCurrency(t.amount)}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Add Transaction"
            >
                <AddTransactionForm onClose={() => setIsModalOpen(false)} />
            </Modal>
        </div>
    );
}

function StatCard({ title, amount, trend, trendUp, icon, color }) {
    const colorMap = {
        violet: { bg: 'rgba(139, 92, 246, 0.15)', text: '#a78bfa', glow: 'rgba(139, 92, 246, 0.4)' },
        emerald: { bg: 'rgba(16, 185, 129, 0.15)', text: '#34d399', glow: 'rgba(16, 185, 129, 0.4)' },
        rose: { bg: 'rgba(244, 63, 94, 0.15)', text: '#fb7185', glow: 'rgba(244, 63, 94, 0.4)' },
    };
    const colors = colorMap[color] || colorMap.violet;

    return (
        <div className="stat-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '12px',
                    background: colors.bg,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: colors.text
                }}>
                    {icon}
                </div>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                    padding: '0.25rem 0.625rem',
                    borderRadius: '20px',
                    background: trendUp ? 'rgba(16, 185, 129, 0.1)' : 'rgba(244, 63, 94, 0.1)',
                    color: trendUp ? '#34d399' : '#fb7185',
                    fontSize: '0.75rem',
                    fontWeight: 600
                }}>
                    {trendUp ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                    {trend}
                </div>
            </div>
            <div className="text-slate-400 text-sm" style={{ marginBottom: '0.25rem' }}>{title}</div>
            <div style={{ fontSize: '1.75rem', fontWeight: 700, color: '#f8fafc', letterSpacing: '-0.02em' }}>{amount}</div>
        </div>
    );
}

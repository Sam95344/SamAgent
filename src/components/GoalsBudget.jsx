import { useState } from 'react';
import { useFinance } from '../context/FinanceContext';
import { formatCurrency, generateId } from '../lib/utils';
import { Modal } from './Modal';
import { Plus, Target, TrendingUp, Calendar, Trash2, CheckCircle, Sparkles, PiggyBank, Wallet, Trophy, ArrowUpRight, Flame } from 'lucide-react';

export function GoalsBudget({ onNavigate }) {
    const { getSummary, goals, setGoals } = useFinance();
    const { income, expense } = getSummary();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('goals'); // 'goals' or 'budget'

    const monthlySavings = income - expense;
    const savingsRate = income > 0 ? (monthlySavings / income) * 100 : 0;
    const completedGoals = goals.filter(g => g.currentAmount >= g.targetAmount).length;
    const totalGoalValue = goals.reduce((acc, g) => acc + g.targetAmount, 0);
    const totalSaved = goals.reduce((acc, g) => acc + g.currentAmount, 0);

    const addGoal = (goal) => {
        setGoals(prev => [...prev, { ...goal, id: generateId(), currentAmount: 0 }]);
        setIsModalOpen(false);
    };

    const updateGoalProgress = (goalId, amount) => {
        setGoals(prev => prev.map(g =>
            g.id === goalId ? { ...g, currentAmount: Math.min(g.targetAmount, g.currentAmount + amount) } : g
        ));
    };

    const deleteGoal = (goalId) => {
        setGoals(prev => prev.filter(g => g.id !== goalId));
    };

    // Budget recommendations based on 50/30/20 rule
    const recommendedBudget = {
        needs: income * 0.5,
        wants: income * 0.3,
        savings: income * 0.2
    };

    return (
        <div style={{ minHeight: '100vh', padding: '0' }}>
            {/* Hero Header */}
            <div style={{
                background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.15) 0%, rgba(6, 182, 212, 0.1) 50%, rgba(16, 185, 129, 0.1) 100%)',
                borderRadius: '24px',
                padding: '2rem',
                marginBottom: '2rem',
                position: 'relative',
                overflow: 'hidden'
            }}>
                {/* Decorative elements */}
                <div style={{
                    position: 'absolute',
                    top: '-50px',
                    right: '-50px',
                    width: '200px',
                    height: '200px',
                    background: 'radial-gradient(circle, rgba(139, 92, 246, 0.2) 0%, transparent 70%)',
                    borderRadius: '50%'
                }} />

                <div style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                                <div style={{
                                    width: '48px',
                                    height: '48px',
                                    borderRadius: '14px',
                                    background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    boxShadow: '0 8px 32px -8px rgba(139, 92, 246, 0.5)'
                                }}>
                                    <Target size={24} color="white" />
                                </div>
                                <div>
                                    <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#f8fafc', margin: 0 }}>
                                        Goals & Budget
                                    </h1>
                                    <p style={{ fontSize: '0.875rem', color: '#94a3b8', margin: 0 }}>
                                        Track your financial goals and manage budget
                                    </p>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                padding: '0.75rem 1.25rem',
                                background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
                                border: 'none',
                                borderRadius: '12px',
                                color: 'white',
                                fontWeight: 600,
                                cursor: 'pointer',
                                boxShadow: '0 4px 20px -4px rgba(139, 92, 246, 0.5)',
                                transition: 'all 0.2s ease'
                            }}
                        >
                            <Plus size={18} />
                            New Goal
                        </button>
                    </div>

                    {/* Stats Cards */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
                        <StatCard
                            icon={<Target size={20} />}
                            label="Active Goals"
                            value={goals.length}
                            color="#8b5cf6"
                        />
                        <StatCard
                            icon={<Trophy size={20} />}
                            label="Completed"
                            value={completedGoals}
                            color="#10b981"
                        />
                        <StatCard
                            icon={<PiggyBank size={20} />}
                            label="Total Saved"
                            value={formatCurrency(totalSaved)}
                            color="#06b6d4"
                        />
                        <StatCard
                            icon={<Flame size={20} />}
                            label="Savings Rate"
                            value={`${savingsRate.toFixed(0)}%`}
                            color={savingsRate >= 20 ? '#10b981' : '#f59e0b'}
                        />
                    </div>
                </div>
            </div>

            {/* Tab Navigation */}
            <div style={{
                display: 'flex',
                gap: '0.5rem',
                marginBottom: '1.5rem',
                padding: '0.25rem',
                background: 'rgba(30, 41, 59, 0.5)',
                borderRadius: '12px',
                width: 'fit-content'
            }}>
                <TabButton active={activeTab === 'goals'} onClick={() => setActiveTab('goals')}>
                    <Target size={16} /> My Goals
                </TabButton>
                <TabButton active={activeTab === 'budget'} onClick={() => setActiveTab('budget')}>
                    <Wallet size={16} /> Budget Planner
                </TabButton>
            </div>

            {/* Content based on tab */}
            {activeTab === 'goals' ? (
                <GoalsSection
                    goals={goals}
                    onDelete={deleteGoal}
                    onAddProgress={updateGoalProgress}
                    monthlySavings={monthlySavings}
                    onOpenModal={() => setIsModalOpen(true)}
                />
            ) : (
                <BudgetSection
                    income={income}
                    expense={expense}
                    monthlySavings={monthlySavings}
                    recommendedBudget={recommendedBudget}
                />
            )}

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create New Goal">
                <AddGoalForm onSubmit={addGoal} onClose={() => setIsModalOpen(false)} />
            </Modal>
        </div>
    );
}

// Stat Card Component
function StatCard({ icon, label, value, color }) {
    return (
        <div style={{
            padding: '1rem',
            background: 'rgba(15, 23, 42, 0.6)',
            borderRadius: '12px',
            border: '1px solid rgba(148, 163, 184, 0.1)'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <div style={{ color }}>{icon}</div>
                <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 500 }}>{label}</span>
            </div>
            <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#f8fafc' }}>{value}</div>
        </div>
    );
}

// Tab Button Component
function TabButton({ active, onClick, children }) {
    return (
        <button
            onClick={onClick}
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.625rem 1rem',
                background: active ? 'rgba(139, 92, 246, 0.2)' : 'transparent',
                border: 'none',
                borderRadius: '8px',
                color: active ? '#a78bfa' : '#64748b',
                fontWeight: 500,
                fontSize: '0.875rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
            }}
        >
            {children}
        </button>
    );
}

// Goals Section
function GoalsSection({ goals, onDelete, onAddProgress, monthlySavings, onOpenModal }) {
    if (goals.length === 0) {
        return (
            <div style={{
                padding: '4rem 2rem',
                textAlign: 'center',
                background: 'rgba(30, 41, 59, 0.3)',
                borderRadius: '20px',
                border: '2px dashed rgba(139, 92, 246, 0.2)'
            }}>
                <div style={{
                    width: '80px',
                    height: '80px',
                    margin: '0 auto 1.5rem',
                    background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(6, 182, 212, 0.2))',
                    borderRadius: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Target size={40} style={{ color: '#8b5cf6' }} />
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#f8fafc', marginBottom: '0.5rem' }}>
                    No goals yet
                </h3>
                <p style={{ color: '#64748b', marginBottom: '1.5rem', maxWidth: '300px', margin: '0 auto 1.5rem' }}>
                    Start your financial journey by setting your first savings goal
                </p>
                <button
                    onClick={onOpenModal}
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.75rem 1.5rem',
                        background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
                        border: 'none',
                        borderRadius: '12px',
                        color: 'white',
                        fontWeight: 600,
                        cursor: 'pointer'
                    }}
                >
                    <Plus size={18} /> Create First Goal
                </button>
            </div>
        );
    }

    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1rem' }}>
            {goals.map((goal, index) => (
                <GoalCard
                    key={goal.id}
                    goal={goal}
                    onDelete={() => onDelete(goal.id)}
                    onAddProgress={(amount) => onAddProgress(goal.id, amount)}
                    monthlySavings={monthlySavings}
                    index={index}
                />
            ))}
        </div>
    );
}

// Goal Card Component - Premium Design
function GoalCard({ goal, onDelete, onAddProgress, monthlySavings, index }) {
    const [showAddProgress, setShowAddProgress] = useState(false);
    const [progressAmount, setProgressAmount] = useState('');

    const progress = (goal.currentAmount / goal.targetAmount) * 100;
    const remaining = goal.targetAmount - goal.currentAmount;
    const monthsToGoal = monthlySavings > 0 ? Math.ceil(remaining / monthlySavings) : Infinity;
    const isComplete = progress >= 100;

    const handleAddProgress = () => {
        if (progressAmount && Number(progressAmount) > 0) {
            onAddProgress(Number(progressAmount));
            setProgressAmount('');
            setShowAddProgress(false);
        }
    };

    // Different gradient based on completion
    const cardGradient = isComplete
        ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(6, 182, 212, 0.1))'
        : 'linear-gradient(135deg, rgba(139, 92, 246, 0.05), rgba(30, 41, 59, 0.5))';

    const progressGradient = isComplete
        ? 'linear-gradient(90deg, #10b981, #06b6d4)'
        : 'linear-gradient(90deg, #8b5cf6, #06b6d4)';

    return (
        <div
            style={{
                padding: '1.5rem',
                borderRadius: '16px',
                background: cardGradient,
                border: isComplete ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(148, 163, 184, 0.1)',
                animation: `fadeIn 0.3s ease-out ${index * 0.05}s both`
            }}
        >
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                    <div style={{
                        width: '44px',
                        height: '44px',
                        borderRadius: '12px',
                        background: isComplete ? 'rgba(16, 185, 129, 0.15)' : 'rgba(139, 92, 246, 0.15)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        {isComplete ? (
                            <CheckCircle size={22} style={{ color: '#10b981' }} />
                        ) : (
                            <Target size={22} style={{ color: '#8b5cf6' }} />
                        )}
                    </div>
                    <div>
                        <h4 style={{ fontSize: '1rem', fontWeight: 600, color: '#f8fafc', marginBottom: '0.25rem' }}>
                            {goal.title}
                        </h4>
                        {goal.deadline && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#64748b', fontSize: '0.75rem' }}>
                                <Calendar size={12} />
                                Due: {new Date(goal.deadline).toLocaleDateString()}
                            </div>
                        )}
                    </div>
                </div>
                {isComplete && (
                    <span style={{
                        padding: '0.25rem 0.75rem',
                        background: 'rgba(16, 185, 129, 0.2)',
                        color: '#10b981',
                        borderRadius: '20px',
                        fontSize: '0.7rem',
                        fontWeight: 600
                    }}>
                        ✓ COMPLETE
                    </span>
                )}
            </div>

            {/* Amount Display */}
            <div style={{ marginBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '1.5rem', fontWeight: 700, color: '#f8fafc' }}>
                        {formatCurrency(goal.currentAmount)}
                    </span>
                    <span style={{ color: '#64748b', fontSize: '0.875rem' }}>
                        of {formatCurrency(goal.targetAmount)}
                    </span>
                </div>

                {/* Progress Bar */}
                <div style={{
                    height: '10px',
                    background: 'rgba(100, 116, 139, 0.2)',
                    borderRadius: '5px',
                    overflow: 'hidden'
                }}>
                    <div style={{
                        height: '100%',
                        width: `${Math.min(100, progress)}%`,
                        background: progressGradient,
                        borderRadius: '5px',
                        transition: 'width 0.5s ease'
                    }} />
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem' }}>
                    <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
                        {!isComplete && remaining > 0 && `${formatCurrency(remaining)} remaining`}
                        {isComplete && 'Goal achieved! 🎉'}
                    </span>
                    <span style={{
                        fontSize: '0.875rem',
                        fontWeight: 600,
                        color: isComplete ? '#10b981' : '#a78bfa'
                    }}>
                        {progress.toFixed(0)}%
                    </span>
                </div>
            </div>

            {/* Time Estimate */}
            {!isComplete && monthsToGoal !== Infinity && monthsToGoal > 0 && (
                <div style={{
                    padding: '0.75rem',
                    background: 'rgba(139, 92, 246, 0.1)',
                    borderRadius: '8px',
                    marginBottom: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                }}>
                    <TrendingUp size={16} style={{ color: '#a78bfa' }} />
                    <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                        At current rate: <strong style={{ color: '#f8fafc' }}>~{monthsToGoal} month{monthsToGoal > 1 ? 's' : ''}</strong>
                    </span>
                </div>
            )}

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '0.5rem' }}>
                {!isComplete && (
                    <button
                        onClick={() => setShowAddProgress(!showAddProgress)}
                        style={{
                            flex: 1,
                            padding: '0.625rem',
                            borderRadius: '8px',
                            border: '1px solid rgba(139, 92, 246, 0.3)',
                            background: 'rgba(139, 92, 246, 0.1)',
                            color: '#a78bfa',
                            fontWeight: 500,
                            fontSize: '0.8rem',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem'
                        }}
                    >
                        <Plus size={16} /> Add Progress
                    </button>
                )}
                <button
                    onClick={onDelete}
                    style={{
                        width: '38px',
                        height: '38px',
                        borderRadius: '8px',
                        border: '1px solid rgba(244, 63, 94, 0.2)',
                        background: 'rgba(244, 63, 94, 0.1)',
                        color: '#fb7185',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <Trash2 size={16} />
                </button>
            </div>

            {/* Add Progress Form */}
            {showAddProgress && (
                <div style={{
                    marginTop: '1rem',
                    padding: '1rem',
                    background: 'rgba(0, 0, 0, 0.2)',
                    borderRadius: '10px',
                    display: 'flex',
                    gap: '0.5rem'
                }}>
                    <input
                        type="number"
                        placeholder="Amount to add"
                        value={progressAmount}
                        onChange={(e) => setProgressAmount(e.target.value)}
                        style={{
                            flex: 1,
                            padding: '0.75rem',
                            background: 'rgba(30, 41, 59, 0.8)',
                            border: '1px solid rgba(148, 163, 184, 0.2)',
                            borderRadius: '8px',
                            color: '#f8fafc',
                            fontSize: '0.9rem'
                        }}
                    />
                    <button
                        onClick={handleAddProgress}
                        style={{
                            padding: '0.75rem 1rem',
                            background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
                            border: 'none',
                            borderRadius: '8px',
                            color: 'white',
                            fontWeight: 600,
                            cursor: 'pointer'
                        }}
                    >
                        Add
                    </button>
                </div>
            )}
        </div>
    );
}

// Budget Section
function BudgetSection({ income, expense, monthlySavings, recommendedBudget }) {
    const savingsRate = income > 0 ? (monthlySavings / income) * 100 : 0;

    return (
        <div>
            {/* 50/30/20 Budget Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
                <BudgetCard
                    title="Needs"
                    percentage="50%"
                    description="Housing, utilities, groceries, insurance, transportation"
                    amount={recommendedBudget.needs}
                    icon="🏠"
                    color="#10b981"
                />
                <BudgetCard
                    title="Wants"
                    percentage="30%"
                    description="Entertainment, dining out, hobbies, subscriptions"
                    amount={recommendedBudget.wants}
                    icon="🎮"
                    color="#8b5cf6"
                />
                <BudgetCard
                    title="Savings"
                    percentage="20%"
                    description="Emergency fund, investments, debt repayment"
                    amount={recommendedBudget.savings}
                    actual={monthlySavings}
                    icon="💰"
                    color="#06b6d4"
                    showActual
                />
            </div>

            {/* Savings Progress */}
            <div style={{
                padding: '1.5rem',
                background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(6, 182, 212, 0.1))',
                borderRadius: '16px',
                border: '1px solid rgba(148, 163, 184, 0.1)'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '10px',
                            background: savingsRate >= 20 ? 'rgba(16, 185, 129, 0.2)' : 'rgba(245, 158, 11, 0.2)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            {savingsRate >= 20 ? (
                                <CheckCircle size={20} style={{ color: '#10b981' }} />
                            ) : (
                                <TrendingUp size={20} style={{ color: '#f59e0b' }} />
                            )}
                        </div>
                        <div>
                            <h4 style={{ fontSize: '1rem', fontWeight: 600, color: '#f8fafc', marginBottom: '0.125rem' }}>
                                Your Savings Rate
                            </h4>
                            <p style={{ fontSize: '0.8rem', color: '#64748b' }}>
                                Based on your income and expenses
                            </p>
                        </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '1.5rem', fontWeight: 700, color: savingsRate >= 20 ? '#10b981' : '#f59e0b' }}>
                            {savingsRate.toFixed(1)}%
                        </div>
                        <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                            {formatCurrency(monthlySavings)}/month
                        </div>
                    </div>
                </div>

                {/* Progress Bar */}
                <div style={{
                    height: '12px',
                    background: 'rgba(100, 116, 139, 0.2)',
                    borderRadius: '6px',
                    overflow: 'hidden',
                    position: 'relative'
                }}>
                    {/* 20% marker */}
                    <div style={{
                        position: 'absolute',
                        left: '20%',
                        top: 0,
                        bottom: 0,
                        width: '2px',
                        background: 'rgba(255, 255, 255, 0.3)'
                    }} />
                    <div style={{
                        height: '100%',
                        width: `${Math.min(100, Math.max(0, savingsRate))}%`,
                        background: savingsRate >= 20
                            ? 'linear-gradient(90deg, #10b981, #06b6d4)'
                            : 'linear-gradient(90deg, #f59e0b, #f43f5e)',
                        borderRadius: '6px',
                        transition: 'width 0.5s ease'
                    }} />
                </div>

                <div style={{ marginTop: '0.75rem', fontSize: '0.8rem' }}>
                    {savingsRate >= 20 ? (
                        <span style={{ color: '#10b981' }}>
                            ✅ Great job! You're meeting the 20% savings target!
                        </span>
                    ) : (
                        <span style={{ color: '#f59e0b' }}>
                            ⚠️ You need {formatCurrency(recommendedBudget.savings - monthlySavings)} more to reach 20%
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}

// Budget Card Component
function BudgetCard({ title, percentage, description, amount, actual, icon, color, showActual }) {
    return (
        <div style={{
            padding: '1.5rem',
            background: `linear-gradient(135deg, ${color}10, rgba(30, 41, 59, 0.5))`,
            borderRadius: '16px',
            border: `1px solid ${color}30`
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <span style={{ fontSize: '1.5rem' }}>{icon}</span>
                <div>
                    <span style={{ fontWeight: 600, color: '#f8fafc' }}>{title}</span>
                    <span style={{
                        marginLeft: '0.5rem',
                        padding: '0.125rem 0.5rem',
                        background: `${color}20`,
                        color,
                        borderRadius: '20px',
                        fontSize: '0.7rem',
                        fontWeight: 600
                    }}>
                        {percentage}
                    </span>
                </div>
            </div>

            <div style={{ marginBottom: '0.75rem' }}>
                <div style={{ fontSize: '1.75rem', fontWeight: 700, color }}>
                    {formatCurrency(showActual ? actual : amount)}
                </div>
                {showActual && (
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                        Recommended: {formatCurrency(amount)}
                    </div>
                )}
            </div>

            <p style={{ fontSize: '0.75rem', color: '#64748b', lineHeight: 1.5 }}>
                {description}
            </p>

            {showActual && (
                <div style={{
                    marginTop: '0.75rem',
                    padding: '0.5rem',
                    background: actual >= amount ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                    borderRadius: '6px',
                    fontSize: '0.75rem',
                    color: actual >= amount ? '#10b981' : '#f59e0b',
                    fontWeight: 500
                }}>
                    {actual >= amount ? '✓ On track' : '! Below target'}
                </div>
            )}
        </div>
    );
}

// Add Goal Form
function AddGoalForm({ onSubmit, onClose }) {
    const [formData, setFormData] = useState({
        title: '',
        targetAmount: '',
        deadline: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({
            ...formData,
            targetAmount: Number(formData.targetAmount)
        });
    };

    const presets = [
        { title: 'Emergency Fund', amount: 100000, icon: '🆘' },
        { title: 'Vacation', amount: 50000, icon: '✈️' },
        { title: 'New Gadget', amount: 30000, icon: '📱' },
        { title: 'Car Down Payment', amount: 200000, icon: '🚗' },
        { title: 'House Down Payment', amount: 500000, icon: '🏠' },
        { title: 'Wedding', amount: 300000, icon: '💒' },
    ];

    return (
        <form onSubmit={handleSubmit}>
            {/* Quick Presets */}
            <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.75rem', fontSize: '0.875rem', color: '#94a3b8', fontWeight: 500 }}>
                    Quick Presets
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
                    {presets.map(preset => (
                        <button
                            key={preset.title}
                            type="button"
                            onClick={() => setFormData({ ...formData, title: preset.title, targetAmount: preset.amount })}
                            style={{
                                padding: '0.75rem',
                                borderRadius: '10px',
                                border: formData.title === preset.title
                                    ? '1px solid rgba(139, 92, 246, 0.5)'
                                    : '1px solid rgba(148, 163, 184, 0.2)',
                                background: formData.title === preset.title
                                    ? 'rgba(139, 92, 246, 0.15)'
                                    : 'rgba(30, 41, 59, 0.5)',
                                color: '#f8fafc',
                                cursor: 'pointer',
                                textAlign: 'center',
                                fontSize: '0.8rem',
                                transition: 'all 0.2s ease'
                            }}
                        >
                            <div style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>{preset.icon}</div>
                            <div style={{ fontWeight: 500 }}>{preset.title}</div>
                        </button>
                    ))}
                </div>
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: '#94a3b8' }}>
                    Goal Name
                </label>
                <input
                    type="text"
                    required
                    placeholder="e.g., Emergency Fund"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    style={{
                        width: '100%',
                        padding: '0.875rem',
                        background: 'rgba(30, 41, 59, 0.8)',
                        border: '1px solid rgba(148, 163, 184, 0.2)',
                        borderRadius: '10px',
                        color: '#f8fafc',
                        fontSize: '0.9rem'
                    }}
                />
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: '#94a3b8' }}>
                    Target Amount
                </label>
                <div style={{ position: 'relative' }}>
                    <span style={{
                        position: 'absolute',
                        left: '1rem',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: '#64748b',
                        fontWeight: 600
                    }}>₹</span>
                    <input
                        type="number"
                        required
                        min="1"
                        placeholder="100000"
                        value={formData.targetAmount}
                        onChange={(e) => setFormData({ ...formData, targetAmount: e.target.value })}
                        style={{
                            width: '100%',
                            padding: '0.875rem 0.875rem 0.875rem 2.25rem',
                            background: 'rgba(30, 41, 59, 0.8)',
                            border: '1px solid rgba(148, 163, 184, 0.2)',
                            borderRadius: '10px',
                            color: '#f8fafc',
                            fontSize: '0.9rem'
                        }}
                    />
                </div>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: '#94a3b8' }}>
                    Target Date (Optional)
                </label>
                <input
                    type="date"
                    value={formData.deadline}
                    onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                    style={{
                        width: '100%',
                        padding: '0.875rem',
                        background: 'rgba(30, 41, 59, 0.8)',
                        border: '1px solid rgba(148, 163, 184, 0.2)',
                        borderRadius: '10px',
                        color: '#f8fafc',
                        fontSize: '0.9rem'
                    }}
                />
            </div>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button
                    type="button"
                    onClick={onClose}
                    style={{
                        flex: 1,
                        padding: '0.875rem',
                        background: 'rgba(100, 116, 139, 0.1)',
                        border: '1px solid rgba(148, 163, 184, 0.2)',
                        borderRadius: '10px',
                        color: '#94a3b8',
                        fontWeight: 500,
                        cursor: 'pointer'
                    }}
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    style={{
                        flex: 1,
                        padding: '0.875rem',
                        background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
                        border: 'none',
                        borderRadius: '10px',
                        color: 'white',
                        fontWeight: 600,
                        cursor: 'pointer'
                    }}
                >
                    Create Goal
                </button>
            </div>
        </form>
    );
}

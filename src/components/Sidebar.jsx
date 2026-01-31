import { LayoutDashboard, Wallet, Target, MessageSquare, Settings, Sparkles, LogOut, TrendingUp, Shield, Zap, Crown } from 'lucide-react';

export function Sidebar({ activeTab, setActiveTab, user, onLogout }) {
    const navItems = [
        { id: 'dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard', color: '#8b5cf6' },
        { id: 'transactions', icon: <Wallet size={20} />, label: 'Transactions', color: '#10b981' },
        { id: 'goals', icon: <Target size={20} />, label: 'Goals & Budget', color: '#f59e0b' },
        { id: 'assistant', icon: <MessageSquare size={20} />, label: 'AI Assistant', color: '#06b6d4' },
        { id: 'settings', icon: <Settings size={20} />, label: 'Settings', color: '#64748b' },
    ];

    return (
        <aside className="sidebar" style={{
            background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.98) 0%, rgba(10, 14, 26, 0.99) 100%)',
            borderRight: '1px solid rgba(139, 92, 246, 0.15)',
            padding: '1.5rem 1rem',
            display: 'flex',
            flexDirection: 'column'
        }}>
            {/* Logo Section */}
            <div style={{ padding: '0 0.75rem', marginBottom: '2.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }} onClick={() => setActiveTab('dashboard')}>
                <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '10px',
                    background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 0 15px -3px rgba(139, 92, 246, 0.4)'
                }}>
                    <img src="/logo.png" alt="SamAgent Logo" style={{ width: '22px', height: '22px', objectFit: 'contain' }} />
                </div>
                <span style={{ fontSize: '1.125rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em' }}>SamAgent</span>
            </div>

            {/* Navigation */}
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div style={{ fontSize: '0.65rem', color: '#64748b', fontWeight: 600, letterSpacing: '0.1em', padding: '0 0.75rem', marginBottom: '0.5rem' }}>
                    MENU
                </div>
                {navItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            padding: '0.875rem 1rem',
                            borderRadius: '12px',
                            border: 'none',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            position: 'relative',
                            background: activeTab === item.id
                                ? `linear-gradient(135deg, ${item.color}20, ${item.color}10)`
                                : 'transparent',
                            color: activeTab === item.id ? '#fff' : '#94a3b8',
                            boxShadow: activeTab === item.id ? `0 4px 15px -3px ${item.color}30` : 'none'
                        }}
                    >
                        {/* Active indicator */}
                        {activeTab === item.id && (
                            <div style={{
                                position: 'absolute',
                                left: '0',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                width: '3px',
                                height: '60%',
                                borderRadius: '0 4px 4px 0',
                                background: `linear-gradient(180deg, ${item.color}, ${item.color}80)`
                            }}></div>
                        )}

                        <div style={{
                            color: activeTab === item.id ? item.color : '#64748b',
                            transition: 'color 0.2s ease'
                        }}>
                            {item.icon}
                        </div>
                        <span style={{ flex: 1, fontSize: '0.875rem', fontWeight: activeTab === item.id ? 600 : 400 }}>
                            {item.label}
                        </span>
                        {item.badge && (
                            <span style={{
                                padding: '0.2rem 0.5rem',
                                borderRadius: '6px',
                                background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)',
                                color: 'white',
                                fontSize: '0.6rem',
                                fontWeight: 700,
                                letterSpacing: '0.05em'
                            }}>
                                {item.badge}
                            </span>
                        )}
                    </button>
                ))}
            </nav>

            {/* Spacer */}
            <div style={{ flex: 1 }}></div>

            {/* User Profile Card */}
            <div style={{
                background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.8), rgba(17, 24, 39, 0.9))',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '14px',
                padding: '1rem'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                    <div style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '12px',
                        background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        overflow: 'hidden',
                        boxShadow: '0 4px 15px -3px rgba(139, 92, 246, 0.4)'
                    }}>
                        {user?.photo ? (
                            <img src={user.photo} alt={user.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : (
                            <span style={{ color: 'white', fontWeight: 700, fontSize: '1rem' }}>
                                {user?.name?.charAt(0).toUpperCase() || 'U'}
                            </span>
                        )}
                    </div>
                    <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#fff' }}>
                            {user?.name || 'User'}
                        </div>
                        <div style={{ fontSize: '0.7rem', color: '#8b5cf6', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                            <Shield size={10} /> Pro Member
                        </div>
                    </div>
                </div>

                <button
                    onClick={onLogout}
                    style={{
                        width: '100%',
                        padding: '0.625rem',
                        borderRadius: '10px',
                        border: '1px solid rgba(239, 68, 68, 0.2)',
                        background: 'rgba(239, 68, 68, 0.08)',
                        color: '#f87171',
                        fontSize: '0.75rem',
                        fontWeight: 500,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem',
                        transition: 'all 0.2s ease'
                    }}
                >
                    <LogOut size={14} />
                    Sign Out
                </button>
            </div>
        </aside>
    );
}

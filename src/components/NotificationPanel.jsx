import { Bell, X, Check, Target, AlertTriangle, FileText, Trash2 } from 'lucide-react';
import { useFinance } from '../context/FinanceContext';
import { formatCurrency } from '../lib/utils';

export function NotificationPanel({ isOpen, onClose }) {
    const { notifications, markAsRead, clearNotifications } = useFinance();

    if (!isOpen) return null;

    const unreadCount = notifications.filter(n => !n.read).length;

    const getIcon = (type) => {
        switch (type) {
            case 'budget': return <AlertTriangle size={18} className="text-rose-400" />;
            case 'goal': return <Target size={18} className="text-violet-400" />;
            case 'report': return <FileText size={18} className="text-emerald-400" />;
            default: return <Bell size={18} className="text-slate-400" />;
        }
    };

    return (
        <div style={{
            position: 'absolute',
            top: '100%',
            right: 0,
            marginTop: '0.75rem',
            width: '380px',
            maxHeight: '500px',
            background: 'rgba(17, 24, 39, 0.95)',
            backdropFilter: 'blur(16px)',
            borderRadius: '20px',
            border: '1px solid rgba(139, 92, 246, 0.3)',
            boxShadow: '0 20px 50px -12px rgba(0, 0, 0, 0.5), 0 0 30px -5px rgba(139, 92, 246, 0.2)',
            zIndex: 1000,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            animation: 'slideUpFade 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
        }}>
            {/* Header */}
            <div style={{
                padding: '1.25rem 1.5rem',
                borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <div>
                    <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 600 }}>Notifications</h4>
                    {unreadCount > 0 && (
                        <span style={{ fontSize: '0.75rem', color: '#a78bfa' }}>
                            You have {unreadCount} unread message{unreadCount > 1 ? 's' : ''}
                        </span>
                    )}
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                        onClick={clearNotifications}
                        title="Clear all"
                        style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', padding: '0.25rem' }}
                    >
                        <Trash2 size={16} />
                    </button>
                    <button
                        onClick={onClose}
                        style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', padding: '0.25rem' }}
                    >
                        <X size={18} />
                    </button>
                </div>
            </div>

            {/* List */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '0.5rem' }}>
                {notifications.length === 0 ? (
                    <div style={{ padding: '3rem 1.5rem', textAlign: 'center' }}>
                        <div style={{
                            width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(255,255,255,0.03)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem'
                        }}>
                            <Bell size={24} className="text-slate-600" />
                        </div>
                        <p style={{ color: '#64748b', fontSize: '0.875rem' }}>No notifications yet</p>
                    </div>
                ) : (
                    notifications.map((n) => (
                        <div
                            key={n.id}
                            style={{
                                padding: '1rem',
                                borderRadius: '12px',
                                background: n.read ? 'transparent' : 'rgba(139, 92, 246, 0.05)',
                                borderLeft: n.read ? '3px solid transparent' : '3px solid #8b5cf6',
                                marginBottom: '0.5rem',
                                transition: 'all 0.2s ease',
                                cursor: 'default',
                                position: 'relative'
                            }}
                        >
                            <div style={{ display: 'flex', gap: '0.75rem' }}>
                                <div style={{
                                    width: '36px', height: '36px', borderRadius: '10px',
                                    background: 'rgba(255,255,255,0.03)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                                }}>
                                    {getIcon(n.type)}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                                        <span style={{ fontWeight: 600, fontSize: '0.875rem' }}>{n.title}</span>
                                        <span style={{ fontSize: '0.7rem', color: '#64748b' }}>
                                            {new Date(n.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                    </div>
                                    <p style={{
                                        margin: 0, fontSize: '0.8125rem', color: n.read ? '#94a3b8' : '#f8fafc',
                                        lineHeight: 1.4
                                    }}>
                                        {n.message}
                                    </p>
                                    {!n.read && (
                                        <button
                                            onClick={() => markAsRead(n.id)}
                                            style={{
                                                marginTop: '0.5rem', background: 'none', border: 'none',
                                                color: '#a78bfa', fontSize: '0.75rem', fontWeight: 600,
                                                cursor: 'pointer', padding: 0
                                            }}
                                        >
                                            Mark as read
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Footer */}
            {notifications.length > 0 && (
                <div style={{
                    padding: '0.75rem 1.5rem',
                    borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                    textAlign: 'center'
                }}>
                    <button style={{
                        background: 'none', border: 'none', color: '#64748b',
                        fontSize: '0.75rem', fontWeight: 500, cursor: 'pointer'
                    }}>
                        View all activity
                    </button>
                </div>
            )}
        </div>
    );
}

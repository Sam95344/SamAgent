import { Search, Bell, HelpCircle, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { useFinance } from '../context/FinanceContext';
import { NotificationPanel } from './NotificationPanel';

// Google icon component
const GoogleIcon = ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.2 4.53z" fill="#EA4335" />
    </svg>
);

export function Header({ user, onLogout, setActiveTab }) {
    const [isNotifOpen, setIsNotifOpen] = useState(false);
    const { notifications } = useFinance();
    const unreadCount = notifications.filter(n => !n.read).length;

    if (!user) return null;

    return (
        <div className="dashboard-header animate-in" style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '1.25rem 0',
            marginBottom: '1.5rem',
            position: 'relative',
            zIndex: 100
        }}>
            {/* User Name in Header */}
            <div style={{ gap: '0.75rem', cursor: 'pointer', display: 'flex', alignItems: 'center' }} onClick={() => setActiveTab && setActiveTab('dashboard')}>
                <div style={{
                    width: '40px',
                    height: '40px',
                    padding: '6px',
                    background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 0 15px -3px rgba(139, 92, 246, 0.4)'
                }}>
                    <img src="/logo.png" alt="SamAgent Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                </div>
                <span style={{ fontSize: '1.25rem', fontWeight: 700, color: '#fff' }}>SamAgent</span>
            </div>

            {/* Mock Search Bar for Dashboard Context */}
            <div style={{ position: 'relative', width: '380px' }}>
                <Search size={18} style={{
                    position: 'absolute',
                    left: '1rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#64748b',
                    pointerEvents: 'none'
                }} />
                <input
                    type="text"
                    placeholder="Search for anything..."
                    className="search-input-modern"
                />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                {/* Utility Buttons */}
                <div style={{ display: 'flex', gap: '0.5rem', marginRight: '0.5rem', position: 'relative' }}>
                    <button
                        className="btn btn-ghost"
                        style={{ padding: '0.625rem', borderRadius: '12px', position: 'relative' }}
                        onClick={() => setIsNotifOpen(!isNotifOpen)}
                    >
                        <Bell size={20} className={unreadCount > 0 ? "text-violet-400" : "text-slate-400"} />
                        {unreadCount > 0 && (
                            <span style={{
                                position: 'absolute',
                                top: '4px',
                                right: '4px',
                                width: '10px',
                                height: '10px',
                                background: '#ef4444',
                                borderRadius: '50%',
                                border: '2px solid #0a0e1a',
                                boxShadow: '0 0 10px rgba(239, 68, 68, 0.5)'
                            }} />
                        )}
                    </button>

                    <NotificationPanel
                        isOpen={isNotifOpen}
                        onClose={() => setIsNotifOpen(false)}
                    />

                    <button className="btn btn-ghost" style={{ padding: '0.625rem', borderRadius: '12px' }}>
                        <HelpCircle size={20} className="text-slate-400" />
                    </button>
                </div>
            </div>
            <div className="header-accent-glow" />
        </div>
    );
}


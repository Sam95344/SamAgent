import { useState } from 'react';
import { X, Mail, Lock, User, Eye, EyeOff, Sparkles } from 'lucide-react';

// Google icon component
const GoogleIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.2 4.53z" fill="#EA4335" />
    </svg>
);

export function AuthModal({ isOpen, onClose, mode: initialMode, onAuth }) {
    const [mode, setMode] = useState(initialMode || 'login');
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // Basic validation
        if (!formData.email || !formData.password) {
            setError('Please fill in all required fields');
            setLoading(false);
            return;
        }

        if (mode === 'signup' && !formData.name) {
            setError('Please enter your name');
            setLoading(false);
            return;
        }

        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters');
            setLoading(false);
            return;
        }

        // Simulate auth (stores in localStorage)
        setTimeout(() => {
            const users = JSON.parse(localStorage.getItem('finance_users') || '{}');

            if (mode === 'signup') {
                if (users[formData.email]) {
                    setError('An account with this email already exists');
                    setLoading(false);
                    return;
                }
                users[formData.email] = {
                    name: formData.name,
                    email: formData.email,
                    password: formData.password, // In production, hash this!
                    createdAt: new Date().toISOString()
                };
                localStorage.setItem('finance_users', JSON.stringify(users));
            } else {
                const user = users[formData.email];
                if (!user || user.password !== formData.password) {
                    setError('Invalid email or password');
                    setLoading(false);
                    return;
                }
            }

            // Store current user session
            const authData = {
                email: formData.email,
                name: formData.name || users[formData.email]?.name || 'User',
                loggedInAt: new Date().toISOString(),
                authSource: 'email'
            };
            localStorage.setItem('finance_current_user', JSON.stringify(authData));

            setLoading(false);
            onAuth(authData);
        }, 800);
    };

    const handleGoogleLogin = () => {
        setError('');
        setGoogleLoading(true);

        // Simulate Google OAuth popup and selection
        setTimeout(() => {
            const googleUser = {
                email: 'google.user@gmail.com',
                name: 'Google User',
                photo: 'https://ui-avatars.com/api/?name=Google+User&background=4285F4&color=fff',
                loggedInAt: new Date().toISOString(),
                authSource: 'google'
            };

            // Store in users list if not exists
            const users = JSON.parse(localStorage.getItem('finance_users') || '{}');
            if (!users[googleUser.email]) {
                users[googleUser.email] = {
                    ...googleUser,
                    createdAt: new Date().toISOString()
                };
                localStorage.setItem('finance_users', JSON.stringify(users));
            }

            localStorage.setItem('finance_current_user', JSON.stringify(googleUser));
            setGoogleLoading(false);
            onAuth(googleUser);
        }, 1500);
    };

    const toggleMode = () => {
        setMode(mode === 'login' ? 'signup' : 'login');
        setError('');
    };

    return (
        <div style={{
            position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem'
        }}>
            {/* Backdrop */}
            <div onClick={onClose} style={{
                position: 'absolute', inset: 0, background: 'rgba(5, 5, 10, 0.6)', backdropFilter: 'blur(16px)',
                transition: 'opacity 0.3s ease'
            }} />

            {/* Modal */}
            <div className="auth-modal" style={{
                position: 'relative', width: '100%', maxWidth: '440px',
                background: 'rgba(30, 41, 59, 0.4)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(24px)',
                borderRadius: '32px',
                padding: '3rem',
                boxShadow: '0 40px 80px -20px rgba(0, 0, 0, 0.5), inset 0 0 0 1px rgba(255, 255, 255, 0.05)',
                animation: 'modalSlideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                overflow: 'hidden'
            }}>
                {/* Decorative Elements */}
                <div style={{ position: 'absolute', top: -100, left: -100, width: 300, height: 300, background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)', filter: 'blur(40px)', pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', bottom: -50, right: -50, width: 200, height: 200, background: 'radial-gradient(circle, rgba(6, 182, 212, 0.15) 0%, transparent 70%)', filter: 'blur(40px)', pointerEvents: 'none' }} />

                {/* Close Button */}
                <button onClick={onClose} style={{
                    position: 'absolute', top: '1.5rem', right: '1.5rem',
                    width: '32px', height: '32px', borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    color: '#94a3b8', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'all 0.2s ease'
                }}
                    onMouseOver={e => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'; e.currentTarget.style.color = '#fff'; }}
                    onMouseOut={e => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'; e.currentTarget.style.color = '#94a3b8'; }}
                >
                    <X size={16} />
                </button>

                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                    <div style={{
                        width: '72px', height: '72px', margin: '0 auto 1.5rem',
                        borderRadius: '24px',
                        background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(6, 182, 212, 0.1))',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        boxShadow: '0 0 40px -10px rgba(139, 92, 246, 0.3)'
                    }}>
                        <Sparkles size={36} style={{ color: '#a78bfa', filter: 'drop-shadow(0 0 10px rgba(167, 139, 250, 0.5))' }} />
                    </div>
                    <h2 style={{
                        fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem',
                        background: 'linear-gradient(135deg, #fff 0%, #94a3b8 100%)',
                        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                        letterSpacing: '-0.02em'
                    }}>
                        {mode === 'login' ? 'Welcome Back' : 'Join SamAgent'}
                    </h2>
                    <p style={{ color: '#64748b', fontSize: '1rem', fontWeight: 500 }}>
                        {mode === 'login' ? 'Enter your credentials to access.' : 'Start your financial journey today.'}
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    {mode === 'signup' && (
                        <div className="input-group">
                            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#94a3b8', marginBottom: '0.5rem', marginLeft: '0.25rem' }}>Full Name</label>
                            <div style={{ position: 'relative' }}>
                                <User size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
                                <input
                                    type="text" placeholder="John Doe" value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    style={{
                                        width: '100%', padding: '1rem 1rem 1rem 3rem',
                                        background: 'rgba(0, 0, 0, 0.2)', border: '1px solid rgba(255, 255, 255, 0.08)',
                                        borderRadius: '16px', color: '#fff', fontSize: '0.9375rem', outline: 'none',
                                        transition: 'all 0.2s', fontFamily: 'inherit'
                                    }}
                                    onFocus={e => { e.currentTarget.style.background = 'rgba(0, 0, 0, 0.3)'; e.currentTarget.style.borderColor = '#8b5cf6'; e.currentTarget.style.boxShadow = '0 0 0 4px rgba(139, 92, 246, 0.1)'; }}
                                    onBlur={e => { e.currentTarget.style.background = 'rgba(0, 0, 0, 0.2)'; e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)'; e.currentTarget.style.boxShadow = 'none'; }}
                                />
                            </div>
                        </div>
                    )}

                    <div className="input-group">
                        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#94a3b8', marginBottom: '0.5rem', marginLeft: '0.25rem' }}>Email Address</label>
                        <div style={{ position: 'relative' }}>
                            <Mail size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
                            <input
                                type="email" placeholder="name@company.com" value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                style={{
                                    width: '100%', padding: '1rem 1rem 1rem 3rem',
                                    background: 'rgba(0, 0, 0, 0.2)', border: '1px solid rgba(255, 255, 255, 0.08)',
                                    borderRadius: '16px', color: '#fff', fontSize: '0.9375rem', outline: 'none',
                                    transition: 'all 0.2s', fontFamily: 'inherit'
                                }}
                                onFocus={e => { e.currentTarget.style.background = 'rgba(0, 0, 0, 0.3)'; e.currentTarget.style.borderColor = '#8b5cf6'; e.currentTarget.style.boxShadow = '0 0 0 4px rgba(139, 92, 246, 0.1)'; }}
                                onBlur={e => { e.currentTarget.style.background = 'rgba(0, 0, 0, 0.2)'; e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)'; e.currentTarget.style.boxShadow = 'none'; }}
                            />
                        </div>
                    </div>

                    <div className="input-group">
                        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#94a3b8', marginBottom: '0.5rem', marginLeft: '0.25rem' }}>Password</label>
                        <div style={{ position: 'relative' }}>
                            <Lock size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
                            <input
                                type={showPassword ? 'text' : 'password'} placeholder="••••••••" value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                style={{
                                    width: '100%', padding: '1rem 3rem 1rem 3rem',
                                    background: 'rgba(0, 0, 0, 0.2)', border: '1px solid rgba(255, 255, 255, 0.08)',
                                    borderRadius: '16px', color: '#fff', fontSize: '0.9375rem', outline: 'none',
                                    transition: 'all 0.2s', fontFamily: 'inherit'
                                }}
                                onFocus={e => { e.currentTarget.style.background = 'rgba(0, 0, 0, 0.3)'; e.currentTarget.style.borderColor = '#8b5cf6'; e.currentTarget.style.boxShadow = '0 0 0 4px rgba(139, 92, 246, 0.1)'; }}
                                onBlur={e => { e.currentTarget.style.background = 'rgba(0, 0, 0, 0.2)'; e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)'; e.currentTarget.style.boxShadow = 'none'; }}
                            />
                            <button type="button" onClick={() => setShowPassword(!showPassword)}
                                style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#64748b', cursor: 'pointer' }}>
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    {error && (
                        <div style={{ padding: '0.75rem 1rem', borderRadius: '12px', background: 'rgba(244, 63, 94, 0.1)', border: '1px solid rgba(244, 63, 94, 0.2)', color: '#fb7185', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#fb7185' }} />
                            {error}
                        </div>
                    )}

                    <button type="submit" disabled={loading || googleLoading}
                        style={{
                            width: '100%', padding: '1rem', marginTop: '0.5rem',
                            background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)',
                            border: 'none', borderRadius: '16px', color: '#fff',
                            fontSize: '1rem', fontWeight: 600, cursor: loading ? 'wait' : 'pointer',
                            transition: 'all 0.3s ease', boxShadow: '0 10px 20px -5px rgba(139, 92, 246, 0.4)',
                            opacity: loading ? 0.7 : 1, position: 'relative', overflow: 'hidden'
                        }}
                        onMouseOver={e => !loading && (e.currentTarget.style.transform = 'translateY(-2px)', e.currentTarget.style.boxShadow = '0 20px 30px -10px rgba(139, 92, 246, 0.5)')}
                        onMouseOut={e => !loading && (e.currentTarget.style.transform = 'translateY(0)', e.currentTarget.style.boxShadow = '0 10px 20px -5px rgba(139, 92, 246, 0.4)')}
                    >
                        {loading ? 'Processing...' : (mode === 'login' ? 'Sign In' : 'Create Account')}
                    </button>
                </form>

                <div style={{ display: 'flex', alignItems: 'center', margin: '2rem 0', gap: '1rem', opacity: 0.6 }}>
                    <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2))' }} />
                    <span style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Or continue with</span>
                    <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, rgba(255,255,255,0.2), transparent)' }} />
                </div>

                <button onClick={handleGoogleLogin} disabled={loading || googleLoading}
                    style={{
                        width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem',
                        padding: '1rem', borderRadius: '16px',
                        background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)',
                        color: '#e2e8f0', fontSize: '0.9375rem', fontWeight: 600,
                        cursor: googleLoading ? 'wait' : 'pointer', transition: 'all 0.2s'
                    }}
                    onMouseOver={e => !googleLoading && (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)', e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)')}
                    onMouseOut={e => !googleLoading && (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)', e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)')}
                >
                    {googleLoading ? (
                        <div style={{ width: '20px', height: '20px', border: '2px solid #fff', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
                    ) : (
                        <>
                            <GoogleIcon />
                            <span>Google Account</span>
                        </>
                    )}
                </button>

                <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                    <p style={{ color: '#64748b', fontSize: '0.9375rem' }}>
                        {mode === 'login' ? "New to SamAgent? " : 'Already a member? '}
                        <button onClick={toggleMode} style={{ background: 'none', border: 'none', color: '#a78bfa', cursor: 'pointer', fontWeight: 600, fontSize: 'inherit', marginLeft: '0.25rem' }}
                            onMouseOver={e => e.currentTarget.style.textDecoration = 'underline'}
                            onMouseOut={e => e.currentTarget.style.textDecoration = 'none'}
                        >
                            {mode === 'login' ? 'Create Account' : 'Sign In'}
                        </button>
                    </p>
                </div>
            </div>

            <style>{`
                @keyframes modalSlideUp {
                    from { opacity: 0; transform: translateY(40px) scale(0.95); }
                    to { opacity: 1; transform: translateY(0) scale(1); }
                }
                @keyframes spin { to { transform: rotate(360deg); } }
            `}</style>
        </div>
    );
}

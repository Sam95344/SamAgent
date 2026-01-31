import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, Sparkles, ArrowLeft } from 'lucide-react';
import { authAPI } from '../lib/api';

const GoogleIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.2 4.53z" fill="#EA4335" />
    </svg>
);

export default function LoginPage({ onAuth }) {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const data = await authAPI.login(formData.email, formData.password);
            onAuth(data.user);
        } catch (err) {
            setError(err.message || 'Invalid credentials');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: '#0a0e1a' }}>
            {/* Left Side - Visual */}
            <div style={{
                flex: 1,
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                padding: '4rem',
                overflow: 'hidden',
                background: 'radial-gradient(circle at top right, #1e1b4b 0%, #0f172a 100%)'
            }} className="auth-visual-side">
                {/* Animated Orbs */}
                <div style={{ position: 'absolute', top: '-10%', right: '-10%', width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(139, 92, 246, 0.2) 0%, transparent 70%)', filter: 'blur(60px)', animation: 'float 10s infinite ease-in-out' }} />
                <div style={{ position: 'absolute', bottom: '-10%', left: '-10%', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(6, 182, 212, 0.2) 0%, transparent 70%)', filter: 'blur(60px)', animation: 'float 8s infinite ease-in-out reverse' }} />

                <div style={{ position: 'relative', maxWidth: '600px' }}>
                    <div className="animate-scale-in" style={{
                        width: '80px', height: '80px', borderRadius: '24px', background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '3rem', boxShadow: '0 0 60px -15px rgba(139, 92, 246, 0.5)'
                    }}>
                        <Sparkles size={40} className="text-white" />
                    </div>
                    <h1 style={{ fontSize: '4rem', fontWeight: 800, lineHeight: 1.1, marginBottom: '2rem' }}>
                        Welcome back to <br />
                        <span style={{
                            background: 'linear-gradient(135deg, #a78bfa 0%, #06b6d4 100%)',
                            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
                        }}>SamAgent</span>
                    </h1>
                    <p style={{ fontSize: '1.25rem', color: '#94a3b8', lineHeight: 1.6 }}>
                        Track your wealth, analyze spending, and achieve financial freedom with AI-driven insights.
                    </p>
                </div>
            </div>

            {/* Right Side - Form */}
            <div style={{
                width: '100%', maxWidth: '600px', background: 'rgba(17, 24, 39, 0.6)', backdropFilter: 'blur(20px)',
                display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '4rem', borderLeft: '1px solid rgba(255, 255, 255, 0.05)'
            }}>
                <a href="/" style={{
                    position: 'absolute', top: '2rem', right: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem',
                    color: '#94a3b8', textDecoration: 'none', fontSize: '0.9375rem', fontWeight: 600, transition: 'color 0.2s'
                }} onMouseOver={e => e.currentTarget.style.color = '#fff'} onMouseOut={e => e.currentTarget.style.color = '#94a3b8'}>
                    <ArrowLeft size={18} /> Back to Home
                </a>

                <div style={{ maxWidth: '400px', width: '100%', margin: '0 auto' }}>
                    <h2 className="animate-slide-up stagger-1" style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Sign In</h2>
                    <p className="animate-slide-up stagger-2" style={{ color: '#64748b', marginBottom: '3rem' }}>Enter your details to access your account.</p>

                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div className="input-group animate-slide-up stagger-3">
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: '#94a3b8' }}>Email</label>
                            <div style={{ position: 'relative' }}>
                                <Mail size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
                                <input type="email" placeholder="you@example.com" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })}
                                    style={{ width: '100%', padding: '1rem 1rem 1rem 3rem', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff' }} />
                            </div>
                        </div>

                        <div className="input-group animate-slide-up stagger-4">
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: '#94a3b8' }}>Password</label>
                            <div style={{ position: 'relative' }}>
                                <Lock size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
                                <input type={showPassword ? 'text' : 'password'} placeholder="••••••••" value={formData.password} onChange={e => setFormData({ ...formData, password: e.target.value })}
                                    style={{ width: '100%', padding: '1rem 3rem 1rem 3rem', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff' }} />
                                <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#64748b', cursor: 'pointer' }}>
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        {error && <div style={{ color: '#fb7185', fontSize: '0.875rem', background: 'rgba(244,63,94,0.1)', padding: '0.75rem', borderRadius: '8px' }}>{error}</div>}

                        <button type="submit" disabled={loading} className="animate-slide-up stagger-5 btn-primary" style={{
                            padding: '1rem', background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)', border: 'none', borderRadius: '12px',
                            color: '#fff', fontWeight: 600, fontSize: '1rem', cursor: loading ? 'wait' : 'pointer', opacity: loading ? 0.7 : 1
                        }}>
                            {loading ? 'Signing in...' : 'Sign In'}
                        </button>
                    </form>

                    <div style={{ marginTop: '2rem', textAlign: 'center', color: '#64748b' }}>
                        Don't have an account? <a href="/signup" style={{ color: '#a78bfa', textDecoration: 'none', fontWeight: 600 }}>Create Account</a>
                    </div>
                </div>
            </div >
            <style>{`
                @media (max-width: 1024px) {
                    .auth-visual-side { display: none !important; }
                    .auth-modal { max-width: 100% !important; }
                }
            `}</style>
        </div >
    );
}

import { useState } from 'react';
import { Mail, Lock, User, Eye, EyeOff, Sparkles, ArrowLeft } from 'lucide-react';
import { authAPI } from '../lib/api';

export default function SignupPage({ onAuth }) {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (!formData.name || !formData.email || !formData.password) {
            setError('All fields are required');
            setLoading(false);
            return;
        }

        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters');
            setLoading(false);
            return;
        }

        try {
            const data = await authAPI.register(formData.name, formData.email, formData.password);
            onAuth(data.user);
        } catch (err) {
            setError(err.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="signup-page" style={{ display: 'flex', minHeight: '100vh', background: '#0a0e1a' }}>
            {/* Left Side - Visual */}
            <div style={{
                flex: 1,
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                padding: '4rem',
                overflow: 'hidden',
                background: 'radial-gradient(circle at bottom left, #1e1b4b 0%, #0f172a 100%)'
            }} className="auth-visual-side">
                {/* Visuals similar to Login but tweaked */}
                <div style={{ position: 'absolute', top: '10%', left: '10%', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)', filter: 'blur(50px)' }} />

                <div style={{ position: 'relative', maxWidth: '600px' }}>
                    <h1 className="animate-scale-in" style={{ fontSize: '4rem', fontWeight: 800, lineHeight: 1.1, marginBottom: '2rem' }}>
                        Start your journey <br /> with <span style={{ color: '#06b6d4' }}>SamAgent</span>
                    </h1>
                    <div className="animate-slide-up stagger-2" style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                        <div style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.03)', borderRadius: '16px', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.05)' }}>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#fff', marginBottom: '0.5rem' }}>10k+</h3>
                            <p style={{ color: '#94a3b8' }}>Active Users</p>
                        </div>
                        <div style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.03)', borderRadius: '16px', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.05)' }}>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#fff', marginBottom: '0.5rem' }}>$2M+</h3>
                            <p style={{ color: '#94a3b8' }}>Tracked Assets</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="auth-form-side" style={{
                width: '100%', maxWidth: '600px', background: 'rgba(17, 24, 39, 0.6)', backdropFilter: 'blur(20px)',
                display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '4rem', borderLeft: '1px solid rgba(255, 255, 255, 0.05)'
            }}>
                <a href="/" className="auth-back-btn" style={{
                    position: 'absolute', top: '2rem', right: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem',
                    color: '#94a3b8', textDecoration: 'none', fontSize: '0.9375rem', fontWeight: 600, transition: 'color 0.2s'
                }} onMouseOver={e => e.currentTarget.style.color = '#fff'} onMouseOut={e => e.currentTarget.style.color = '#94a3b8'}>
                    <ArrowLeft size={18} /> Back to Home
                </a>

                <div className="auth-form-container" style={{ maxWidth: '400px', width: '100%', margin: '0 auto' }}>
                    <h2 className="animate-slide-up stagger-1 auth-title" style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Create Account</h2>
                    <p className="animate-slide-up stagger-2 auth-subtitle" style={{ color: '#64748b', marginBottom: '3rem' }}>Join thousands of users building wealth.</p>

                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div className="input-group animate-slide-up stagger-3">
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: '#94a3b8' }}>Full Name</label>
                            <div style={{ position: 'relative' }}>
                                <User size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
                                <input type="text" placeholder="John Doe" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    className="auth-input" style={{ width: '100%', padding: '1rem 1rem 1rem 3rem', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff' }} />
                            </div>
                        </div>

                        <div className="input-group animate-slide-up stagger-4">
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: '#94a3b8' }}>Email</label>
                            <div style={{ position: 'relative' }}>
                                <Mail size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
                                <input type="email" placeholder="you@example.com" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })}
                                    className="auth-input" style={{ width: '100%', padding: '1rem 1rem 1rem 3rem', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff' }} />
                            </div>
                        </div>

                        <div className="input-group animate-slide-up stagger-5">
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: '#94a3b8' }}>Password</label>
                            <div style={{ position: 'relative' }}>
                                <Lock size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
                                <input type={showPassword ? 'text' : 'password'} placeholder="••••••••" value={formData.password} onChange={e => setFormData({ ...formData, password: e.target.value })}
                                    className="auth-input" style={{ width: '100%', padding: '1rem 3rem 1rem 3rem', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff' }} />
                                <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#64748b', cursor: 'pointer' }}>
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        {error && <div style={{ color: '#fb7185', fontSize: '0.875rem', background: 'rgba(244,63,94,0.1)', padding: '0.75rem', borderRadius: '8px' }}>{error}</div>}

                        <button type="submit" disabled={loading} className="animate-slide-up stagger-5 btn-primary auth-submit-btn" style={{
                            padding: '1rem', background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)', border: 'none', borderRadius: '12px',
                            color: '#fff', fontWeight: 600, fontSize: '1rem', cursor: loading ? 'wait' : 'pointer', opacity: loading ? 0.7 : 1
                        }}>
                            {loading ? 'Create Account' : 'Sign Up'}
                        </button>
                    </form>

                    <div className="auth-footer" style={{ marginTop: '2rem', textAlign: 'center', color: '#64748b' }}>
                        Already have an account? <a href="/login" style={{ color: '#a78bfa', textDecoration: 'none', fontWeight: 600 }}>Sign In</a>
                    </div>
                </div>
            </div>
            <style>{`
                /* Base responsive container fix */
                .signup-page {
                    flex-direction: row;
                }
                
                /* Tablet Styles */
                @media (max-width: 1024px) {
                    .signup-page {
                        flex-direction: column !important;
                    }
                    .auth-visual-side { 
                        display: none !important; 
                    }
                    .auth-form-side { 
                        max-width: 100% !important; 
                        width: 100% !important;
                        border-left: none !important;
                        padding: 3rem 2rem !important;
                        min-height: 100vh !important;
                    }
                    .auth-back-btn {
                        position: relative !important;
                        top: auto !important;
                        right: auto !important;
                        left: auto !important;
                        margin-bottom: 2rem !important;
                        justify-content: flex-start !important;
                    }
                    .auth-form-container {
                        max-width: 450px !important;
                    }
                }
                
                /* Mobile Styles */
                @media (max-width: 640px) {
                    .signup-page {
                        flex-direction: column !important;
                    }
                    .auth-form-side {
                        padding: 2rem 1.25rem !important;
                    }
                    .auth-form-container {
                        max-width: 100% !important;
                        padding: 0 !important;
                    }
                    .auth-title {
                        font-size: 1.75rem !important;
                    }
                    .auth-subtitle {
                        font-size: 0.9rem !important;
                        margin-bottom: 2rem !important;
                    }
                    .auth-input {
                        padding: 0.875rem 0.875rem 0.875rem 2.75rem !important;
                        font-size: 16px !important;
                    }
                    .auth-submit-btn {
                        padding: 0.875rem !important;
                        font-size: 0.9375rem !important;
                    }
                    .auth-footer {
                        font-size: 0.875rem !important;
                    }
                    .input-group label {
                        font-size: 0.8rem !important;
                    }
                }
                
                /* Small Mobile Styles */
                @media (max-width: 375px) {
                    .auth-form-side {
                        padding: 1.5rem 1rem !important;
                    }
                    .auth-title {
                        font-size: 1.5rem !important;
                    }
                    .auth-subtitle {
                        font-size: 0.85rem !important;
                    }
                }
            `}</style>
        </div>
    );
}

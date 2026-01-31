import { useState, useEffect } from 'react';

export function Navbar({ onLogin, onSignup }) {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`glass-nav ${isScrolled ? 'scrolled' : ''}`} style={{
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            padding: isScrolled ? '0.625rem 3rem' : '1.5rem 3rem',
            borderBottom: isScrolled ? '1px solid rgba(139, 92, 246, 0.2)' : '1px solid transparent'
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1400px', margin: '0 auto' }}>
                <div style={{ cursor: 'pointer', gap: '0.875rem', display: 'flex', alignItems: 'center' }} onClick={() => window.location.href = '/'}>
                    <div style={{
                        width: isScrolled ? '40px' : '44px',
                        height: isScrolled ? '40px' : '44px',
                        borderRadius: '12px',
                        background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 0 20px -5px rgba(139, 92, 246, 0.5)',
                        transition: 'all 0.4s ease',
                        padding: '6px'
                    }}>
                        <img src="/logo.png" alt="SamAgent Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                    </div>
                    <span style={{
                        fontSize: isScrolled ? '1.5rem' : '1.75rem',
                        fontWeight: 800,
                        color: '#fff',
                        transition: 'all 0.4s ease'
                    }}>SamAgent</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }}>
                    <div className="nav-links" style={{ display: 'flex', gap: '1rem' }}>
                        <a href="/features" className="nav-link-box">Features</a>
                        <a href="/about" className="nav-link-box">About</a>
                        <a href="/how-it-works" className="nav-link-box">How it works</a>
                        <a href="/pricing" className="nav-link-box">Pricing</a>
                    </div>
                    <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
                        <a href="/login" className="nav-btn-login">
                            <span className="nav-btn-login-text">Log In</span>
                        </a>
                        <a href="/signup" className="nav-btn-signup">
                            <span className="nav-btn-signup-bg"></span>
                            <span className="nav-btn-signup-text">Get Started</span>
                            <span className="nav-btn-signup-shine"></span>
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    );
}

import { Twitter, Github, Linkedin, MessageCircle } from 'lucide-react';

export function Footer() {
    return (
        <footer style={{
            padding: '4rem 3rem 2rem',
            background: 'linear-gradient(180deg, rgba(10, 14, 26, 0.95) 0%, rgba(17, 24, 39, 0.98) 100%)',
            borderTop: '1px solid rgba(139, 92, 246, 0.15)',
            position: 'relative'
        }}>
            {/* Top gradient line */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                width: '60%',
                height: '1px',
                background: 'linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.5), rgba(6, 182, 212, 0.5), transparent)'
            }} />

            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '3rem', marginBottom: '3rem' }}>
                    {/* Brand Section */}
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                            <div style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '10px',
                                background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                boxShadow: '0 0 20px -5px rgba(139, 92, 246, 0.5)'
                            }}>
                                <img src="/logo.png" alt="SamAgent Logo" style={{ width: '24px', height: '24px', objectFit: 'contain' }} />
                            </div>
                            <span style={{ fontSize: '1.25rem', fontWeight: 700, color: '#fff' }}>SamAgent</span>
                        </div>
                        <p style={{ color: '#94a3b8', lineHeight: 1.7, marginBottom: '1.5rem', fontSize: '0.875rem', maxWidth: '280px' }}>
                            AI-powered financial companion. Smart wealth management with uncompromised privacy.
                        </p>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            {[<Twitter size={16} />, <Github size={16} />, <Linkedin size={16} />, <MessageCircle size={16} />].map((icon, i) => (
                                <div key={i} style={{
                                    width: '36px',
                                    height: '36px',
                                    borderRadius: '8px',
                                    background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(6, 182, 212, 0.05))',
                                    border: '1px solid rgba(139, 92, 246, 0.15)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#a78bfa',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease'
                                }}>{icon}</div>
                            ))}
                        </div>
                    </div>

                    {/* Links */}
                    <div>
                        <h5 style={{ color: '#fff', fontSize: '0.875rem', fontWeight: 600, marginBottom: '1rem', letterSpacing: '0.05em' }}>Product</h5>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                            {['Features', 'Pricing', 'Security', 'Roadmap'].map(link => (
                                <li key={link} style={{ marginBottom: '0.5rem' }}>
                                    <a href="#" style={{ color: '#94a3b8', fontSize: '0.875rem', textDecoration: 'none', transition: 'color 0.2s' }}>{link}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h5 style={{ color: '#fff', fontSize: '0.875rem', fontWeight: 600, marginBottom: '1rem', letterSpacing: '0.05em' }}>Company</h5>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                            {['About', 'Careers', 'Privacy', 'Contact'].map(link => (
                                <li key={link} style={{ marginBottom: '0.5rem' }}>
                                    <a href="#" style={{ color: '#94a3b8', fontSize: '0.875rem', textDecoration: 'none', transition: 'color 0.2s' }}>{link}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h5 style={{ color: '#fff', fontSize: '0.875rem', fontWeight: 600, marginBottom: '1rem', letterSpacing: '0.05em' }}>Resources</h5>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                            {['Blog', 'Help Center', 'API Docs', 'Community'].map(link => (
                                <li key={link} style={{ marginBottom: '0.5rem' }}>
                                    <a href="#" style={{ color: '#94a3b8', fontSize: '0.875rem', textDecoration: 'none', transition: 'color 0.2s' }}>{link}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingTop: '1.5rem',
                    borderTop: '1px solid rgba(139, 92, 246, 0.1)'
                }}>
                    <div style={{ color: '#64748b', fontSize: '0.8rem' }}>
                        © 2024 SamAgent AI Corp. All rights reserved.
                    </div>
                    <div style={{ display: 'flex', gap: '1.5rem' }}>
                        {['Privacy', 'Terms', 'GDPR'].map((link) => (
                            <a key={link} href="#" style={{ color: '#64748b', fontSize: '0.8rem', textDecoration: 'none' }}>{link}</a>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom gradient line */}
            <div style={{
                position: 'absolute',
                bottom: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                width: '40%',
                height: '2px',
                background: 'linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.4), rgba(6, 182, 212, 0.4), transparent)'
            }} />
        </footer>
    );
}

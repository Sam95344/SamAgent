import { Check, Sparkles, Star, Zap, Shield, Crown } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Footer } from '../components/Footer';

export default function Pricing({ onLogin, onSignup }) {
    const plans = [
        {
            name: 'Essential',
            price: '$0',
            period: 'forever',
            desc: 'Perfect for getting started with smart financial tracking.',
            features: ['Basic Analytics Dashboard', 'Manual Transaction Entry', 'Local Data Encryption', 'Community Support', 'Up to 100 Transactions'],
            button: 'Start Free',
            icon: <Star size={24} />,
            gradient: 'linear-gradient(135deg, #475569, #334155)',
            accent: '#94a3b8',
            borderColor: 'rgba(148, 163, 184, 0.2)'
        },
        {
            name: 'Pro',
            price: '$12',
            period: 'per month',
            desc: 'The ultimate toolkit for serious wealth builders.',
            features: ['Advanced AI Financial Coach', 'Auto-Sync Bank Accounts', 'Predictive Analysis Engine', 'Multi-Device Sync', 'Priority Email Support', 'Custom Reports & Exports', 'Unlimited Transactions'],
            button: 'Start 14-Day Free Trial',
            icon: <Zap size={24} />,
            gradient: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
            accent: '#8b5cf6',
            borderColor: 'rgba(139, 92, 246, 0.4)',
            featured: true
        },
        {
            name: 'Sentinel',
            price: '$29',
            period: 'per month',
            desc: 'Maximum privacy & institutional-grade tools.',
            features: ['Everything in Pro', 'Hardware Wallet Integration', 'Tax Optimization AI', 'White-Glove Onboarding', 'Early Access to Features', 'Dedicated Account Manager'],
            button: 'Contact Sales',
            icon: <Shield size={24} />,
            gradient: 'linear-gradient(135deg, #06b6d4, #0891b2)',
            accent: '#06b6d4',
            borderColor: 'rgba(6, 182, 212, 0.3)'
        }
    ];

    return (
        <div className="landing-page" style={{ position: 'relative', overflowX: 'hidden' }}>
            <div className="landing-gradient-bg" />

            {/* Hero Section */}
            <section style={{ padding: '9rem 3rem 5rem', textAlign: 'center' }}>
                <div className="animate-fade-in" style={{ maxWidth: '900px', margin: '0 auto' }}>
                    <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        padding: '0.6rem 1.25rem',
                        background: 'rgba(139, 92, 246, 0.1)',
                        border: '1px solid rgba(139, 92, 246, 0.25)',
                        borderRadius: '100px',
                        marginBottom: '2rem'
                    }}>
                        <Crown size={16} style={{ color: '#a78bfa' }} />
                        <span style={{ color: '#a78bfa', fontWeight: 600, fontSize: '0.9rem' }}>Simple Pricing</span>
                    </div>
                    <h1 style={{ fontSize: '4rem', fontWeight: 900, marginBottom: '1.5rem', letterSpacing: '-0.04em', lineHeight: 1.1 }}>
                        Choose Your <br /><span className="gradient-text">Financial Edge.</span>
                    </h1>
                    <p style={{ fontSize: '1.2rem', color: '#94a3b8', maxWidth: '600px', margin: '0 auto', lineHeight: 1.6 }}>
                        Start free, upgrade when you're ready. All plans include our core privacy-first technology.
                    </p>
                </div>
            </section>

            {/* Pricing Cards */}
            <section style={{ padding: '2rem 3rem 8rem' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', alignItems: 'stretch' }}>
                    {plans.map((p, i) => (
                        <div
                            key={i}
                            style={{
                                padding: p.featured ? '2.5rem' : '2.25rem',
                                borderRadius: '28px',
                                position: 'relative',
                                background: p.featured
                                    ? 'linear-gradient(180deg, rgba(139, 92, 246, 0.12) 0%, rgba(10, 14, 26, 0.95) 100%)'
                                    : 'linear-gradient(180deg, rgba(30, 41, 59, 0.6) 0%, rgba(17, 24, 39, 0.8) 100%)',
                                border: `1px solid ${p.borderColor}`,
                                transform: p.featured ? 'scale(1.03)' : 'none',
                                zIndex: p.featured ? 2 : 1,
                                boxShadow: p.featured
                                    ? '0 30px 80px -20px rgba(139, 92, 246, 0.25), 0 0 0 1px rgba(139, 92, 246, 0.1)'
                                    : '0 20px 50px -20px rgba(0, 0, 0, 0.3)',
                                display: 'flex',
                                flexDirection: 'column'
                            }}
                        >
                            {/* Featured Badge */}
                            {p.featured && (
                                <div style={{
                                    position: 'absolute',
                                    top: '-14px',
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)',
                                    padding: '0.4rem 1.25rem',
                                    borderRadius: '100px',
                                    fontSize: '0.75rem',
                                    fontWeight: 700,
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.05em',
                                    color: 'white',
                                    boxShadow: '0 8px 20px -5px rgba(139, 92, 246, 0.4)'
                                }}>
                                    ⭐ Most Popular
                                </div>
                            )}

                            {/* Plan Header */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', marginBottom: '1.25rem' }}>
                                <div style={{
                                    width: '48px',
                                    height: '48px',
                                    borderRadius: '14px',
                                    background: p.gradient,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'white',
                                    boxShadow: `0 10px 25px -5px ${p.accent}50`
                                }}>
                                    {p.icon}
                                </div>
                                <div>
                                    <h3 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#fff', marginBottom: '0.1rem' }}>{p.name}</h3>
                                    <div style={{ fontSize: '0.75rem', color: p.accent, fontWeight: 500 }}>
                                        {p.featured ? 'Best Value' : p.name === 'Essential' ? 'Free Forever' : 'Enterprise'}
                                    </div>
                                </div>
                            </div>

                            {/* Price */}
                            <div style={{ marginBottom: '1rem' }}>
                                <span style={{ fontSize: '2.75rem', fontWeight: 900, color: '#fff' }}>{p.price}</span>
                                <span style={{ fontSize: '0.95rem', color: '#64748b', marginLeft: '0.5rem' }}>/{p.period}</span>
                            </div>

                            {/* Description */}
                            <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.5, marginBottom: '1.5rem' }}>{p.desc}</p>

                            {/* Divider */}
                            <div style={{ height: '1px', background: `linear-gradient(90deg, transparent, ${p.accent}30, transparent)`, marginBottom: '1.5rem' }}></div>

                            {/* Features */}
                            <div style={{ flex: 1, marginBottom: '1.5rem' }}>
                                {p.features.map((f, fi) => (
                                    <div key={fi} style={{
                                        display: 'flex',
                                        gap: '0.75rem',
                                        marginBottom: '0.875rem',
                                        alignItems: 'center'
                                    }}>
                                        <div style={{
                                            width: '20px',
                                            height: '20px',
                                            borderRadius: '6px',
                                            background: `${p.accent}20`,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            flexShrink: 0
                                        }}>
                                            <Check size={12} style={{ color: p.accent }} />
                                        </div>
                                        <span style={{ color: '#e2e8f0', fontSize: '0.875rem' }}>{f}</span>
                                    </div>
                                ))}
                            </div>

                            {/* CTA Button */}
                            <button
                                onClick={onSignup}
                                style={{
                                    width: '100%',
                                    padding: '1rem',
                                    borderRadius: '14px',
                                    border: p.featured ? 'none' : `1px solid ${p.borderColor}`,
                                    background: p.featured
                                        ? 'linear-gradient(135deg, #8b5cf6, #7c3aed)'
                                        : 'rgba(255, 255, 255, 0.03)',
                                    color: p.featured ? 'white' : '#e2e8f0',
                                    fontSize: '0.95rem',
                                    fontWeight: 600,
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    boxShadow: p.featured ? '0 10px 30px -5px rgba(139, 92, 246, 0.4)' : 'none'
                                }}
                            >
                                {p.button}
                            </button>
                        </div>
                    ))}
                </div>
            </section>

            {/* Trust Section */}
            <section style={{ padding: '4rem 3rem', textAlign: 'center', background: 'rgba(139, 92, 246, 0.02)' }}>
                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem', color: '#fff' }}>
                        Trusted by 50,000+ Users
                    </h3>
                    <p style={{ color: '#94a3b8', fontSize: '1rem', marginBottom: '2rem' }}>
                        Join thousands who've taken control of their finances with SamAgent
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem', flexWrap: 'wrap' }}>
                        {['🔒 Bank-Level Security', '🚀 24/7 AI Support', '💯 30-Day Guarantee'].map((item, i) => (
                            <div key={i} style={{ color: '#a78bfa', fontSize: '0.95rem', fontWeight: 500 }}>{item}</div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />

            <style>{`
                .scrolled { background: rgba(10, 14, 26, 0.9) !important; backdrop-filter: blur(24px) !important; }
                .gradient-text {
                    background: linear-gradient(135deg, #8b5cf6, #06b6d4);
                    -webkit-background-clip: text;
                    background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
            `}</style>
        </div>
    );
}

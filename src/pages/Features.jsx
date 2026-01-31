import { TrendingUp, Bot, Shield, Zap, Lock, Globe, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Footer } from '../components/Footer';

export default function Features({ onLogin, onSignup }) {
    const featureList = [
        {
            icon: <Bot size={32} />,
            title: 'Neural Financial Coach',
            desc: 'Our proprietary LLM analyzes your spending patterns locally to provide context-aware saving strategies.',
            accent: '#8b5cf6'
        },
        {
            icon: <Shield size={32} />,
            title: 'Quantum-Safe Privacy',
            desc: 'Bank-level encryption that stays on your device. We use zero-knowledge architecture for total anonymity.',
            accent: '#06b6d4'
        },
        {
            icon: <Zap size={32} />,
            title: 'Real-time Pulse',
            desc: 'Get sub-second updates on your net worth and budget health across all your connected accounts.',
            accent: '#f472b6'
        },
        {
            icon: <Lock size={32} />,
            title: 'Biometric Security',
            desc: 'Secure your financial life with hardware-level authentication and advanced passkey support.',
            accent: '#10b981'
        },
        {
            icon: <Globe size={32} />,
            title: 'Global Currency Engine',
            desc: 'Interact with 150+ currencies with real-time institutional exchange rates and zero hidden fees.',
            accent: '#f59e0b'
        },
        {
            icon: <TrendingUp size={32} />,
            title: 'Predictive Wealth',
            desc: 'Visual forecasting that uses historical data to project your financial future up to 10 years ahead.',
            accent: '#ef4444'
        }
    ];

    return (
        <div className="landing-page" style={{ position: 'relative', overflowX: 'hidden' }}>
            <div className="landing-gradient-bg" />

            <section style={{ padding: '10rem 3rem 6rem', textAlign: 'center' }}>
                <div className="animate-fade-in" style={{ maxWidth: '900px', margin: '0 auto' }}>
                    <div className="hero-badge" style={{ marginBottom: '2rem' }}>Core Capabilities</div>
                    <h1 style={{ fontSize: '4.5rem', fontWeight: 900, marginBottom: '2rem', letterSpacing: '-0.04em' }}>
                        Engineered for <br /><span className="gradient-text">Elite Finance.</span>
                    </h1>
                    <p className="text-slate-400" style={{ fontSize: '1.25rem', maxWidth: '650px', margin: '0 auto' }}>
                        Every feature in SamAgent is meticulously crafted to give you a psychological and analytical edge in wealth management.
                    </p>
                </div>
            </section>

            <section style={{ padding: '4rem 3rem 10rem' }}>
                <div style={{ maxWidth: '1300px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2.5rem' }}>
                    {featureList.map((f, i) => (
                        <div key={i} className="glass-card h-hover-up" style={{ padding: '3rem', borderRadius: '32px' }}>
                            <div style={{
                                width: '64px', height: '64px', borderRadius: '20px',
                                background: `${f.accent}15`, color: f.accent,
                                display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem'
                            }}>
                                {f.icon}
                            </div>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem' }}>{f.title}</h3>
                            <p className="text-slate-400" style={{ lineHeight: 1.7 }}>{f.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            <Footer />

            <style>{`
        .scrolled { background: rgba(10, 14, 26, 0.9) !important; backdrop-filter: blur(24px) !important; }
        .text-primary { color: #a78bfa !important; }
        .hover-text-primary:hover { color: #a78bfa !important; }
        .h-hover-up { transition: all 0.3s ease; }
        .h-hover-up:hover { transform: translateY(-10px); border-color: rgba(139, 92, 246, 0.3) !important; }
      `}</style>
        </div>
    );
}

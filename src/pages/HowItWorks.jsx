import { ArrowRight, Search, Cpu, BarChart3, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Footer } from '../components/Footer';

export default function HowItWorks({ onLogin, onSignup }) {
    const steps = [
        {
            icon: <Search size={28} />,
            title: '1. Intelligent Discovery',
            desc: 'Seamlessly connect your accounts or import transactions. Our localized AI scouts for patterns, hidden fees, and optimization opportunities.',
            color: '#8b5cf6'
        },
        {
            icon: <Cpu size={28} />,
            title: '2. Localized Processing',
            desc: 'Your data is analyzed directly on your device using ultra-fast neural processing. Nothing is sent to external servers, ensuring 100% privacy.',
            color: '#06b6d4'
        },
        {
            icon: <BarChart3 size={28} />,
            title: '3. Strategic Orchestration',
            desc: 'Receive personalized wealth blueprints, real-time budget adjustments, and predictive insights to master your financial destiny.',
            color: '#f472b6'
        }
    ];

    return (
        <div className="landing-page" style={{ position: 'relative', overflowX: 'hidden' }}>
            <div className="landing-gradient-bg" />

            <section style={{ padding: '10rem 3rem 6rem', textAlign: 'center' }}>
                <div className="animate-fade-in" style={{ maxWidth: '900px', margin: '0 auto' }}>
                    <div className="hero-badge" style={{ marginBottom: '2rem' }}>Execution Blueprint</div>
                    <h1 style={{ fontSize: '4.5rem', fontWeight: 900, marginBottom: '2rem', letterSpacing: '-0.04em' }}>
                        Sophistication in <br /><span className="gradient-text">Every Step.</span>
                    </h1>
                    <p className="text-slate-400" style={{ fontSize: '1.25rem', maxWidth: '650px', margin: '0 auto' }}>
                        SamAgent isn't just an app—it's a private financial infrastructure that works tirelessly to build your wealth while you sleep.
                    </p>
                </div>
            </section>

            <section style={{ padding: '4rem 3rem 10rem' }}>
                <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                    {steps.map((s, i) => (
                        <div key={i} style={{ display: 'flex', gap: '4rem', marginBottom: '6rem', alignItems: 'center', flexDirection: i % 2 === 0 ? 'row' : 'row-reverse' }}>
                            <div style={{ flex: 1 }}>
                                <div style={{
                                    width: '80px', height: '80px', borderRadius: '24px',
                                    background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)', color: 'white',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2.5rem',
                                    boxShadow: '0 20px 40px -10px rgba(139, 92, 246, 0.4)'
                                }}>
                                    {s.icon}
                                </div>
                                <h3 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '1.5rem' }}>{s.title}</h3>
                                <p className="text-slate-400" style={{ fontSize: '1.25rem', lineHeight: 1.6 }}>{s.desc}</p>
                            </div>
                            <div style={{ flex: 1 }}>
                                <div className="glass-card" style={{ height: '300px', borderRadius: '32px', border: '1px solid rgba(255,255,255,0.08)', position: 'relative', overflow: 'hidden', padding: '2rem' }}>
                                    <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(circle at center, ${s.color}15 0%, transparent 70%)` }} />

                                    {/* Step 1 - Discovery Content */}
                                    {i === 0 && (
                                        <div style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                            <div style={{ fontSize: '0.75rem', color: '#8b5cf6', fontWeight: 600, letterSpacing: '0.1em' }}>DATA SOURCES</div>
                                            {['Bank Account', 'Credit Cards', 'Investments', 'Crypto Wallet'].map((item, idx) => (
                                                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.75rem 1rem', background: 'rgba(139, 92, 246, 0.08)', borderRadius: '12px', border: '1px solid rgba(139, 92, 246, 0.15)' }}>
                                                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 8px #10b981' }}></div>
                                                    <span style={{ color: '#e2e8f0', fontSize: '0.9rem' }}>{item}</span>
                                                    <span style={{ marginLeft: 'auto', color: '#10b981', fontSize: '0.75rem' }}>Connected</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {/* Step 2 - Processing Content */}
                                    {i === 1 && (
                                        <div style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1.5rem' }}>
                                            <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(135deg, #06b6d4, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 40px rgba(6, 182, 212, 0.4)' }}>
                                                <Cpu size={36} style={{ color: 'white' }} />
                                            </div>
                                            <div style={{ textAlign: 'center' }}>
                                                <div style={{ color: '#06b6d4', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em', marginBottom: '0.5rem' }}>LOCAL AI ENGINE</div>
                                                <div style={{ color: '#e2e8f0', fontSize: '1.25rem', fontWeight: 700 }}>Processing on Device</div>
                                                <div style={{ color: '#64748b', fontSize: '0.85rem', marginTop: '0.5rem' }}>Zero data leaves your phone</div>
                                            </div>
                                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                {[1, 2, 3].map(dot => (
                                                    <div key={dot} style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#06b6d4', animation: `pulse ${1 + dot * 0.2}s ease infinite` }}></div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Step 3 - Orchestration Content */}
                                    {i === 2 && (
                                        <div style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                            <div style={{ fontSize: '0.75rem', color: '#f472b6', fontWeight: 600, letterSpacing: '0.1em' }}>YOUR INSIGHTS</div>
                                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                                                <div style={{ padding: '1rem', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '12px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                                                    <div style={{ color: '#64748b', fontSize: '0.7rem' }}>Savings Rate</div>
                                                    <div style={{ color: '#10b981', fontSize: '1.5rem', fontWeight: 700 }}>24.5%</div>
                                                </div>
                                                <div style={{ padding: '1rem', background: 'rgba(139, 92, 246, 0.1)', borderRadius: '12px', border: '1px solid rgba(139, 92, 246, 0.2)' }}>
                                                    <div style={{ color: '#64748b', fontSize: '0.7rem' }}>Goal Progress</div>
                                                    <div style={{ color: '#a78bfa', fontSize: '1.5rem', fontWeight: 700 }}>78%</div>
                                                </div>
                                            </div>
                                            <div style={{ padding: '1rem', background: 'rgba(244, 114, 182, 0.08)', borderRadius: '12px', border: '1px solid rgba(244, 114, 182, 0.2)' }}>
                                                <div style={{ color: '#f472b6', fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.5rem' }}>💡 AI Suggestion</div>
                                                <div style={{ color: '#e2e8f0', fontSize: '0.85rem', lineHeight: 1.5 }}>Reduce dining expenses by 15% to reach your vacation goal 2 months earlier!</div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section style={{ padding: '8rem 3rem', background: 'rgba(139, 92, 246, 0.03)', textAlign: 'center' }}>
                <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '3rem' }}>Ready to optimize your future?</h2>
                <button onClick={onSignup} className="btn btn-primary btn-lg" style={{ minWidth: '240px' }}>
                    Start Now <ArrowRight size={20} />
                </button>
            </section>

            <Footer />

            <style>{`
        .scrolled { background: rgba(10, 14, 26, 0.9) !important; backdrop-filter: blur(24px) !important; }
        .text-primary { color: #a78bfa !important; }
        .hover-text-primary:hover { color: #a78bfa !important; }
      `}</style>
        </div>
    );
}

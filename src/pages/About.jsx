import { Sparkles, Shield, Heart, Users, Target, Github, Linkedin, Instagram, Code, Rocket, Zap, Sparkle } from 'lucide-react';
import founderPhoto from '../assets/shamsher.jpg';
import { Footer } from '../components/Footer';

export default function About({ onLogin, onSignup }) {
    return (
        <div className="landing-page" style={{ position: 'relative', overflowX: 'hidden' }}>
            <div className="landing-gradient-bg" />

            {/* Floating Particles Background */}
            <div className="particles-bg">
                <div className="particle particle-1"></div>
                <div className="particle particle-2"></div>
                <div className="particle particle-3"></div>
            </div>

            <section style={{ padding: '8rem 3rem 4rem', textAlign: 'center' }}>
                <div className="animate-slide-up" style={{ maxWidth: '900px', margin: '0 auto' }}>
                    <div className="hero-badge animate-scale-in" style={{ marginBottom: '2rem' }}>
                        <Heart size={14} className="heart-pulse" />
                        <span>Built with Passion for Privacy</span>
                    </div>
                    <h1 className="about-hero-title" style={{ fontSize: '4.5rem', fontWeight: 900, marginBottom: '2rem', letterSpacing: '-0.04em', lineHeight: 1.1 }}>
                        Our Mission is <br /><span className="gradient-text-hero animated-gradient">Financial Freedom.</span>
                    </h1>
                    <p className="animate-slide-up stagger-2" style={{ fontSize: '1.35rem', color: '#94a3b8', lineHeight: 1.7, marginBottom: '3rem', maxWidth: '700px', margin: '0 auto' }}>
                        SamAgent was born out of a simple idea: that managing your wealth should be intelligent, private, and accessible to everyone. We're rebuilding financial tools from the ground up.
                    </p>
                </div>
            </section>

            {/* Founder Section - Enhanced */}
            <section style={{ padding: '4rem 3rem 6rem', textAlign: 'center' }}>
                <div style={{ maxWidth: '700px', margin: '0 auto' }}>
                    <h2 className="animate-slide-up" style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '3.5rem', letterSpacing: '-0.02em' }}>
                        Meet the <span className="gradient-text-hero">Visionary</span>
                    </h2>

                    {/* Founder Card with FULL inline styles */}
                    <div style={{
                        background: 'linear-gradient(135deg, #8b5cf6, #06b6d4, #f472b6)',
                        padding: '3px',
                        borderRadius: '24px',
                        marginBottom: '2rem'
                    }}>
                        <div style={{
                            background: 'rgba(10, 14, 26, 0.95)',
                            borderRadius: '22px',
                            padding: '3rem',
                            textAlign: 'center'
                        }}>
                            {/* Photo */}
                            <div style={{
                                display: 'inline-block',
                                width: '180px',
                                height: '180px',
                                borderRadius: '50%',
                                padding: '4px',
                                background: 'linear-gradient(135deg, #8b5cf6, #06b6d4, #f472b6)',
                                boxShadow: '0 0 50px rgba(139, 92, 246, 0.5)',
                                marginBottom: '1.5rem'
                            }}>
                                <img
                                    src={founderPhoto}
                                    alt="Shamshad Alam"
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        borderRadius: '50%',
                                        objectFit: 'cover',
                                        border: '4px solid #0a0e1a',
                                        display: 'block'
                                    }}
                                />
                            </div>

                            {/* Name & Role */}
                            <h3 style={{ fontSize: '2rem', fontWeight: 800, color: '#fff', marginBottom: '0.5rem' }}>
                                Shamshad Alam
                            </h3>
                            <p style={{ color: '#a78bfa', fontWeight: 600, fontSize: '1.1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                                <Code size={16} />
                                Founder & Full-Stack Developer
                            </p>
                            <p style={{ color: '#94a3b8', lineHeight: 1.7, maxWidth: '450px', margin: '0 auto 2rem', fontSize: '1rem' }}>
                                Passionate about building AI-powered financial tools that respect your privacy and empower your financial journey. Open source enthusiast.
                            </p>

                            {/* Social Links */}
                            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                                <a
                                    href="https://github.com/Sam95344"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        padding: '0.85rem 1.5rem',
                                        borderRadius: '14px',
                                        fontWeight: 600,
                                        textDecoration: 'none',
                                        fontSize: '0.95rem',
                                        background: 'rgba(255, 255, 255, 0.08)',
                                        color: '#fff',
                                        border: '1px solid rgba(255, 255, 255, 0.15)',
                                        transition: 'all 0.3s ease'
                                    }}
                                >
                                    <Github size={20} />
                                    <span>GitHub</span>
                                </a>
                                <a
                                    href="https://www.linkedin.com/in/shamshadalam8084/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        padding: '0.85rem 1.5rem',
                                        borderRadius: '14px',
                                        fontWeight: 600,
                                        textDecoration: 'none',
                                        fontSize: '0.95rem',
                                        background: 'rgba(10, 102, 194, 0.2)',
                                        color: '#60a5fa',
                                        border: '1px solid rgba(10, 102, 194, 0.3)',
                                        transition: 'all 0.3s ease'
                                    }}
                                >
                                    <Linkedin size={20} />
                                    <span>LinkedIn</span>
                                </a>
                                <a
                                    href="https://www.instagram.com/ig_sam_8084/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        padding: '0.85rem 1.5rem',
                                        borderRadius: '14px',
                                        fontWeight: 600,
                                        textDecoration: 'none',
                                        fontSize: '0.95rem',
                                        background: 'linear-gradient(135deg, rgba(131, 58, 180, 0.2), rgba(253, 29, 29, 0.2))',
                                        color: '#f472b6',
                                        border: '1px solid rgba(225, 48, 108, 0.3)',
                                        transition: 'all 0.3s ease'
                                    }}
                                >
                                    <Instagram size={20} />
                                    <span>Instagram</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section - Enhanced */}
            <section style={{ padding: '4rem 3rem 8rem' }}>
                <h2 className="animate-slide-up" style={{ fontSize: '2.5rem', fontWeight: 800, textAlign: 'center', marginBottom: '4rem' }}>
                    What <span className="gradient-text-hero">Drives Us</span>
                </h2>
                <div className="values-grid" style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <div className="value-card animate-slide-up stagger-1">
                        <div className="value-icon value-icon-purple">
                            <Target size={28} />
                        </div>
                        <h3>Our Vision</h3>
                        <p>Empower individuals with AI-driven insights previously only available to professional wealth managers.</p>
                    </div>

                    <div className="value-card animate-slide-up stagger-2">
                        <div className="value-icon value-icon-cyan">
                            <Shield size={28} />
                        </div>
                        <h3>Privacy First</h3>
                        <p>Your financial data is sacred. Zero-cloud architecture means your data never leaves your device.</p>
                    </div>

                    <div className="value-card animate-slide-up stagger-3">
                        <div className="value-icon value-icon-pink">
                            <Users size={28} />
                        </div>
                        <h3>Community Driven</h3>
                        <p>Built by developers who believe in open-source values and putting users first. Always.</p>
                    </div>
                </div>
            </section>

            <Footer />

            <style>{`
        /* Animated Gradient Text */
        .gradient-text-hero {
          background: linear-gradient(135deg, #8b5cf6, #06b6d4, #f472b6, #8b5cf6);
          background-size: 300% 300%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: gradientShift 5s ease infinite;
        }
        
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.6rem 1.25rem;
          background: rgba(139, 92, 246, 0.1);
          border: 1px solid rgba(139, 92, 246, 0.25);
          border-radius: 100px;
          color: #a78bfa;
          font-weight: 600;
          font-size: 0.9rem;
          backdrop-filter: blur(10px);
        }
        
        .heart-pulse {
          animation: heartBeat 1.5s ease infinite;
        }
        
        @keyframes heartBeat {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.2); }
        }
        
        /* Particles Background */
        .particles-bg {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
          z-index: -1;
        }
        
        .particle {
          position: absolute;
          border-radius: 50%;
          opacity: 0.3;
          animation: floatParticle 20s ease-in-out infinite;
        }
        
        .particle-1 {
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, rgba(139, 92, 246, 0.3), transparent);
          top: 20%;
          left: 10%;
        }
        
        .particle-2 {
          width: 200px;
          height: 200px;
          background: radial-gradient(circle, rgba(6, 182, 212, 0.2), transparent);
          top: 60%;
          right: 15%;
          animation-delay: -5s;
        }
        
        .particle-3 {
          width: 150px;
          height: 150px;
          background: radial-gradient(circle, rgba(244, 114, 182, 0.2), transparent);
          bottom: 20%;
          left: 50%;
          animation-delay: -10s;
        }
        
        @keyframes floatParticle {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(30px, -30px); }
          50% { transform: translate(-20px, 20px); }
          75% { transform: translate(20px, 30px); }
        }
        
        /* Enhanced Founder Card */
        .founder-card-enhanced {
          position: relative;
          border-radius: 24px;
          padding: 3px;
          background: linear-gradient(135deg, #8b5cf6, #06b6d4, #f472b6, #8b5cf6);
          background-size: 400% 400%;
          animation: borderGlow 6s ease infinite;
        }
        
        @keyframes borderGlow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .founder-card-glow {
          position: absolute;
          inset: -20px;
          background: radial-gradient(ellipse at center, rgba(139, 92, 246, 0.2), transparent 70%);
          filter: blur(40px);
          z-index: -1;
        }
        
        .founder-card-content {
          background: rgba(10, 14, 26, 0.95);
          backdrop-filter: blur(20px);
          border-radius: 22px;
          padding: 3rem;
        }
        
        .founder-photo-container {
          position: relative;
          display: inline-block;
        }
        
        .founder-photo-ring {
          position: absolute;
          inset: -10px;
          border-radius: 50%;
          border: 2px dashed rgba(139, 92, 246, 0.3);
          animation: spinSlow 20s linear infinite;
        }
        
        @keyframes spinSlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .founder-photo-wrapper-enhanced {
          width: 180px;
          height: 180px;
          border-radius: 50%;
          padding: 4px;
          background: linear-gradient(135deg, #8b5cf6, #06b6d4, #f472b6);
          box-shadow: 0 0 50px rgba(139, 92, 246, 0.5);
        }
        
        .founder-photo {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          object-fit: cover;
          border: 4px solid #0a0e1a;
        }
        
        .founder-status {
          position: absolute;
          bottom: -10px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.4rem 1rem;
          background: rgba(16, 185, 129, 0.15);
          border: 1px solid rgba(16, 185, 129, 0.3);
          border-radius: 100px;
          font-size: 0.75rem;
          color: #10b981;
          font-weight: 600;
          white-space: nowrap;
        }
        
        .status-dot {
          width: 8px;
          height: 8px;
          background: #10b981;
          border-radius: 50%;
          animation: pulse 2s ease infinite;
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.5); }
          50% { opacity: 0.8; box-shadow: 0 0 0 8px rgba(16, 185, 129, 0); }
        }
        
        .founder-name {
          font-size: 2rem;
          font-weight: 800;
          color: #fff;
          margin-bottom: 0.5rem;
          letter-spacing: -0.02em;
        }
        
        .founder-role {
          display: inline-flex;
          align-items: center;
          color: #a78bfa;
          font-weight: 600;
          font-size: 1.1rem;
          margin-bottom: 1rem;
        }
        
        .founder-bio {
          color: #94a3b8;
          line-height: 1.7;
          max-width: 450px;
          margin: 0 auto 2rem;
          font-size: 1rem;
        }
        
        /* Enhanced Social Buttons */
        .social-links-container {
          display: flex;
          justify-content: center;
          gap: 1rem;
        }
        
        .social-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.85rem 1.75rem;
          border-radius: 14px;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          font-size: 0.95rem;
          position: relative;
          overflow: hidden;
        }
        
        .social-btn-icon {
          opacity: 0;
          transform: translateX(-10px);
          transition: all 0.3s ease;
        }
        
        .social-btn:hover .social-btn-icon {
          opacity: 1;
          transform: translateX(0);
        }
        
        .github-btn {
          background: rgba(255, 255, 255, 0.05);
          color: #fff;
          border: 1px solid rgba(255, 255, 255, 0.15);
        }
        
        .github-btn:hover {
          background: #fff;
          color: #0a0e1a;
          transform: translateY(-4px);
          box-shadow: 0 15px 40px rgba(255, 255, 255, 0.2);
        }
        
        .linkedin-btn {
          background: rgba(10, 102, 194, 0.15);
          color: #60a5fa;
          border: 1px solid rgba(10, 102, 194, 0.3);
        }
        
        .linkedin-btn:hover {
          background: #0a66c2;
          color: #fff;
          transform: translateY(-4px);
          box-shadow: 0 15px 40px rgba(10, 102, 194, 0.4);
        }
        
        .instagram-btn {
          background: linear-gradient(135deg, rgba(131, 58, 180, 0.2), rgba(253, 29, 29, 0.2), rgba(252, 176, 69, 0.2));
          color: #f472b6;
          border: 1px solid rgba(225, 48, 108, 0.3);
        }
        
        .instagram-btn:hover {
          background: linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045);
          color: #fff;
          transform: translateY(-4px);
          box-shadow: 0 15px 40px rgba(225, 48, 108, 0.4);
        }
        
        /* Values Grid */
        .values-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
        }
        
        @media (max-width: 900px) {
          .values-grid {
            grid-template-columns: 1fr;
          }
        }
        
        .value-card {
          background: rgba(15, 23, 42, 0.6);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 20px;
          padding: 2.5rem;
          text-align: center;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .value-card:hover {
          transform: translateY(-8px);
          border-color: rgba(139, 92, 246, 0.3);
          box-shadow: 0 20px 40px -15px rgba(139, 92, 246, 0.3);
        }
        
        .value-icon {
          width: 64px;
          height: 64px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1.5rem;
        }
        
        .value-icon-purple {
          background: rgba(139, 92, 246, 0.15);
          color: #a78bfa;
        }
        
        .value-icon-cyan {
          background: rgba(6, 182, 212, 0.15);
          color: #06b6d4;
        }
        
        .value-icon-pink {
          background: rgba(244, 114, 182, 0.15);
          color: #f472b6;
        }
        
        .value-card h3 {
          font-size: 1.4rem;
          font-weight: 700;
          margin-bottom: 1rem;
          color: #fff;
        }
        
        .value-card p {
          color: #94a3b8;
          line-height: 1.6;
          font-size: 0.95rem;
        }
      `}</style>
        </div>
    );
}

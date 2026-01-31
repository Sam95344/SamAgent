import { X } from 'lucide-react';
import { useEffect } from 'react';

export function Modal({ isOpen, onClose, title, children }) {
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) {
            window.addEventListener('keydown', handleEsc);
            document.body.style.overflow = 'hidden';
        }
        return () => {
            window.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = 'auto';
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem'
        }}>
            {/* Backdrop */}
            <div
                onClick={onClose}
                style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'rgba(0, 0, 0, 0.7)',
                    backdropFilter: 'blur(8px)',
                    WebkitBackdropFilter: 'blur(8px)'
                }}
            />

            {/* Modal Content */}
            <div
                className="animate-in"
                style={{
                    position: 'relative',
                    width: '100%',
                    maxWidth: '480px',
                    background: 'linear-gradient(135deg, rgba(17, 24, 39, 0.98), rgba(10, 14, 26, 0.99))',
                    border: '1px solid rgba(139, 92, 246, 0.2)',
                    borderRadius: '20px',
                    padding: '2rem',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.6), 0 0 60px -15px rgba(139, 92, 246, 0.3)'
                }}
            >
                {/* Header */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '1.5rem'
                }}>
                    <h2 style={{
                        fontSize: '1.375rem',
                        fontWeight: 700,
                        background: 'linear-gradient(135deg, #f8fafc, #a78bfa)',
                        WebkitBackgroundClip: 'text',
                        backgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}>
                        {title}
                    </h2>
                    <button
                        onClick={onClose}
                        style={{
                            width: '36px',
                            height: '36px',
                            borderRadius: '10px',
                            background: 'rgba(100, 116, 139, 0.1)',
                            border: '1px solid rgba(148, 163, 184, 0.1)',
                            color: '#94a3b8',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            transition: 'all 0.2s'
                        }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.background = 'rgba(244, 63, 94, 0.1)';
                            e.currentTarget.style.color = '#fb7185';
                            e.currentTarget.style.borderColor = 'rgba(244, 63, 94, 0.2)';
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.background = 'rgba(100, 116, 139, 0.1)';
                            e.currentTarget.style.color = '#94a3b8';
                            e.currentTarget.style.borderColor = 'rgba(148, 163, 184, 0.1)';
                        }}
                    >
                        <X size={18} />
                    </button>
                </div>

                {children}
            </div>
        </div>
    );
}

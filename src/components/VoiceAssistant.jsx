import { useState, useEffect, useCallback, useRef } from 'react';
import { Mic, MicOff, X, Sparkles, Check, AlertCircle } from 'lucide-react';
import { useFinance } from '../context/FinanceContext';

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

export function VoiceAssistant() {
    const { addTransaction, getSummary } = useFinance();
    const [isSupported, setIsSupported] = useState(true);
    const [permissionError, setPermissionError] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [isActivated, setIsActivated] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [status, setStatus] = useState('idle'); // idle, listening, processing, success, error
    const [lastAction, setLastAction] = useState(null);
    const [aiResponse, setAiResponse] = useState('');
    const recognitionRef = useRef(null);
    const wakeWordRecognitionRef = useRef(null);

    const speak = (text) => {
        if (!window.speechSynthesis) return;
        window.speechSynthesis.cancel(); // Stop any current speaking
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'hi-IN'; // Default to Hindi-friendly voice
        utterance.rate = 1.0;
        utterance.pitch = 1.0;
        window.speechSynthesis.speak(utterance);
    };

    useEffect(() => {
        if (!SpeechRecognition) {
            setIsSupported(false);
        }
    }, []);

    const parseCommand = (input) => {
        const text = input.trim().toLowerCase();
        if (!text) return null;

        const { income, expense, balance } = getSummary();
        const formatCurrencyInText = (val) => `${val} rupees`.replace('$', '');

        // 1. INQUIRY DETECTION (Balance, Spending, Budget)
        if (text.includes('balance') || text.includes('bacha') || text.includes('kitne paise')) {
            return {
                type: 'inquiry',
                message: `Bhai, aapka current balance ${formatCurrencyInText(balance)} hai.`,
                speech: `Bhai, aapka current balance ${balance} rupees hai.`
            };
        }

        if (text.includes('spent') || text.includes('kharch') || text.includes('expens')) {
            return {
                type: 'inquiry',
                message: `Aapne iss mahine total ${formatCurrencyInText(expense)} kharch kiye hain.`,
                speech: `Aapne iss mahine total ${expense} rupees kharch kiye hain.`
            };
        }

        if (text.includes('income') || text.includes('kamai') || text.includes('salary')) {
            return {
                type: 'inquiry',
                message: `Aapki total income ${formatCurrencyInText(income)} hai.`,
                speech: `Aapki total income ${income} rupees hai.`
            };
        }

        if (text.includes('budget')) {
            const status = expense > (income * 0.8) ? 'danger' : 'safe';
            const msg = status === 'danger' ? "Satark rahein! Aapka kharcha budget ke kaafi kareeb hai." : "Aapka budget control me hai. Sab sahi chal raha hai.";
            return { type: 'inquiry', message: msg, speech: msg };
        }

        // 2. TRANSACTION DETECTION (Existing Logic)
        let amount = null;
        let category = 'Others';
        let transactionType = 'expense';

        // Extract amount (matches numbers in text)
        const amountMatch = text.match(/(\d+)/);
        if (amountMatch) amount = Number(amountMatch[0]);

        // Determine type (English & Hindi keywords)
        const incomeKeywords = ['income', 'salary', 'got', 'received', 'aaye', 'mili', 'mile', 'prapt', 'bhaida', 'mil gaya'];
        const expenseKeywords = ['spent', 'kharch', 'diye', 'gaye', 'loss', 'paid', 'bhugtan', 'diye'];

        if (incomeKeywords.some(k => text.includes(k))) {
            transactionType = 'income';
        }

        // Extract category (English & Hindi)
        const categories = {
            'food': ['food', 'grocery', 'groceries', 'dinner', 'lunch', 'khana', 'rashan', 'restaurant', 'zomato', 'swiggy', 'maggi', 'chai'],
            'transport': ['petrol', 'diesel', 'fuel', 'uber', 'ola', 'auto', 'bus', 'train', 'travel', 'gadi', 'bike'],
            'rent': ['rent', 'kiraya', 'room'],
            'bills': ['bill', 'recharge', 'electricity', 'bijli', 'water', 'internet', 'wifi'],
            'shopping': ['shopping', 'clothes', 'kapde', 'amazon', 'flipkart', 'mall'],
            'salary': ['salary', 'bonus', 'paisa', 'kamai', 'tkhwah']
        };

        for (const [cat, keywords] of Object.entries(categories)) {
            if (keywords.some(k => text.includes(k))) {
                category = cat.charAt(0).toUpperCase() + cat.slice(1);
                break;
            }
        }

        return amount ? {
            type: 'transaction',
            data: { type: transactionType, amount, category, description: `Voice: ${text}` },
            message: `Theek hai, ${amount} rupees ${category} ke liye add kar diye hain.`,
            speech: `Theek hai, ${amount} rupees ${category} ke liye add kar diye hain.`
        } : null;
    };

    const startRecording = useCallback(() => {
        try {
            if (!SpeechRecognition) return;

            setStatus('listening');
            setIsListening(true);
            setTranscript('');
            setAiResponse('');
            setPermissionError(false);
            window.speechSynthesis.cancel(); // Stop talking when listening

            const recognition = new SpeechRecognition();
            recognition.continuous = false;
            recognition.interimResults = true;
            recognition.lang = 'hi-IN'; // Set to Hindi (India) - handles Hinglish well

            recognition.onresult = (event) => {
                const currentTranscript = Array.from(event.results)
                    .map(result => result[0])
                    .map(result => result.transcript)
                    .join('');
                setTranscript(currentTranscript);
            };

            recognition.onend = () => {
                setIsListening(false);
                processTranscript();
            };

            recognition.onerror = (event) => {
                console.error('Speech recognition error:', event.error);
                if (event.error === 'not-allowed') {
                    setPermissionError(true);
                }
                setStatus('error');
                setTimeout(() => {
                    setStatus('idle');
                    setIsActivated(false);
                }, 3000);
            };

            recognitionRef.current = recognition;
            recognition.start();
        } catch (err) {
            console.error('Failed to start recognition:', err);
            setStatus('error');
            setIsActivated(false);
        }
    }, [getSummary]);

    const processTranscript = () => {
        setTranscript(prev => {
            const command = parseCommand(prev);
            if (command) {
                setStatus('processing');
                setTimeout(() => {
                    if (command.type === 'transaction') {
                        addTransaction(command.data);
                        setLastAction(command.data);
                    }

                    setAiResponse(command.message);
                    speak(command.speech);
                    setStatus('success');

                    setTimeout(() => {
                        setStatus('idle');
                        setIsActivated(false);
                        setLastAction(null);
                        setAiResponse('');
                    }, 5000);
                }, 800);
            } else if (prev) {
                setStatus('error');
                speak("Maaf kijiye, main ye samajh nahi paaya.");
                setTimeout(() => {
                    setStatus('idle');
                    setIsActivated(false);
                }, 3000);
            } else {
                setStatus('idle');
                setIsActivated(false);
            }
            return prev;
        });
    };

    // Continuous wake word detection
    useEffect(() => {
        if (!SpeechRecognition || isActivated) return;

        let wakeWordRecognition;
        try {
            wakeWordRecognition = new SpeechRecognition();
            wakeWordRecognition.continuous = true;
            wakeWordRecognition.interimResults = true;
            wakeWordRecognition.lang = 'hi-IN'; // Better for Indian accents

            wakeWordRecognition.onresult = (event) => {
                const currentTranscript = Array.from(event.results)
                    .map(result => result[0].transcript.toLowerCase())
                    .join(' ');

                if (currentTranscript.includes('hey sam') || currentTranscript.includes('हे सैम') || currentTranscript.includes('hey sem') || currentTranscript.includes('hey semm')) {
                    wakeWordRecognition.stop();
                    setIsActivated(true);
                    startRecording();
                }
            };

            wakeWordRecognition.onerror = (event) => {
                if (event.error === 'not-allowed') {
                    setPermissionError(true);
                    return;
                }
                // Auto restart on other errors
                setTimeout(() => {
                    if (!isActivated && wakeWordRecognitionRef.current) {
                        try { wakeWordRecognitionRef.current.start(); } catch (e) { }
                    }
                }, 2000);
            };

            wakeWordRecognition.onend = () => {
                if (!isActivated) {
                    setTimeout(() => {
                        try { wakeWordRecognition.start(); } catch (e) { }
                    }, 300);
                }
            };

            wakeWordRecognitionRef.current = wakeWordRecognition;
            wakeWordRecognition.start();
        } catch (e) {
            console.error('Wake word recognition failed to start:', e);
        }

        return () => {
            if (wakeWordRecognitionRef.current) {
                try { wakeWordRecognitionRef.current.stop(); } catch (e) { }
            }
        };
    }, [isActivated, startRecording]);

    if (!isSupported) return null; // Or show a small "Speech API not available" if needed

    return (
        <>
            {/* Visual Indicator/Toggle */}
            <div style={{
                position: 'fixed',
                bottom: '2rem',
                right: '2rem',
                zIndex: 1000,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
                gap: '1rem'
            }}>
                <button
                    onClick={() => {
                        if (isActivated) {
                            setIsActivated(false);
                            if (recognitionRef.current) recognitionRef.current.stop();
                        } else {
                            setIsActivated(true);
                            startRecording();
                        }
                    }}
                    className={`btn-voice ${isActivated ? 'active' : ''}`}
                    style={{
                        width: '56px',
                        height: '56px',
                        borderRadius: '50%',
                        background: isActivated ? 'linear-gradient(135deg, #ef4444, #f43f5e)' : 'linear-gradient(135deg, #8b5cf6, #06b6d4)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        border: 'none',
                        cursor: 'pointer',
                        boxShadow: '0 8px 32px rgba(139, 92, 246, 0.4)',
                        transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                    }}
                >
                    {isActivated ? <Mic size={24} /> : <Mic size={24} />}
                    {isActivated && <div className="voice-pulse" />}
                </button>
            </div>

            {/* Voice Overlay */}
            {isActivated && (
                <div style={{
                    position: 'fixed',
                    inset: 0,
                    background: 'rgba(10, 14, 26, 0.8)',
                    backdropFilter: 'blur(8px)',
                    zIndex: 999,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    animation: 'fadeIn 0.3s ease'
                }}>
                    <div className="glass-card" style={{
                        width: '90%',
                        maxWidth: '500px',
                        padding: '3rem 2rem',
                        textAlign: 'center',
                        position: 'relative'
                    }}>
                        <button
                            onClick={() => setIsActivated(false)}
                            style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'none', border: 'none', color: '#64748b', cursor: 'pointer' }}
                        >
                            <X size={24} />
                        </button>

                        <div style={{ marginBottom: '2rem' }}>
                            <div style={{
                                width: '80px', height: '80px', borderRadius: '50%',
                                background: status === 'error' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(139, 92, 246, 0.1)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem'
                            }}>
                                {status === 'idle' || status === 'listening' ? <Mic size={40} className="text-violet-400 animate-pulse" /> :
                                    status === 'processing' ? <Sparkles size={40} className="text-violet-400 animate-spin" /> :
                                        status === 'success' ? <Check size={40} className="text-emerald-400" /> :
                                            <AlertCircle size={40} className="text-rose-400" />}
                            </div>
                            <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>
                                {status === 'listening' ? 'Listening...' :
                                    status === 'processing' ? 'Processing...' :
                                        status === 'success' ? 'Perfect!' :
                                            status === 'error' ? (permissionError ? 'Microphone Blocked' : 'Sorry, try again.') :
                                                'Sam is listening...'}
                            </h2>
                            <p style={{ color: '#94a3b8', fontSize: '0.875rem' }}>
                                {permissionError ? 'Please click the lock icon in your browser and allow microphone access.' :
                                    'Try: "Hey Sam, spent 500 on groceries"'} <br />
                                {!permissionError && 'या बोलें: "500 khana kharch kiye"'}
                            </p>
                        </div>

                        <div style={{
                            padding: '1.5rem',
                            background: aiResponse ? 'rgba(139, 92, 246, 0.1)' : 'rgba(255, 255, 255, 0.03)',
                            borderRadius: '16px',
                            minHeight: '80px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: aiResponse ? '1px solid rgba(139, 92, 246, 0.2)' : '1px solid rgba(255, 255, 255, 0.05)',
                            marginBottom: '1rem',
                            transition: 'all 0.3s ease'
                        }}>
                            <p style={{
                                margin: 0,
                                fontSize: '1.125rem',
                                color: aiResponse ? '#a78bfa' : (transcript ? '#f8fafc' : '#475569'),
                                fontStyle: transcript || aiResponse ? 'normal' : 'italic',
                                fontWeight: aiResponse ? 600 : 400
                            }}>
                                {aiResponse || transcript || '...'}
                            </p>
                        </div>

                        {status === 'success' && lastAction && (
                            <div style={{ animation: 'slideUp 0.3s ease' }}>
                                <div style={{
                                    display: 'inline-flex', padding: '0.5rem 1rem', borderRadius: '20px',
                                    background: 'rgba(16, 185, 129, 0.1)', color: '#34d399', fontSize: '0.875rem'
                                }}>
                                    Added {lastAction.type === 'expense' ? '-' : '+'}${lastAction.amount} for {lastAction.category}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            <style>{`
                .voice-pulse {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                    background: rgba(139, 92, 246, 0.4);
                    animation: pulse 2s infinite;
                    z-index: -1;
                }
                @keyframes pulse {
                    0% { transform: scale(1); opacity: 1; }
                    100% { transform: scale(2); opacity: 0; }
                }
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes slideUp {
                    from { transform: translateY(10px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
                .text-violet-400 { color: #a78bfa; }
                .text-emerald-400 { color: #34d399; }
                .text-rose-400 { color: #fb7185; }
            `}</style>
        </>
    );
}

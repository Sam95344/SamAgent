import { useState, useRef, useEffect } from 'react';
import { Send, User, X, Plus, Trash2, MessageSquare, Clock, ChevronLeft, ChevronRight, PieChart, Wallet } from 'lucide-react';
import { useFinance } from '../context/FinanceContext';
import { createFinanceAI } from '../lib/financeAI';

// Local Guide Bot Icon
const GuideIcon = ({ size = 32, className = '' }) => (
    <div className={className} style={{ width: size, height: size, background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Wallet size={size * 0.6} color="white" />
    </div>
);

// Generate unique ID
const generateId = () => Date.now().toString(36) + Math.random().toString(36).substr(2);

export function ChatAssistant() {
    const { transactions, goals } = useFinance();

    // Chat history state
    const [chatHistory, setChatHistory] = useState(() => {
        const saved = localStorage.getItem('samAgent_chatHistory');
        return saved ? JSON.parse(saved) : [];
    });
    const [currentChatId, setCurrentChatId] = useState(null);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    const financeAI = createFinanceAI(transactions, goals);

    // Save chat history to localStorage
    useEffect(() => {
        localStorage.setItem('samAgent_chatHistory', JSON.stringify(chatHistory));
    }, [chatHistory]);

    // Save current chat messages when they change
    useEffect(() => {
        if (currentChatId && messages.length > 0) {
            setChatHistory(prev => prev.map(chat =>
                chat.id === currentChatId
                    ? { ...chat, messages, updatedAt: new Date().toISOString() }
                    : chat
            ));
        }
    }, [messages, currentChatId]);

    // Create new chat
    const createNewChat = () => {
        const newChat = {
            id: generateId(),
            title: 'New Chat',
            messages: [],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        setChatHistory(prev => [newChat, ...prev]);
        setCurrentChatId(newChat.id);
        setMessages([]);
    };

    // Load existing chat
    const loadChat = (chatId) => {
        const chat = chatHistory.find(c => c.id === chatId);
        if (chat) {
            setCurrentChatId(chatId);
            setMessages(chat.messages);
        }
    };

    // Delete chat
    const deleteChat = (chatId, e) => {
        e.stopPropagation();
        if (confirm('Delete this chat?')) {
            setChatHistory(prev => prev.filter(c => c.id !== chatId));
            if (currentChatId === chatId) {
                setCurrentChatId(null);
                setMessages([]);
            }
        }
    };

    // Clear all chats
    const clearAllChats = () => {
        if (confirm('Delete ALL chat history? This cannot be undone!')) {
            setChatHistory([]);
            setCurrentChatId(null);
            setMessages([]);
            localStorage.removeItem('samAgent_chatHistory');
        }
    };

    // Get chat title from first message
    const getChatTitle = (chat) => {
        if (chat.messages.length === 0) return 'New Chat';
        const firstUserMsg = chat.messages.find(m => m.role === 'user');
        if (firstUserMsg) {
            return firstUserMsg.text.substring(0, 30) + (firstUserMsg.text.length > 30 ? '...' : '');
        }
        return 'New Chat';
    };

    // Format date for display
    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        const now = new Date();
        const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));

        if (diffDays === 0) return 'Today';
        if (diffDays === 1) return 'Yesterday';
        if (diffDays < 7) return `${diffDays} days ago`;
        return date.toLocaleDateString();
    };

    // Suggested prompts for empty state
    const suggestions = [
        { icon: '💰', text: 'Analyze my spending habits' },
        { icon: '📊', text: 'Create a monthly budget plan' },
        { icon: '🎯', text: 'Help me save for a goal' },
        { icon: '💡', text: 'Give me investment tips' }
    ];

    // Get financial context for Gemini
    const getFinancialContext = () => {
        const income = transactions.filter(t => t.type === 'income').reduce((acc, t) => acc + Number(t.amount), 0);
        const expense = transactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + Number(t.amount), 0);
        const balance = income - expense;
        const savingsRate = income > 0 ? ((income - expense) / income * 100) : 0;

        return {
            income,
            expense,
            balance,
            savingsRate,
            transactionCount: transactions.length
        };
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = (text = input) => {
        if (!text.trim()) return;

        // Auto-create a new chat if none exists
        let chatId = currentChatId;
        if (!chatId) {
            const newChat = {
                id: generateId(),
                title: 'New Chat',
                messages: [],
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };
            setChatHistory(prev => [newChat, ...prev]);
            setCurrentChatId(newChat.id);
            chatId = newChat.id;
        }

        // Create user message
        const userMsg = {
            id: Date.now(),
            role: 'user',
            text: text.trim()
        };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsTyping(true);

        // Analyze and respond locally
        setTimeout(() => {
            const responseText = financeAI.generateResponse(text);
            setMessages(prev => [...prev, { id: Date.now() + 1, role: 'agent', text: responseText }]);
            setIsTyping(false);
        }, 800);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleSend();
    };

    const handleSuggestionClick = (suggestion) => {
        handleSend(suggestion.text);
    };

    // Enhanced markdown parser
    const formatMessage = (text) => {
        return text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/```([\s\S]*?)```/g, '<pre style="background: rgba(0,0,0,0.3); padding: 1rem; border-radius: 8px; overflow-x: auto; margin: 0.5rem 0;">$1</pre>')
            .replace(/`(.*?)`/g, '<code style="background: rgba(139,92,246,0.2); padding: 0.2rem 0.4rem; border-radius: 4px;">$1</code>')
            .replace(/\n/g, '<br/>');
    };

    const isEmptyChat = messages.length === 0;

    return (
        <div style={{
            height: 'calc(100vh - 3rem)',
            display: 'flex',
            background: 'transparent',
            position: 'relative'
        }}>
            {/* Chat History Sidebar */}
            <div style={{
                width: sidebarOpen ? '280px' : '0px',
                minWidth: sidebarOpen ? '280px' : '0px',
                height: '100%',
                background: 'rgba(15, 23, 42, 0.95)',
                borderRight: '1px solid rgba(148, 163, 184, 0.1)',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.3s ease',
                overflow: 'hidden'
            }}>
                {/* Sidebar Header */}
                <div style={{
                    padding: '1rem',
                    borderBottom: '1px solid rgba(148, 163, 184, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                }}>
                    <button
                        onClick={createNewChat}
                        style={{
                            flex: 1,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem',
                            padding: '0.75rem',
                            background: 'linear-gradient(135deg, #4285f4, #9b72cb)',
                            border: 'none',
                            borderRadius: '12px',
                            color: 'white',
                            fontSize: '0.875rem',
                            fontWeight: 600,
                            cursor: 'pointer'
                        }}
                    >
                        <Plus size={18} />
                        New Chat
                    </button>
                </div>

                {/* Chat List */}
                <div style={{
                    flex: 1,
                    overflowY: 'auto',
                    padding: '0.5rem'
                }}>
                    {chatHistory.length === 0 ? (
                        <div style={{
                            padding: '2rem 1rem',
                            textAlign: 'center',
                            color: '#64748b',
                            fontSize: '0.85rem'
                        }}>
                            <MessageSquare size={32} style={{ opacity: 0.5, marginBottom: '0.5rem' }} />
                            <p>No chats yet</p>
                            <p style={{ fontSize: '0.75rem', marginTop: '0.25rem' }}>Start a new conversation!</p>
                        </div>
                    ) : (
                        chatHistory.map(chat => (
                            <div
                                key={chat.id}
                                onClick={() => loadChat(chat.id)}
                                style={{
                                    padding: '0.75rem',
                                    marginBottom: '0.5rem',
                                    borderRadius: '10px',
                                    background: currentChatId === chat.id ? 'rgba(139, 92, 246, 0.15)' : 'transparent',
                                    border: currentChatId === chat.id ? '1px solid rgba(139, 92, 246, 0.3)' : '1px solid transparent',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease',
                                    display: 'flex',
                                    alignItems: 'flex-start',
                                    gap: '0.75rem'
                                }}
                                onMouseEnter={(e) => {
                                    if (currentChatId !== chat.id) {
                                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (currentChatId !== chat.id) {
                                        e.currentTarget.style.background = 'transparent';
                                    }
                                }}
                            >
                                <MessageSquare size={16} style={{ color: '#64748b', marginTop: '2px', flexShrink: 0 }} />
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{
                                        fontSize: '0.875rem',
                                        color: '#e2e8f0',
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis'
                                    }}>
                                        {getChatTitle(chat)}
                                    </div>
                                    <div style={{
                                        fontSize: '0.7rem',
                                        color: '#64748b',
                                        marginTop: '0.25rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.25rem'
                                    }}>
                                        <Clock size={10} />
                                        {formatDate(chat.updatedAt)}
                                    </div>
                                </div>
                                <button
                                    onClick={(e) => deleteChat(chat.id, e)}
                                    style={{
                                        width: '24px',
                                        height: '24px',
                                        borderRadius: '6px',
                                        background: 'transparent',
                                        border: 'none',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: '#64748b',
                                        opacity: 0.6,
                                        transition: 'all 0.2s ease'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.color = '#f87171';
                                        e.currentTarget.style.opacity = '1';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.color = '#64748b';
                                        e.currentTarget.style.opacity = '0.6';
                                    }}
                                >
                                    <Trash2 size={14} />
                                </button>
                            </div>
                        ))
                    )}
                </div>

                {/* Clear All Button */}
                {chatHistory.length > 0 && (
                    <div style={{
                        padding: '0.75rem',
                        borderTop: '1px solid rgba(148, 163, 184, 0.1)'
                    }}>
                        <button
                            onClick={clearAllChats}
                            style={{
                                width: '100%',
                                padding: '0.625rem',
                                background: 'rgba(244, 63, 94, 0.1)',
                                border: '1px solid rgba(244, 63, 94, 0.2)',
                                borderRadius: '8px',
                                color: '#f87171',
                                fontSize: '0.8rem',
                                fontWeight: 500,
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '0.5rem'
                            }}
                        >
                            <Trash2 size={14} />
                            Clear All ({chatHistory.length})
                        </button>
                    </div>
                )}
            </div>

            {/* Sidebar Toggle Button */}
            <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                style={{
                    position: 'absolute',
                    left: sidebarOpen ? '268px' : '8px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '24px',
                    height: '48px',
                    background: 'rgba(30, 41, 59, 0.9)',
                    border: '1px solid rgba(148, 163, 184, 0.2)',
                    borderRadius: '0 8px 8px 0',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#94a3b8',
                    zIndex: 10,
                    transition: 'left 0.3s ease'
                }}
            >
                {sidebarOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
            </button>

            {/* Main Chat Area */}
            <div style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden'
            }}>
                {/* Empty State - Gemini Style */}
                {isEmptyChat ? (
                    <div style={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '2rem',
                        gap: '2rem'
                    }}>
                        {/* Guide Icon */}
                        <div style={{
                            animation: 'float 3s ease-in-out infinite'
                        }}>
                            <GuideIcon size={56} />
                        </div>

                        {/* Greeting */}
                        <div style={{ textAlign: 'center' }}>
                            <h1 style={{
                                fontSize: '2.5rem',
                                fontWeight: 600,
                                background: 'linear-gradient(135deg, #f8fafc, #94a3b8)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                                marginBottom: '0.5rem'
                            }}>
                                SamAgent Assistant
                            </h1>
                            <p style={{
                                fontSize: '1.5rem',
                                fontWeight: 400,
                                color: '#64748b'
                            }}>
                                Your local financial guide
                            </p>
                        </div>

                        {/* Suggestion Cards */}
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(2, 1fr)',
                            gap: '1rem',
                            maxWidth: '600px',
                            width: '100%',
                            marginTop: '1rem'
                        }}>
                            {suggestions.map((suggestion, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleSuggestionClick(suggestion)}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'flex-start',
                                        gap: '0.75rem',
                                        padding: '1rem 1.25rem',
                                        background: 'rgba(30, 41, 59, 0.5)',
                                        border: '1px solid rgba(148, 163, 184, 0.1)',
                                        borderRadius: '16px',
                                        cursor: 'pointer',
                                        textAlign: 'left',
                                        transition: 'all 0.2s ease',
                                        color: '#e2e8f0'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background = 'rgba(139, 92, 246, 0.1)';
                                        e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.3)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background = 'rgba(30, 41, 59, 0.5)';
                                        e.currentTarget.style.borderColor = 'rgba(148, 163, 184, 0.1)';
                                    }}
                                >
                                    <span style={{ fontSize: '1.25rem' }}>{suggestion.icon}</span>
                                    <span style={{ fontSize: '0.9rem', lineHeight: 1.4 }}>{suggestion.text}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                ) : (
                    /* Messages Container */
                    <div style={{
                        flex: 1,
                        padding: '1.5rem 2rem',
                        overflowY: 'auto',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1.5rem',
                        maxWidth: '900px',
                        margin: '0 auto',
                        width: '100%'
                    }}>
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                style={{
                                    display: 'flex',
                                    gap: '1rem',
                                    flexDirection: 'row',
                                    animation: 'fadeSlideIn 0.3s ease-out'
                                }}
                            >
                                {/* Avatar */}
                                <div style={{
                                    width: '32px',
                                    height: '32px',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexShrink: 0,
                                    background: msg.role === 'agent'
                                        ? 'transparent'
                                        : 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
                                    marginTop: '0.25rem'
                                }}>
                                    {msg.role === 'agent' ? (
                                        <GuideIcon size={24} />
                                    ) : (
                                        <User size={16} style={{ color: 'white' }} />
                                    )}
                                </div>

                                {/* Message Content */}
                                <div style={{
                                    flex: 1,
                                    color: '#e2e8f0',
                                    lineHeight: 1.8,
                                    fontSize: '0.95rem'
                                }}>
                                    {msg.role === 'agent' ? (
                                        <div
                                            dangerouslySetInnerHTML={{ __html: formatMessage(msg.text) }}
                                            style={{ wordBreak: 'break-word' }}
                                        />
                                    ) : (
                                        <div style={{
                                            background: 'rgba(139, 92, 246, 0.1)',
                                            padding: '0.75rem 1rem',
                                            borderRadius: '18px',
                                            display: 'inline-block',
                                            maxWidth: '100%'
                                        }}>
                                            {msg.text}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}

                        {/* Typing Indicator - Gemini Style */}
                        {isTyping && (
                            <div style={{ display: 'flex', gap: '1rem', animation: 'fadeSlideIn 0.3s ease-out' }}>
                                <div style={{
                                    width: '32px',
                                    height: '32px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexShrink: 0
                                }}>
                                    <GuideIcon size={24} />
                                </div>
                                <div style={{
                                    display: 'flex',
                                    gap: '6px',
                                    alignItems: 'center',
                                    padding: '0.5rem 0'
                                }}>
                                    <div className="gemini-dot" style={{ animationDelay: '0ms' }} />
                                    <div className="gemini-dot" style={{ animationDelay: '150ms' }} />
                                    <div className="gemini-dot" style={{ animationDelay: '300ms' }} />
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                )}

                <div style={{
                    padding: '1rem 2rem 2rem',
                    display: 'flex',
                    justifyContent: 'center'
                }}>
                    <form onSubmit={handleSubmit} style={{
                        width: '100%',
                        maxWidth: '800px'
                    }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            background: 'rgba(30, 41, 59, 0.6)',
                            borderRadius: '28px',
                            border: '1px solid rgba(148, 163, 184, 0.15)',
                            padding: '0.5rem 0.5rem 0.5rem 1.25rem',
                            transition: 'all 0.2s ease',
                            boxShadow: '0 4px 20px -5px rgba(0, 0, 0, 0.3)'
                        }}>
                            <input
                                ref={inputRef}
                                type="text"
                                placeholder="Ask about your balance, expenses, savings..."
                                style={{
                                    flex: 1,
                                    padding: '0.75rem 0',
                                    background: 'transparent',
                                    border: 'none',
                                    color: '#e2e8f0',
                                    fontSize: '1rem',
                                    outline: 'none'
                                }}
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                            />

                            {/* Action Buttons */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                <button
                                    type="submit"
                                    disabled={!input.trim()}
                                    style={{
                                        width: '44px',
                                        height: '44px',
                                        borderRadius: '50%',
                                        background: input.trim()
                                            ? 'linear-gradient(135deg, #8b5cf6, #06b6d4)'
                                            : 'rgba(100, 116, 139, 0.2)',
                                        border: 'none',
                                        cursor: input.trim() ? 'pointer' : 'not-allowed',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: 'white',
                                        transition: 'all 0.2s ease',
                                        transform: input.trim() ? 'scale(1)' : 'scale(0.95)'
                                    }}
                                >
                                    <Send size={18} style={{ marginLeft: '2px' }} />
                                </button>
                            </div>
                        </div>

                        {/* Disclaimer */}
                        <p style={{
                            textAlign: 'center',
                            fontSize: '0.75rem',
                            color: '#64748b',
                            marginTop: '0.75rem'
                        }}>
                            SamAgent is your local financial intelligence guide.
                        </p>
                    </form>
                </div>

                <style>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }
                @keyframes fadeSlideIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .dot-bounce {
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, #8b5cf6, #06b6d4);
                    animation: dotBounce 1.4s ease-in-out infinite;
                }
            `}</style>
            </div>
        </div>
    );
}


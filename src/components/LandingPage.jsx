import { useState, useEffect, useRef } from 'react';
import {
  Sparkles, TrendingUp, Shield, Bot, ArrowRight, Check,
  Twitter, Github, Linkedin, MessageCircle, Send, X,
  Calendar, Plus
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';

export function LandingPage({ onLogin, onSignup }) {
  const [activeFaq, setActiveFaq] = useState(null);

  // Chat widget state
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  // Scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  // Project Guide Bot - responds only about SamAgent project
  const getProjectGuideResponse = (message) => {
    const lowerMsg = message.toLowerCase();

    // Login related
    if (lowerMsg.includes('login') || lowerMsg.includes('log in') || lowerMsg.includes('sign in')) {
      return "🔐 **How to Login:**\n\n1. Click the **'View Live Demo'** or **'Sign In'** button in the header\n2. Enter your registered email address\n3. Enter your password\n4. Click **Login**\n\n💡 Don't have an account? Click 'Sign Up' to create one first!";
    }

    // Signup related
    if (lowerMsg.includes('signup') || lowerMsg.includes('sign up') || lowerMsg.includes('register') || lowerMsg.includes('create account')) {
      return "📝 **How to Sign Up:**\n\n1. Click **'Start Your Journey'** or **'Sign Up'** button\n2. Enter your full name\n3. Enter your email address\n4. Create a strong password\n5. Confirm your password\n6. Click **Create Account**\n\n✅ That's it! You'll be logged in automatically.";
    }

    // About project
    if (lowerMsg.includes('about') || lowerMsg.includes('what is') || lowerMsg.includes('samagent') || lowerMsg.includes('project')) {
      return "🌟 **About SamAgent:**\n\nSamAgent is an AI-powered personal finance management application that helps you:\n\n• 📊 Track income & expenses\n• 🎯 Set and achieve financial goals\n• 💬 Get AI-powered financial advice\n• 📈 Visualize spending patterns\n• 🔒 Keep your data secure (local-first storage)\n\n**Key Features:**\n- Smart Dashboard with charts\n- AI Financial Coach\n- Goals & Budget Planner\n- Transaction History\n- Multi-currency support";
    }

    // How it works
    if (lowerMsg.includes('how it work') || lowerMsg.includes('how does it work') || lowerMsg.includes('how to use') || lowerMsg.includes('guide') || lowerMsg.includes('tutorial')) {
      return "🚀 **How SamAgent Works:**\n\n**Step 1: Sign Up/Login**\n- Create your free account\n\n**Step 2: Add Transactions**\n- Record your income and expenses\n- Categorize each transaction\n\n**Step 3: Set Goals**\n- Create savings goals (vacation, emergency fund, etc.)\n- Track progress automatically\n\n**Step 4: Get AI Insights**\n- Chat with our AI assistant\n- Get personalized financial advice\n- Analyze your spending patterns\n\n**Step 5: Monitor Dashboard**\n- View charts and analytics\n- Track your financial health";
    }

    // Features
    if (lowerMsg.includes('feature') || lowerMsg.includes('can do') || lowerMsg.includes('capabilities')) {
      return "✨ **SamAgent Features:**\n\n🏠 **Dashboard** - Overview of your finances with beautiful charts\n\n💳 **Transactions** - Add, edit, and categorize income/expenses\n\n🎯 **Goals & Budget** - Set savings goals and track 50/30/20 budget\n\n🤖 **AI Assistant** - Get personalized financial advice\n\n⚙️ **Settings** - Customize currency, theme, and preferences\n\n📊 **Analytics** - Visualize spending by category\n\n🔒 **Security** - Local-first storage, your data stays private";
    }

    // Run/setup
    if (lowerMsg.includes('run') || lowerMsg.includes('setup') || lowerMsg.includes('install') || lowerMsg.includes('start')) {
      return "🛠️ **How to Run SamAgent:**\n\n**Prerequisites:**\n- Node.js installed\n- npm or yarn\n\n**Steps:**\n```\n1. Clone the repository\n2. cd finance-agent\n3. npm install\n4. npm run dev\n```\n\n**For Backend:**\n```\ncd server\nnpm install\nnpm start\n```\n\n🌐 Open http://localhost:5173 in your browser!";
    }

    // Tech stack
    if (lowerMsg.includes('tech') || lowerMsg.includes('stack') || lowerMsg.includes('built with') || lowerMsg.includes('technology')) {
      return "🔧 **Tech Stack:**\n\n**Frontend:**\n- ⚛️ React.js\n- 📊 Recharts (for charts)\n- 🎨 Lucide Icons\n- 💅 Custom CSS with glassmorphism\n\n**Backend:**\n- 🟢 Node.js + Express\n- 🍃 MongoDB (database)\n- 🔐 JWT Authentication\n\n**AI:**\n- 🤖 Google Gemini API\n\n**Styling:**\n- Dark mode theme\n- Gradient effects\n- Smooth animations";
    }

    // Help
    if (lowerMsg.includes('help') || lowerMsg.includes('support') || lowerMsg.includes('contact')) {
      return "💬 **Need Help?**\n\nI can help you with:\n\n• 🔐 **Login** - How to sign in\n• 📝 **Sign Up** - Create an account\n• 🌟 **About** - What is SamAgent\n• 🚀 **How it works** - User guide\n• ✨ **Features** - What you can do\n• 🛠️ **Setup** - How to run locally\n• 🔧 **Tech Stack** - Technologies used\n\nJust ask me anything about the project!";
    }

    // Hi/Hello
    if (lowerMsg.includes('hi') || lowerMsg.includes('hello') || lowerMsg.includes('hey')) {
      return "👋 Hello! Welcome to SamAgent!\n\nI'm your project guide bot. I can help you with:\n\n• How to **Login** or **Sign Up**\n• Learn **About** the project\n• Understand **How it works**\n• Explore **Features**\n• **Setup** instructions\n\nWhat would you like to know?";
    }

    // Default response
    return "🤔 I'm the SamAgent Guide Bot! I can help you with:\n\n• **Login/Sign Up** - Account access\n• **About SamAgent** - What this project does\n• **How it works** - User guide\n• **Features** - Capabilities overview\n• **Tech Stack** - Technologies used\n• **Setup** - How to run locally\n\nTry asking: 'How do I sign up?' or 'What is SamAgent?'";
  };

  // Handle sending chat message
  const handleSendChat = async () => {
    if (!chatInput.trim()) return;

    const userMsg = { id: Date.now(), role: 'user', text: chatInput };
    setChatMessages(prev => [...prev, userMsg]);
    const message = chatInput;
    setChatInput('');
    setIsTyping(true);

    // Simulate typing delay
    await new Promise(resolve => setTimeout(resolve, 800));

    const response = getProjectGuideResponse(message);
    setChatMessages(prev => [...prev, { id: Date.now() + 1, role: 'agent', text: response }]);
    setIsTyping(false);
  };

  const chartData = [
    { name: 'Jan', savings: 4000, expenses: 2400, investment: 2400 },
    { name: 'Feb', savings: 3000, expenses: 1398, investment: 2210 },
    { name: 'Mar', savings: 5000, expenses: 9800, investment: 2290 },
    { name: 'Apr', savings: 4500, expenses: 3908, investment: 2000 },
    { name: 'May', savings: 6000, expenses: 4800, investment: 2181 },
    { name: 'Jun', savings: 5500, expenses: 3800, investment: 2500 },
    { name: 'Jul', savings: 7000, expenses: 4300, investment: 2100 },
  ];

  const pieData = [
    { name: 'Stocks', value: 400 },
    { name: 'Crypto', value: 300 },
    { name: 'Real Estate', value: 300 },
    { name: 'Cash', value: 200 },
  ];

  const investmentData = [
    { name: 'Apple', value: 4000, pv: 2400, amt: 2400 },
    { name: 'Tesla', value: 3000, pv: 1398, amt: 2210 },
    { name: 'Google', value: 2000, pv: 9800, amt: 2290 },
    { name: 'Amazon', value: 2780, pv: 3908, amt: 2000 },
    { name: 'Meta', value: 1890, pv: 4800, amt: 2181 },
  ];

  const COLORS = ['#8b5cf6', '#06b6d4', '#f472b6', '#f59e0b'];

  const features = [
    {
      icon: <TrendingUp size={24} />,
      title: 'Smart Analytics',
      description: 'AI-driven insights that help you understand your spending habits in real-time.',
      color: '#8b5cf6'
    },
    {
      icon: <Bot size={24} />,
      title: 'AI Financial Coach',
      description: 'Your personal financial assistant that helps you save more and spend wiser.',
      color: '#06b6d4'
    },
    {
      icon: <Shield size={24} />,
      title: 'Bank-Level Security',
      description: 'Highest security standards with local encryption. Your data never leaves your device.',
      color: '#f472b6'
    }
  ];

  const steps = [
    { title: 'Connect Accounts', desc: 'Securely sync your transactions' },
    { title: 'AI Analysis', desc: 'Let our AI categorize your data' },
    { title: 'Optimize Wealth', desc: 'Follow personalized saving tips' }
  ];

  const faqs = [
    { q: 'Is my data safe?', a: 'Yes, SamAgent uses local-first storage. Your data is encrypted and stays on your device.' },
    { q: 'Can I export my data?', a: 'Absolutely! You can export your entire financial history to JSON at any time from the settings.' },
    { q: 'Does it support multiple currencies?', a: 'Yes, we support over 7 major global currencies with real-time conversion.' }
  ];

  return (
    <div className="landing-page" style={{ position: 'relative', overflowX: 'hidden' }}>
      <div className="landing-gradient-bg" />

      {/* Hero Section */}
      <section className="hero-section" style={{
        padding: '10rem 3rem 8rem',
        textAlign: 'center',
        position: 'relative',
        zIndex: 1
      }}>
        <div className="animate-fade-in" style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div className="hero-badge animate-float" style={{
            marginBottom: '2.5rem',
            background: 'rgba(139, 92, 246, 0.08)',
            border: '1px solid rgba(139, 92, 246, 0.15)',
            boxShadow: '0 0 20px rgba(139, 92, 246, 0.1)'
          }}>
            <Sparkles size={14} />
            <span>The Future of Finance is Here</span>
          </div>
          <h1 className="hero-title" style={{
            fontSize: '6.5rem',
            fontWeight: 900,
            lineHeight: 0.9,
            marginBottom: '3rem',
            letterSpacing: '-0.06em'
          }}>
            Master Your Money <br />
            <span className="gradient-text-hero">Without Limits.</span>
          </h1>
          <p className="hero-subtitle" style={{
            fontSize: '1.375rem',
            color: '#94a3b8',
            maxWidth: '700px',
            margin: '0 auto 4rem',
            lineHeight: 1.6,
            fontWeight: 400
          }}>
            The world's first AI financial companion that puts your privacy first.
            No cloud. No tracking. Just intelligent wealth management in your pocket.
          </p>
          <div className="hero-actions" style={{ justifyContent: 'center', gap: '1.5rem' }}>
            <button onClick={onSignup} className="btn btn-primary btn-lg" style={{
              minWidth: '220px',
              gap: '0.75rem',
              fontSize: '1.125rem',
              borderRadius: '16px'
            }}>
              Start Your Journey
              <ArrowRight size={22} />
            </button>
            <button onClick={onLogin} className="btn btn-ghost btn-lg" style={{
              minWidth: '220px',
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              fontSize: '1.125rem',
              borderRadius: '16px'
            }}>
              View Live Demo
            </button>
          </div>
        </div>

        {/* Floating Mockup Preview */}
        <div className="animate-fade-in" style={{ animationDelay: '0.4s', marginTop: '6rem' }}>
          <div className="glass-card mockup-dashboard-container" style={{
            maxWidth: '1200px',
            margin: '0 auto',
            height: '600px',
            padding: '2.5rem',
            background: 'linear-gradient(135deg, rgba(17, 24, 39, 0.9), rgba(10, 14, 26, 0.98))',
            border: '1px solid rgba(139, 92, 246, 0.3)',
            boxShadow: '0 100px 200px -50px rgba(0, 0, 0, 0.7), 0 0 80px -20px rgba(139, 92, 246, 0.3)',
            borderRadius: '48px',
            position: 'relative',
            overflow: 'hidden',
            transform: 'perspective(1000px) rotateX(5deg)'
          }}>
            {/* Mock Dashboard Content */}
            <div style={{ display: 'flex', gap: '2rem', height: '100%' }}>
              <div style={{ width: '240px', background: 'rgba(255,255,255,0.02)', borderRadius: '24px', padding: '1.5rem', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column' }}>
                <div style={{ height: '32px', width: '60%', background: 'rgba(255,255,255,0.1)', borderRadius: '8px', marginBottom: '2.5rem' }} />
                <div style={{ flex: 1 }}>
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={60}
                        fill="#8884d8"
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ backgroundColor: 'rgba(17, 24, 39, 0.9)', borderRadius: '12px', border: 'none' }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                {[1, 2, 3].map(i => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
                    <div style={{ width: '20px', height: '20px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px' }} />
                    <div style={{ height: '12px', width: '60%', background: 'rgba(255,255,255,0.05)', borderRadius: '4px' }} />
                  </div>
                ))}
              </div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ display: 'flex', gap: '1.5rem', height: '180px' }}>
                  <div className="glass-card" style={{ flex: 1, padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <div className="text-sm text-slate-400 mb-1">Total Assets</div>
                    <div className="text-2xl font-bold mb-4">$124,592.00</div>
                    <div style={{ height: '60px' }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData.slice(0, 5)}>
                          <Bar dataKey="savings" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  <div className="glass-card" style={{ flex: 1, padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <div className="text-sm text-slate-400 mb-1">Monthly Yield</div>
                    <div className="text-2xl font-bold mb-4 text-emerald-400">+12.5%</div>
                    <div style={{ height: '60px' }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={chartData.slice(0, 5)}>
                          <Area type="monotone" dataKey="savings" stroke="#10b981" fill="#10b981" fillOpacity={0.2} strokeWidth={2} />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
                <div style={{ flex: 1, background: 'rgba(139, 92, 246, 0.02)', borderRadius: '32px', border: '1px solid rgba(139, 92, 246, 0.1)', position: 'relative', overflow: 'hidden', padding: '2rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
                    <div style={{ height: '20px', width: '150px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px' }} />
                  </div>
                  <div style={{ height: '100%', width: '100%', minHeight: '200px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={chartData}
                        margin={{
                          top: 10,
                          right: 30,
                          left: 0,
                          bottom: 0,
                        }}
                      >
                        <defs>
                          <linearGradient id="colorSavings" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                          </linearGradient>
                          <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
                        <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                        <Tooltip
                          contentStyle={{ backgroundColor: 'rgba(17, 24, 39, 0.9)', border: '1px solid rgba(139, 92, 246, 0.2)', borderRadius: '12px' }}
                          itemStyle={{ color: '#fff' }}
                          cursor={{ stroke: 'rgba(139, 92, 246, 0.4)', strokeWidth: 2 }}
                        />
                        <Area type="monotone" dataKey="savings" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorSavings)" strokeWidth={3} />
                        <Area type="monotone" dataKey="expenses" stroke="#06b6d4" fillOpacity={1} fill="url(#colorExpenses)" strokeWidth={3} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
            <div className="glow-corner" style={{ position: 'absolute', top: '-10%', right: '-10%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%)', filter: 'blur(60px)' }} />
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" style={{ padding: '10rem 3rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
          <h2 style={{ fontSize: '3.5rem', fontWeight: 900, marginBottom: '1.5rem', letterSpacing: '-0.04em' }}>Sophisticated Features.</h2>
          <p className="text-slate-400" style={{ fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto' }}>Designed for those who demand precision, clarity, and absolute control over their wealth.</p>
        </div>
        <div className="features-grid" style={{ maxWidth: '1250px', margin: '0 auto', gap: '2rem' }}>
          {features.map((feature, index) => (
            <div key={index} className="feature-card glass-card h-hover-up" style={{
              padding: '3rem',
              textAlign: 'left',
              borderRadius: '32px',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.01))',
              backdropFilter: 'blur(10px)'
            }}>
              <div className="feature-icon" style={{
                margin: '0 0 2rem 0',
                background: `linear-gradient(135deg, ${feature.color}, ${feature.color}aa)`,
                color: 'white',
                boxShadow: `0 10px 30px -5px ${feature.color}66`,
                width: '60px',
                height: '60px',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {feature.icon}
              </div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', fontWeight: 700, background: 'none', webkitTextFillColor: 'initial', color: 'white' }}>{feature.title}</h3>
              <p style={{ color: '#94a3b8', lineHeight: 1.6, fontSize: '1.05rem' }}>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Analytics Showcase - NEW SECTION */}
      <section style={{ padding: '5rem 3rem', background: 'rgba(139, 92, 246, 0.02)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1rem' }}>See Your Wealth Grow.</h2>
            <p className="text-slate-400">Advanced visualization tools to track every penny.</p>
          </div>

          <div className="grid grid-cols-2 gap-8" style={{ alignItems: 'center' }}>
            {/* Left: Text */}
            <div>
              <h3 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1.5rem', color: '#fff' }}>Portfolio Performance</h3>
              <p style={{ color: '#94a3b8', lineHeight: 1.8, marginBottom: '2rem' }}>
                Track your investments across multiple asset classes with real-time data updates.
                Our AI analyzes market trends to give you the edge you need.
                <br /><br />
                • Real-time Asset Tracking<br />
                • Dividend Yield Analysis<br />
                • Risk Assessment Indicators
              </p>
              <button className="btn btn-ghost" style={{ borderRadius: '12px' }}>Explore Analytics</button>
            </div>

            {/* Right: Chart */}
            <div className="glass-card" style={{ padding: '2rem', height: '400px' }}>
              <div className="flex justify-between items-center mb-6">
                <h4 className="text-lg font-semibold text-white">Asset Allocation Trends</h4>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  {['1W', '1M', '3M', '1Y'].map(t => (
                    <div key={t} style={{ fontSize: '0.75rem', padding: '0.25rem 0.75rem', borderRadius: '8px', background: t === '1Y' ? 'rgba(139, 92, 246, 0.2)' : 'transparent', color: t === '1Y' ? '#a78bfa' : '#64748b', cursor: 'pointer' }}>{t}</div>
                  ))}
                </div>
              </div>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={investmentData} layout="vertical" margin={{ left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={true} vertical={false} />
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} width={60} />
                  <Tooltip cursor={{ fill: 'rgba(255,255,255,0.02)' }} contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }} itemStyle={{ color: '#fff' }} />
                  <Bar dataKey="value" fill="#8b5cf6" radius={[0, 4, 4, 0]} barSize={20}>
                    {investmentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" style={{ padding: '12rem 3rem', background: 'rgba(139, 92, 246, 0.01)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', gap: '8rem', alignItems: 'center' }}>
          <div style={{ flex: 1.2 }}>
            <h2 style={{ fontSize: '3.75rem', fontWeight: 900, marginBottom: '3rem', letterSpacing: '-0.04em' }}>Unmatched <br /><span className="gradient-text">Simplicity.</span></h2>
            <div className="steps-container">
              {steps.map((step, i) => (
                <div key={i} style={{ display: 'flex', gap: '2rem', marginBottom: '3.5rem' }}>
                  <div style={{
                    width: '48px', height: '48px', borderRadius: '16px', background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, flexShrink: 0,
                    boxShadow: '0 10px 20px -5px rgba(139, 92, 246, 0.3)'
                  }}>
                    {i + 1}
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', fontWeight: 700 }}>{step.title}</h4>
                    <p className="text-slate-400" style={{ fontSize: '1.125rem' }}>{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <div className="glass-card animate-float" style={{
              padding: '2.5rem',
              borderRadius: '36px',
              boxShadow: '0 40px 80px -20px rgba(0,0,0,0.4)',
              border: '1px solid rgba(139, 92, 246, 0.2)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginBottom: '2rem' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Check size={28} />
                </div>
                <div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 700 }}>Goal Achieved!</div>
                  <div className="text-sm text-slate-500">Savings target reached successfully</div>
                </div>
              </div>
              <div style={{ height: '12px', background: 'rgba(255,255,255,0.06)', borderRadius: '6px', overflow: 'hidden' }}>
                <div style={{ width: '100%', height: '100%', background: 'linear-gradient(90deg, #10b981, #34d399)' }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="pricing" style={{ padding: '10rem 3rem' }}>
        <div className="cta-section animate-fade-in" style={{
          maxWidth: '1250px', margin: '0 auto', padding: '8rem 5rem', borderRadius: '56px',
          background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(6, 182, 212, 0.15))',
          border: '1px solid rgba(139, 92, 246, 0.3)',
          position: 'relative', overflow: 'hidden'
        }}>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <h2 style={{ fontSize: '4.5rem', fontWeight: 900, marginBottom: '2rem', letterSpacing: '-0.05em' }}>Elevate Your <br />Financial Status.</h2>
            <p style={{ fontSize: '1.375rem', color: '#cbd5e1', marginBottom: '4rem', maxWidth: '650px', margin: '0 auto 4rem', lineHeight: 1.6 }}>
              Join an exclusive community of 50,000+ visionaries mastering their wealth with AI precision.
            </p>
            <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center' }}>
              <button onClick={onSignup} className="btn btn-primary btn-lg" style={{ minWidth: '240px', py: '1.25rem' }}>Join the community</button>
              <button className="btn btn-ghost btn-lg" style={{ background: 'rgba(255,255,255,0.06)', minWidth: '240px' }}>Talk to an expert</button>
            </div>
          </div>
          {/* Decorative Background for CTA */}
          <div style={{
            position: 'absolute', bottom: '-150px', left: '-100px', width: '500px', height: '500px',
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.25) 0%, transparent 70%)', borderRadius: '50%'
          }} />
          <div style={{
            position: 'absolute', top: '-100px', right: '-100px', width: '400px', height: '400px',
            background: 'radial-gradient(circle, rgba(6, 182, 212, 0.2) 0%, transparent 70%)', borderRadius: '50%'
          }} />
        </div>
      </section>

      {/* Premium Footer - Matching Header Theme */}
      <footer style={{
        padding: '6rem 3rem 3rem',
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

        <div style={{ maxWidth: '1300px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '4rem', marginBottom: '4rem' }}>
            {/* Brand Section */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 0 25px -5px rgba(139, 92, 246, 0.5)'
                }}>
                  <img src="/logo.png" alt="SamAgent Logo" style={{ width: '28px', height: '28px', objectFit: 'contain' }} />
                </div>
                <span style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff' }}>SamAgent</span>
              </div>
              <p style={{ color: '#94a3b8', lineHeight: 1.8, marginBottom: '2rem', fontSize: '0.95rem', maxWidth: '320px' }}>
                The world's most sophisticated AI financial companion. Redefining wealth management with uncompromised privacy.
              </p>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                {[<Twitter size={18} />, <Github size={18} />, <Linkedin size={18} />, <MessageCircle size={18} />].map((icon, i) => (
                  <div key={i} style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
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

            <FooterColumn title="Product" links={['Features', 'Intelligence', 'Security', 'Roadmap', 'Integration']} />
            <FooterColumn title="Company" links={['Our Vision', 'About Us', 'Careers', 'Privacy Policy', 'Contact']} />
            <FooterColumn title="Resources" links={['Community', 'Finance Blog', 'Documentation', 'Help Center', 'API']} />
          </div>

          {/* Bottom Bar */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: '2rem',
            borderTop: '1px solid rgba(139, 92, 246, 0.1)'
          }}>
            <div style={{ color: '#64748b', fontSize: '0.875rem' }}>
              © 2024 SamAgent AI Corp. All rights reserved.
            </div>
            <div style={{ display: 'flex', gap: '2rem' }}>
              {['Privacy', 'Terms', 'GDPR'].map((link) => (
                <a key={link} href="#" style={{ color: '#64748b', fontSize: '0.875rem', textDecoration: 'none', transition: 'color 0.2s' }}>{link}</a>
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

      <style>{`
        .h-hover-up { transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1); }
        .h-hover-up:hover { transform: translateY(-12px); box-shadow: 0 40px 80px -20px rgba(0,0,0,0.5); border-color: rgba(139, 92, 246, 0.4) !important; }
        .hover-text-primary:hover { color: #a78bfa !important; }
        
        .hero-title .gradient-text-hero {
          background: linear-gradient(135deg, #8b5cf6, #06b6d4, #f472b6, #fbbf24, #f43f5e, #8b5cf6);
          background-size: 300% auto;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shine 6s linear infinite;
        }

        @keyframes shine {
          to { background-position: 300% center; }
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 1rem;
          padding: 0.75rem 1.5rem;
          background: rgba(139, 92, 246, 0.12);
          border: 1px solid rgba(139, 92, 246, 0.2);
          border-radius: 100px;
          color: #a78bfa;
          font-weight: 700;
          font-size: 0.9375rem;
          letter-spacing: 0.02em;
          text-transform: uppercase;
        }

        .scrolled {
          background: rgba(10, 14, 26, 0.9) !important;
          backdrop-filter: blur(24px) !important;
          box-shadow: 0 20px 40px -15px rgba(0,0,0,0.5) !important;
        }

        @media (max-width: 1024px) {
          .hero-title { font-size: 3.5rem !important; }
          footer > div > div { grid-template-columns: 1fr 1fr !important; }
        }
        
        @keyframes chatSlideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes chatPulse {
          0%, 100% { transform: scale(1); box-shadow: 0 8px 32px -4px rgba(139, 92, 246, 0.5); }
          50% { transform: scale(1.05); box-shadow: 0 12px 40px -4px rgba(139, 92, 246, 0.7); }
        }
        @keyframes typingDot {
          0%, 60%, 100% { opacity: 0.3; transform: translateY(0); }
          30% { opacity: 1; transform: translateY(-4px); }
        }
      `}</style>

      {/* Floating Chat Widget */}
      <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 9999 }}>
        {/* Chat Popup */}
        {isChatOpen && (
          <div style={{
            position: 'absolute',
            bottom: '70px',
            right: '0',
            width: '380px',
            height: '500px',
            background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.98) 0%, rgba(30, 41, 59, 0.98) 100%)',
            borderRadius: '20px',
            border: '1px solid rgba(139, 92, 246, 0.2)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(139, 92, 246, 0.1)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            animation: 'chatSlideUp 0.3s ease-out'
          }}>
            {/* Chat Header */}
            <div style={{
              padding: '1rem 1.25rem',
              background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(6, 182, 212, 0.1))',
              borderBottom: '1px solid rgba(148, 163, 184, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Bot size={20} color="white" />
                </div>
                <div>
                  <div style={{ fontWeight: 600, color: '#f8fafc', fontSize: '0.95rem' }}>Guide Bot</div>
                  <div style={{ fontSize: '0.7rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981' }}></span>
                    Online
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsChatOpen(false)}
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#94a3b8'
                }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Chat Messages */}
            <div style={{
              flex: 1,
              padding: '1rem',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem'
            }}>
              {chatMessages.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '2rem 1rem', color: '#64748b' }}>
                  <Bot size={40} style={{ opacity: 0.3, marginBottom: '0.75rem' }} />
                  <p style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>Hi there! 👋</p>
                  <p style={{ fontSize: '0.8rem' }}>Ask about login, signup, features, or how SamAgent works!</p>
                </div>
              ) : (
                chatMessages.map(msg => (
                  <div
                    key={msg.id}
                    style={{
                      maxWidth: '85%',
                      padding: '0.75rem 1rem',
                      borderRadius: msg.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                      background: msg.role === 'user'
                        ? 'linear-gradient(135deg, #8b5cf6, #7c3aed)'
                        : 'rgba(30, 41, 59, 0.8)',
                      alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                      color: '#f8fafc',
                      fontSize: '0.85rem',
                      lineHeight: 1.5,
                      border: msg.role === 'agent' ? '1px solid rgba(148, 163, 184, 0.1)' : 'none'
                    }}
                  >
                    {msg.text}
                  </div>
                ))
              )}
              {isTyping && (
                <div style={{
                  padding: '0.75rem 1rem',
                  borderRadius: '16px 16px 16px 4px',
                  background: 'rgba(30, 41, 59, 0.8)',
                  border: '1px solid rgba(148, 163, 184, 0.1)',
                  alignSelf: 'flex-start',
                  display: 'flex',
                  gap: '0.35rem',
                  alignItems: 'center'
                }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#8b5cf6', animation: 'typingDot 1.4s infinite ease-in-out' }}></span>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#8b5cf6', animation: 'typingDot 1.4s infinite ease-in-out 0.2s' }}></span>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#8b5cf6', animation: 'typingDot 1.4s infinite ease-in-out 0.4s' }}></span>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Chat Input */}
            <div style={{
              padding: '1rem',
              borderTop: '1px solid rgba(148, 163, 184, 0.1)',
              display: 'flex',
              gap: '0.5rem'
            }}>
              <input
                type="text"
                placeholder="Ask me anything..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendChat()}
                style={{
                  flex: 1,
                  padding: '0.75rem 1rem',
                  background: 'rgba(30, 41, 59, 0.8)',
                  border: '1px solid rgba(148, 163, 184, 0.15)',
                  borderRadius: '12px',
                  color: '#f8fafc',
                  fontSize: '0.875rem',
                  outline: 'none'
                }}
              />
              <button
                onClick={handleSendChat}
                disabled={!chatInput.trim()}
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  background: chatInput.trim() ? 'linear-gradient(135deg, #8b5cf6, #7c3aed)' : 'rgba(100, 116, 139, 0.2)',
                  border: 'none',
                  cursor: chatInput.trim() ? 'pointer' : 'not-allowed',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white'
                }}
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        )}

        {/* Floating Button */}
        <button
          onClick={() => setIsChatOpen(!isChatOpen)}
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: isChatOpen
              ? 'linear-gradient(135deg, #f43f5e, #e11d48)'
              : 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 32px -4px rgba(139, 92, 246, 0.5)',
            transition: 'all 0.3s ease',
            animation: isChatOpen ? 'none' : 'chatPulse 2s infinite'
          }}
        >
          {isChatOpen ? <X size={24} color="white" /> : <MessageCircle size={24} color="white" />}
        </button>
      </div>
    </div>
  );
}

function SocialIcon({ icon }) {
  return (
    <div style={{
      width: '44px', height: '44px', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.06)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b',
      cursor: 'pointer', transition: 'all 0.3s ease', background: 'rgba(255,255,255,0.02)'
    }} className="h-hover-up hover-text-primary">
      {icon}
    </div>
  );
}

function FooterColumn({ title, links }) {
  return (
    <div>
      <h5 className="footer-section-title">{title}</h5>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {links.map(link => (
          <li key={link}>
            <a href="#" className="footer-link-modern">
              {link}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

import { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { VoiceAssistant } from './components/VoiceAssistant';
import { Dashboard } from './components/Dashboard';
import { ChatAssistant } from './components/ChatAssistant';
import { Transactions } from './components/Transactions';
import { GoalsBudget } from './components/GoalsBudget';
import { Settings } from './components/Settings';
import { LandingPage } from './components/LandingPage';
import { AuthModal } from './components/AuthModal';
import { LogOut } from 'lucide-react';
import Features from './pages/Features';
import HowItWorks from './pages/HowItWorks';
import Pricing from './pages/Pricing';
import About from './pages/About';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';

import { Navbar } from './components/Navbar';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [user, setUser] = useState(null);
  const [authModal, setAuthModal] = useState({ isOpen: false, mode: 'login' });

  // Check for existing session on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('finance_current_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleAuth = (userData) => {
    setUser(userData);
    setAuthModal({ isOpen: false, mode: 'login' });
  };

  const handleLogout = () => {
    localStorage.removeItem('finance_current_user');
    setUser(null);
    setActiveTab('dashboard');
  };

  const openLogin = () => window.location.href = '/login';
  const openSignup = () => window.location.href = '/signup';

  // If not logged in, show landing pages
  if (!user) {
    const renderLandingContent = () => {
      const path = window.location.pathname;
      switch (path) {
        case '/login':
          return <LoginPage onAuth={handleAuth} />;
        case '/signup':
          return <SignupPage onAuth={handleAuth} />;
        case '/features':
          return (
            <>
              <Navbar onLogin={openLogin} onSignup={openSignup} />
              <Features onLogin={openLogin} onSignup={openSignup} />
            </>
          );
        case '/how-it-works':
          return (
            <>
              <Navbar onLogin={openLogin} onSignup={openSignup} />
              <HowItWorks onLogin={openLogin} onSignup={openSignup} />
            </>
          );
        case '/pricing':
          return (
            <>
              <Navbar onLogin={openLogin} onSignup={openSignup} />
              <Pricing onLogin={openLogin} onSignup={openSignup} />
            </>
          );
        case '/about':
          return (
            <>
              <Navbar onLogin={openLogin} onSignup={openSignup} />
              <About onLogin={openLogin} onSignup={openSignup} />
            </>
          );
        default:
          return (
            <>
              <Navbar onLogin={openLogin} onSignup={openSignup} />
              <LandingPage onLogin={openLogin} onSignup={openSignup} />
            </>
          );
      }
    };

    return (
      <>
        {renderLandingContent()}
      </>
    );
  }

  // Logged in - show dashboard
  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard userName={user.name} onNavigate={setActiveTab} />;
      case 'transactions':
        return <Transactions onNavigate={setActiveTab} />;
      case 'goals':
        return <GoalsBudget onNavigate={setActiveTab} />;
      case 'assistant':
        return <ChatAssistant />;
      case 'settings':
        return <Settings user={user} onLogout={handleLogout} onUpdateUser={(updatedUser) => setUser(updatedUser)} />;
      default:
        return <Dashboard userName={user.name} />;
    }
  };

  return (
    <div className="layout-grid">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} user={user} onLogout={handleLogout} />
      <main className="main-content">
        {renderContent()}
      </main>
      <VoiceAssistant />
    </div>
  );
}

export default App;

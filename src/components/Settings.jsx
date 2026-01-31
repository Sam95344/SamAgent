import { useState, useEffect } from 'react';
import { useFinance } from '../context/FinanceContext';
import { User, Bell, Palette, Database, Download, Upload, Trash2, Shield, Moon, Sun, LogOut, ShieldCheck, Check, Camera, Lock, Eye, EyeOff } from 'lucide-react';
import { authAPI } from '../lib/api';

// Google icon component
const GoogleIcon = ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.2 4.53z" fill="#EA4335" />
    </svg>
);

export function Settings({ user, onLogout, onUpdateUser }) {
    const { transactions, goals, setGoals } = useFinance();
    const [saved, setSaved] = useState(false);
    const [profileLoading, setProfileLoading] = useState(false);
    const [passwordLoading, setPasswordLoading] = useState(false);
    const [passwordError, setPasswordError] = useState('');
    const [passwordSuccess, setPasswordSuccess] = useState('');
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [passwordForm, setPasswordForm] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    // Settings state (persisted to localStorage)
    const [settings, setSettings] = useState(() => {
        const saved = localStorage.getItem('finance_settings');
        return saved ? JSON.parse(saved) : {
            userName: user?.name || 'User',
            currency: 'USD',
            theme: 'dark',
            notifications: {
                budgetAlerts: true,
                goalReminders: true,
                weeklyReport: false
            },
            privacy: {
                hideBalance: false,
                requirePin: false
            }
        };
    });

    // Apply theme to document
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', settings.theme);
        localStorage.setItem('finance_settings', JSON.stringify(settings));
    }, [settings]);

    const updateSetting = (key, value) => {
        setSettings(prev => ({ ...prev, [key]: value }));
        showSaved();
    };

    const updateNestedSetting = (parent, key, value) => {
        setSettings(prev => ({
            ...prev,
            [parent]: { ...prev[parent], [key]: value }
        }));
        showSaved();
    };

    const showSaved = () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    // Handle profile photo upload
    const handlePhotoUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        if (file.size > 2000000) { // 2MB limit for base64
            alert('File is too large. Please choose an image under 2MB.');
            return;
        }

        setProfileLoading(true);
        const reader = new FileReader();
        reader.onload = async (e) => {
            try {
                const photoUrl = e.target.result;
                const data = await authAPI.updateProfile(user.name, photoUrl);
                if (onUpdateUser) onUpdateUser(data.user);
                showSaved();
            } catch (error) {
                alert('Failed to update profile photo');
            } finally {
                setProfileLoading(false);
            }
        };
        reader.readAsDataURL(file);
    };

    // Handle display name update
    const handleNameUpdate = async (newName) => {
        if (newName === user?.name) return;
        setProfileLoading(true);
        try {
            const data = await authAPI.updateProfile(newName, user?.photo);
            if (onUpdateUser) onUpdateUser(data.user);
            updateSetting('userName', newName);
        } catch (error) {
            alert('Failed to update name');
        } finally {
            setProfileLoading(false);
        }
    };

    // Handle password change
    const handlePasswordChange = async (e) => {
        e.preventDefault();
        setPasswordError('');
        setPasswordSuccess('');

        if (passwordForm.newPassword !== passwordForm.confirmPassword) {
            setPasswordError('New passwords do not match');
            return;
        }

        if (passwordForm.newPassword.length < 6) {
            setPasswordError('Password must be at least 6 characters');
            return;
        }

        setPasswordLoading(true);
        try {
            await authAPI.changePassword(passwordForm.currentPassword, passwordForm.newPassword);
            setPasswordSuccess('Password changed successfully!');
            setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
        } catch (error) {
            setPasswordError(error.message || 'Failed to change password');
        } finally {
            setPasswordLoading(false);
        }
    };

    // Data management functions
    const exportData = () => {
        const data = {
            transactions: JSON.parse(localStorage.getItem('finance_transactions') || '[]'),
            goals: JSON.parse(localStorage.getItem('finance_goals') || '[]'),
            settings: settings,
            exportDate: new Date().toISOString()
        };
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `samagent-backup-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
    };

    const importData = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const data = JSON.parse(e.target.result);
                    if (data.transactions) localStorage.setItem('finance_transactions', JSON.stringify(data.transactions));
                    if (data.goals) localStorage.setItem('finance_goals', JSON.stringify(data.goals));
                    if (data.settings) {
                        localStorage.setItem('finance_settings', JSON.stringify(data.settings));
                        setSettings(data.settings);
                    }
                    alert('Data imported successfully! Please refresh the page.');
                } catch (err) {
                    alert('Failed to import data. Please check the file format.');
                }
            };
            reader.readAsText(file);
        }
    };

    const clearAllData = () => {
        if (confirm('Are you sure you want to delete ALL your data? This cannot be undone!')) {
            localStorage.removeItem('finance_transactions');
            localStorage.removeItem('finance_goals');
            localStorage.removeItem('finance_settings');
            alert('All data cleared. Refreshing page...');
            window.location.reload();
        }
    };

    const currencies = [
        { code: 'USD', symbol: '$', name: 'US Dollar' },
        { code: 'EUR', symbol: '€', name: 'Euro' },
        { code: 'GBP', symbol: '£', name: 'British Pound' },
        { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
        { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
        { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
        { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
    ];

    return (
        <div className="animate-in">
            {/* Header */}
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
                <div>
                    <h2 style={{ marginBottom: '0.5rem' }}>Settings</h2>
                    <p className="text-slate-400">Manage your preferences and account settings</p>
                </div>
                {saved && (
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.5rem 1rem',
                        borderRadius: '8px',
                        background: 'rgba(16, 185, 129, 0.1)',
                        color: '#34d399',
                        fontSize: '0.875rem',
                        fontWeight: 500
                    }}>
                        <Check size={16} />
                        Settings saved
                    </div>
                )}
            </header>

            <div className="grid grid-cols-2 gap-6">
                {/* Account & Profile - Enhanced */}
                <SettingsCard
                    icon={<User size={20} />}
                    title="Account & Profile"
                    description="Manage your identity and session"
                >
                    <div className="space-y-4">
                        {/* Profile Photo */}
                        <SettingItem label="Profile Photo">
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <div style={{
                                    width: '50px',
                                    height: '50px',
                                    borderRadius: '50%',
                                    background: user?.photo ? `url(${user.photo}) center/cover` : 'linear-gradient(135deg, #8b5cf6, #06b6d4)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'white',
                                    fontWeight: 600,
                                    fontSize: '1.25rem'
                                }}>
                                    {!user?.photo && (user?.name?.charAt(0)?.toUpperCase() || 'U')}
                                </div>
                                <label style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    padding: '0.5rem 1rem',
                                    borderRadius: '8px',
                                    background: 'rgba(139, 92, 246, 0.1)',
                                    border: '1px solid rgba(139, 92, 246, 0.3)',
                                    color: '#a78bfa',
                                    cursor: profileLoading ? 'wait' : 'pointer',
                                    fontSize: '0.875rem',
                                    fontWeight: 500
                                }}>
                                    <Camera size={16} />
                                    {profileLoading ? 'Uploading...' : 'Change'}
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handlePhotoUpload}
                                        style={{ display: 'none' }}
                                        disabled={profileLoading}
                                    />
                                </label>
                            </div>
                        </SettingItem>

                        {/* Display Name */}
                        <SettingItem label="Display Name">
                            <input
                                type="text"
                                value={settings.userName}
                                onChange={(e) => updateSetting('userName', e.target.value)}
                                onBlur={(e) => handleNameUpdate(e.target.value)}
                                placeholder="Your name"
                                style={{ maxWidth: '200px' }}
                            />
                        </SettingItem>

                        {/* Email (readonly) */}
                        <SettingItem label="Email">
                            <span style={{ color: '#64748b', fontSize: '0.875rem' }}>{user?.email}</span>
                        </SettingItem>

                        {/* Currency */}
                        <SettingItem label="Currency">
                            <select
                                value={settings.currency}
                                onChange={(e) => updateSetting('currency', e.target.value)}
                                style={{ maxWidth: '200px' }}
                            >
                                {currencies.map(c => (
                                    <option key={c.code} value={c.code}>{c.symbol} {c.code} - {c.name}</option>
                                ))}
                            </select>
                        </SettingItem>
                    </div>
                </SettingsCard>

                {/* Password Change */}
                <SettingsCard
                    icon={<Lock size={20} />}
                    title="Change Password"
                    description="Update your account password"
                >
                    <form onSubmit={handlePasswordChange} className="space-y-4">
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: '#94a3b8' }}>Current Password</label>
                            <div style={{ position: 'relative' }}>
                                <input
                                    type={showCurrentPassword ? 'text' : 'password'}
                                    value={passwordForm.currentPassword}
                                    onChange={(e) => setPasswordForm(prev => ({ ...prev, currentPassword: e.target.value }))}
                                    placeholder="••••••••"
                                    style={{ width: '100%', paddingRight: '2.5rem' }}
                                />
                                <button type="button" onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                    style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#64748b', cursor: 'pointer' }}>
                                    {showCurrentPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: '#94a3b8' }}>New Password</label>
                            <div style={{ position: 'relative' }}>
                                <input
                                    type={showNewPassword ? 'text' : 'password'}
                                    value={passwordForm.newPassword}
                                    onChange={(e) => setPasswordForm(prev => ({ ...prev, newPassword: e.target.value }))}
                                    placeholder="••••••••"
                                    style={{ width: '100%', paddingRight: '2.5rem' }}
                                />
                                <button type="button" onClick={() => setShowNewPassword(!showNewPassword)}
                                    style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#64748b', cursor: 'pointer' }}>
                                    {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: '#94a3b8' }}>Confirm New Password</label>
                            <input
                                type="password"
                                value={passwordForm.confirmPassword}
                                onChange={(e) => setPasswordForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                                placeholder="••••••••"
                                style={{ width: '100%' }}
                            />
                        </div>

                        {passwordError && (
                            <div style={{ color: '#fb7185', fontSize: '0.875rem', background: 'rgba(244,63,94,0.1)', padding: '0.75rem', borderRadius: '8px' }}>
                                {passwordError}
                            </div>
                        )}
                        {passwordSuccess && (
                            <div style={{ color: '#34d399', fontSize: '0.875rem', background: 'rgba(16,185,129,0.1)', padding: '0.75rem', borderRadius: '8px' }}>
                                {passwordSuccess}
                            </div>
                        )}

                        <button type="submit" disabled={passwordLoading} style={{
                            width: '100%',
                            padding: '0.75rem',
                            background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)',
                            border: 'none',
                            borderRadius: '10px',
                            color: 'white',
                            fontWeight: 600,
                            cursor: passwordLoading ? 'wait' : 'pointer',
                            opacity: passwordLoading ? 0.7 : 1
                        }}>
                            {passwordLoading ? 'Updating...' : 'Update Password'}
                        </button>
                    </form>
                </SettingsCard>

                {/* Appearance */}
                <SettingsCard
                    icon={<Palette size={20} />}
                    title="Appearance"
                    description="Customize the look and feel"
                >
                    <SettingItem label="Theme">
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <ThemeButton
                                active={settings.theme === 'dark'}
                                onClick={() => updateSetting('theme', 'dark')}
                                icon={<Moon size={16} />}
                                label="Dark"
                            />
                            <ThemeButton
                                active={settings.theme === 'light'}
                                onClick={() => updateSetting('theme', 'light')}
                                icon={<Sun size={16} />}
                                label="Light"
                            />
                        </div>
                    </SettingItem>
                </SettingsCard>

                {/* Notifications */}
                <SettingsCard
                    icon={<Bell size={20} />}
                    title="Notifications"
                    description="Control your alerts and reminders"
                >
                    <SettingItem label="Budget Alerts" description="Get notified when spending exceeds budget">
                        <Toggle
                            checked={settings.notifications.budgetAlerts}
                            onChange={(val) => updateNestedSetting('notifications', 'budgetAlerts', val)}
                        />
                    </SettingItem>
                    <SettingItem label="Goal Reminders" description="Weekly progress updates on goals">
                        <Toggle
                            checked={settings.notifications.goalReminders}
                            onChange={(val) => updateNestedSetting('notifications', 'goalReminders', val)}
                        />
                    </SettingItem>
                    <SettingItem label="Weekly Report" description="Receive weekly spending summary">
                        <Toggle
                            checked={settings.notifications.weeklyReport}
                            onChange={(val) => updateNestedSetting('notifications', 'weeklyReport', val)}
                        />
                    </SettingItem>
                </SettingsCard>

                {/* Privacy */}
                <SettingsCard
                    icon={<Shield size={20} />}
                    title="Privacy & Security"
                    description="Protect your financial data"
                >
                    <SettingItem label="Hide Balance" description="Mask balance amounts on dashboard">
                        <Toggle
                            checked={settings.privacy.hideBalance}
                            onChange={(val) => updateNestedSetting('privacy', 'hideBalance', val)}
                        />
                    </SettingItem>
                </SettingsCard>

                {/* Data Management */}
                <div className="glass-card" style={{ gridColumn: 'span 2', padding: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                        <div style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '10px',
                            background: 'rgba(139, 92, 246, 0.15)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#a78bfa'
                        }}>
                            <Database size={20} />
                        </div>
                        <div>
                            <h3 className="font-semibold">Data Management</h3>
                            <p className="text-sm text-slate-500">Export, import, or clear your financial data</p>
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                        <button
                            onClick={exportData}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                padding: '0.75rem 1.25rem',
                                borderRadius: '10px',
                                background: 'rgba(16, 185, 129, 0.1)',
                                border: '1px solid rgba(16, 185, 129, 0.3)',
                                color: '#34d399',
                                cursor: 'pointer',
                                fontWeight: 500
                            }}
                        >
                            <Download size={18} />
                            Export Data
                        </button>

                        <label style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            padding: '0.75rem 1.25rem',
                            borderRadius: '10px',
                            background: 'rgba(6, 182, 212, 0.1)',
                            border: '1px solid rgba(6, 182, 212, 0.3)',
                            color: '#22d3ee',
                            cursor: 'pointer',
                            fontWeight: 500
                        }}>
                            <Upload size={18} />
                            Import Data
                            <input
                                type="file"
                                accept=".json"
                                onChange={importData}
                                style={{ display: 'none' }}
                            />
                        </label>

                        <button
                            onClick={clearAllData}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                padding: '0.75rem 1.25rem',
                                borderRadius: '10px',
                                background: 'rgba(244, 63, 94, 0.1)',
                                border: '1px solid rgba(244, 63, 94, 0.3)',
                                color: '#fb7185',
                                cursor: 'pointer',
                                fontWeight: 500,
                                marginLeft: 'auto'
                            }}
                        >
                            <Trash2 size={18} />
                            Clear All Data
                        </button>
                    </div>

                    {/* Data Stats */}
                    <div style={{
                        marginTop: '1.5rem',
                        padding: '1rem',
                        background: 'rgba(0,0,0,0.2)',
                        borderRadius: '10px',
                        display: 'flex',
                        gap: '2rem'
                    }}>
                        <DataStat label="Transactions" value={transactions.length} />
                        <DataStat label="Goals" value={goals.length} />
                        <DataStat label="Storage Used" value={`${(new Blob([JSON.stringify(localStorage)]).size / 1024).toFixed(1)} KB`} />
                    </div>
                </div>
            </div>
        </div>
    );
}

function SettingsCard({ icon, title, description, children }) {
    return (
        <div className="glass-card" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    background: 'rgba(139, 92, 246, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#a78bfa'
                }}>
                    {icon}
                </div>
                <div>
                    <h3 className="font-semibold">{title}</h3>
                    <p className="text-sm text-slate-500">{description}</p>
                </div>
            </div>
            <div className="space-y-4">
                {children}
            </div>
        </div>
    );
}

function SettingItem({ label, description, children }) {
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
                <div className="font-medium text-sm">{label}</div>
                {description && <div className="text-xs text-slate-500">{description}</div>}
            </div>
            {children}
        </div>
    );
}

function Toggle({ checked, onChange }) {
    return (
        <button
            onClick={() => onChange(!checked)}
            style={{
                width: '48px',
                height: '26px',
                borderRadius: '13px',
                background: checked ? 'linear-gradient(135deg, #8b5cf6, #06b6d4)' : 'rgba(100, 116, 139, 0.3)',
                border: 'none',
                cursor: 'pointer',
                position: 'relative',
                transition: 'all 0.2s'
            }}
        >
            <div style={{
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                background: 'white',
                position: 'absolute',
                top: '3px',
                left: checked ? '25px' : '3px',
                transition: 'all 0.2s',
                boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
            }} />
        </button>
    );
}

function ThemeButton({ active, onClick, icon, label, disabled }) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.5rem 1rem',
                borderRadius: '8px',
                background: active ? 'rgba(139, 92, 246, 0.2)' : 'transparent',
                border: `1px solid ${active ? 'rgba(139, 92, 246, 0.5)' : 'rgba(148, 163, 184, 0.2)'}`,
                color: active ? '#a78bfa' : '#64748b',
                cursor: disabled ? 'not-allowed' : 'pointer',
                opacity: disabled ? 0.5 : 1,
                fontSize: '0.875rem',
                fontWeight: 500
            }}
        >
            {icon}
            {label}
        </button>
    );
}

function DataStat({ label, value }) {
    return (
        <div>
            <div className="text-xs text-slate-500">{label}</div>
            <div className="font-semibold">{value}</div>
        </div>
    );
}

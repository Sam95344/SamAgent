// API Service for connecting to backend
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Get token from localStorage
const getToken = () => localStorage.getItem('token');

// API request helper
async function apiRequest(endpoint, options = {}) {
    const token = getToken();

    const config = {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...(token && { Authorization: `Bearer ${token}` }),
            ...options.headers
        }
    };

    const response = await fetch(`${API_URL}${endpoint}`, config);
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
    }

    return data;
}

// Auth API
export const authAPI = {
    register: async (name, email, password) => {
        const data = await apiRequest('/api/auth/register', {
            method: 'POST',
            body: JSON.stringify({ name, email, password })
        });
        if (data.token) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
        }
        return data;
    },

    login: async (email, password) => {
        const data = await apiRequest('/api/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password })
        });
        if (data.token) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
        }
        return data;
    },

    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    },

    getCurrentUser: async () => {
        return await apiRequest('/api/auth/me');
    },

    updateProfile: async (name, photo) => {
        const data = await apiRequest('/api/auth/profile', {
            method: 'PUT',
            body: JSON.stringify({ name, photo })
        });
        if (data.user) {
            localStorage.setItem('user', JSON.stringify(data.user));
        }
        return data;
    },

    changePassword: async (currentPassword, newPassword) => {
        return await apiRequest('/api/auth/password', {
            method: 'PUT',
            body: JSON.stringify({ currentPassword, newPassword })
        });
    },

    isLoggedIn: () => {
        return !!getToken();
    }
};

// Transactions API
export const transactionsAPI = {
    getAll: async () => {
        return await apiRequest('/api/transactions');
    },

    add: async (transaction) => {
        return await apiRequest('/api/transactions', {
            method: 'POST',
            body: JSON.stringify(transaction)
        });
    },

    delete: async (id) => {
        return await apiRequest(`/api/transactions/${id}`, {
            method: 'DELETE'
        });
    },

    getSummary: async () => {
        return await apiRequest('/api/transactions/summary');
    }
};

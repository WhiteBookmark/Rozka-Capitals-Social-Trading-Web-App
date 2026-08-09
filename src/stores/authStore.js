import { defineStore } from 'pinia';
import { API_BASE_URL } from '../config/api';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('rozka_user')) || {
      id: 'usr_1001',
      name: 'Alexander Rozka',
      email: 'alexander@rozka.com',
      phone: '+1 555-019-2831',
      dob: '1992-05-14',
      age: 34,
      accountType: 'Social Trading Investor',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    },
    token: localStorage.getItem('rozka_token') || 'demo_token_rozka_2026',
    isLoggedIn: !!localStorage.getItem('rozka_token') || true, // Default logged in for smooth demo preview
    isLoading: false,
    errorMessage: null,
    successMessage: null,
  }),

  getters: {
    userName: (state) => state.user?.name || 'Trader',
    userEmail: (state) => state.user?.email || '',
    userAvatar: (state) => state.user?.avatar || '',
  },

  actions: {
    /**
     * Authenticate user with credentials
     * @param {Object} credentials 
     */
    async login({ email, password, rememberMe = true }) {
      this.isLoading = true;
      this.errorMessage = null;

      try {
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 800));

        if (!email || !password) {
          throw new Error('Please fill in both email and password.');
        }

        // Mock success login
        const mockUser = {
          id: 'usr_' + Math.floor(1000 + Math.random() * 9000),
          name: email.split('@')[0].replace('.', ' ').toUpperCase(),
          email: email.trim(),
          phone: '+1 555-019-2831',
          dob: '1995-08-20',
          age: 31,
          accountType: 'Pro Social Trader',
        };

        const mockToken = 'jwt_rozka_' + Date.now();

        this.user = mockUser;
        this.token = mockToken;
        this.isLoggedIn = true;
        this.successMessage = 'Successfully logged in to Rozka Capitals!';

        if (rememberMe) {
          localStorage.setItem('rozka_token', mockToken);
          localStorage.setItem('rozka_user', JSON.stringify(mockUser));
        }

        return { success: true };
      } catch (err) {
        this.errorMessage = err.message || 'Failed to login. Please try again.';
        return { success: false, error: this.errorMessage };
      } finally {
        this.isLoading = false;
      }
    },

    /**
     * Register a new user
     * @param {Object} userData 
     */
    async register(userData) {
      this.isLoading = true;
      this.errorMessage = null;

      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const newProfile = {
          id: 'usr_' + Math.floor(1000 + Math.random() * 9000),
          name: userData.name,
          email: userData.email,
          phone: userData.phone,
          dob: userData.dob,
          age: userData.age,
          accountType: 'Social Trading Investor',
        };

        const mockToken = 'jwt_rozka_' + Date.now();

        this.user = newProfile;
        this.token = mockToken;
        this.isLoggedIn = true;
        this.successMessage = 'Account created successfully! Welcome to Rozka Capitals Social Trading.';

        localStorage.setItem('rozka_token', mockToken);
        localStorage.setItem('rozka_user', JSON.stringify(newProfile));

        return { success: true };
      } catch (err) {
        this.errorMessage = err.message || 'Registration failed. Please try again.';
        return { success: false, error: this.errorMessage };
      } finally {
        this.isLoading = false;
      }
    },

    /**
     * Logout active user session
     */
    logout() {
      this.user = null;
      this.token = null;
      this.isLoggedIn = false;
      this.errorMessage = null;
      this.successMessage = 'You have been logged out safely.';
      localStorage.removeItem('rozka_token');
      localStorage.removeItem('rozka_user');
    },

    /**
     * Clear active notifications
     */
    clearMessages() {
      this.errorMessage = null;
      this.successMessage = null;
    },
  },
});

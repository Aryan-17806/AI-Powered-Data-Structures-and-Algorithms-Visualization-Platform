import { create } from 'zustand';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const useAuthStore = create((set, get) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,

  setToken: (token) => {
    if (token) {
      localStorage.setItem('authToken', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      localStorage.removeItem('authToken');
      delete axios.defaults.headers.common['Authorization'];
    }
    set({ token });
  },

  signup: async (username, email, password, confirmPassword) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/auth/signup`, {
        username,
        email,
        password,
        confirmPassword,
      });
      set({
        user: response.data.user,
        token: response.data.token,
        isAuthenticated: true,
        loading: false,
      });
      get().setToken(response.data.token);
      return response.data;
    } catch (error) {
      const errorMsg = error.response?.data?.error || 'Signup failed';
      set({ error: errorMsg, loading: false });
      throw new Error(errorMsg);
    }
  },

  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/auth/login`, { email, password });
      set({
        user: response.data.user,
        token: response.data.token,
        isAuthenticated: true,
        loading: false,
      });
      get().setToken(response.data.token);
      return response.data;
    } catch (error) {
      const errorMsg = error.response?.data?.error || 'Login failed';
      set({ error: errorMsg, loading: false });
      throw new Error(errorMsg);
    }
  },

  checkAuth: async () => {
    const token = localStorage.getItem('authToken');
    if (token) {
      set({ token });
      get().setToken(token);
      try {
        const response = await axios.get(`${API_URL}/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        set({ user: response.data.user, isAuthenticated: true });
      } catch (error) {
        set({ isAuthenticated: false, token: null, user: null });
        localStorage.removeItem('authToken');
      }
    }
  },

  logout: () => {
    set({ user: null, token: null, isAuthenticated: false, error: null });
    localStorage.removeItem('authToken');
    delete axios.defaults.headers.common['Authorization'];
  },

  clearError: () => set({ error: null }),
}));

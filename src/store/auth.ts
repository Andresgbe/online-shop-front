import { create } from 'zustand';
import type { User, AuthTokens } from '../types';
import { authService } from '../services/auth';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, phone?: string) => Promise<void>;
  logout: () => void;
  loadUser: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,
  isAuthenticated: false,

  login: async (email, password) => {
    const data = await authService.login({ email, password });
    localStorage.setItem('tokens', JSON.stringify(data));
    const user = await authService.getProfile();
    set({ user, isAuthenticated: true });
  },

  register: async (name, email, password, phone) => {
    const data = await authService.register({ name, email, password, phone });
    localStorage.setItem('tokens', JSON.stringify(data));
    const user = await authService.getProfile();
    set({ user, isAuthenticated: true });
  },

  logout: () => {
    localStorage.removeItem('tokens');
    set({ user: null, isAuthenticated: false });
  },

  loadUser: async () => {
    try {
      const tokens = localStorage.getItem('tokens');
      if (!tokens) {
        set({ isLoading: false });
        return;
      }
      const user = await authService.getProfile();
      set({ user, isAuthenticated: true, isLoading: false });
    } catch {
      localStorage.removeItem('tokens');
      set({ user: null, isAuthenticated: false, isLoading: false });
    }
  },
}));
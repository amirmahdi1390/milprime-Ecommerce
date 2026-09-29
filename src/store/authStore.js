import { create } from 'zustand';

const AUTH_STORAGE_KEY = 'milprime_auth_session';

function getStoredSession() {
  if (typeof window === 'undefined') return { user: null, isAuthenticated: false };
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) return { user: null, isAuthenticated: false };
    const user = JSON.parse(raw);
    return { user, isAuthenticated: Boolean(user) };
  } catch (e) {
    console.error('Failed to parse auth session from localStorage', e);
    return { user: null, isAuthenticated: false };
  }
}

function persistSession(user) {
  if (typeof window === 'undefined') return;
  try {
    if (user) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  } catch (e) {
    console.error('Failed to persist auth session', e);
  }
}

export const useAuthStore = create((set) => ({
  ...getStoredSession(),

  /**
   * Realistic simulated login
   */
  login: async (email, password) => {
    // Simulated network delay
    await new Promise((resolve) => setTimeout(resolve, 600));

    const name = email.split('@')[0].replace(/[._]/g, ' ');
    const formattedName = name.charAt(0).toUpperCase() + name.slice(1);

    const user = {
      id: `usr_${Date.now()}`,
      email,
      name: formattedName || 'Client',
      role: email.includes('admin') ? 'admin' : 'customer',
      avatarUrl: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80`,
    };

    persistSession(user);
    set({ user, isAuthenticated: true });
    return user;
  },

  /**
   * Realistic simulated register
   */
  register: async (name, email, password) => {
    await new Promise((resolve) => setTimeout(resolve, 700));

    const user = {
      id: `usr_${Date.now()}`,
      email,
      name: name || 'Client',
      role: email.includes('admin') ? 'admin' : 'customer',
      avatarUrl: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80`,
    };

    persistSession(user);
    set({ user, isAuthenticated: true });
    return user;
  },

  /**
   * Logout and clear local session
   */
  logout: () => {
    persistSession(null);
    set({ user: null, isAuthenticated: false });
  },
}));

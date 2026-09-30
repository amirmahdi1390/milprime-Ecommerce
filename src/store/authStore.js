import { create } from 'zustand';

const AUTH_STORAGE_KEY = 'milprime_auth_session';

const USER_AVATAR = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" fill="none"><rect width="40" height="40" rx="20" fill="%23f4f4f5"/><circle cx="20" cy="15" r="6" fill="%2371717a"/><path d="M10 33c0-5.523 4.477-10 10-10s10 4.477 10 10" fill="%2371717a"/></svg>';
const ADMIN_AVATAR = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" fill="none"><rect width="40" height="40" rx="20" fill="%2309090b"/><path d="M20 10l8 4.5v6.5c0 5-3.5 9.5-8 11-4.5-1.5-8-6-8-11v-6.5l8-4.5z" stroke="%23ffffff" stroke-width="2" stroke-linejoin="round"/><circle cx="20" cy="19" r="2.5" fill="%23ffffff"/></svg>';

function getStoredSession() {
  if (typeof window === 'undefined') return { user: null, isAuthenticated: false };
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) return { user: null, isAuthenticated: false };
    const user = JSON.parse(raw);
    return { user, isAuthenticated: Boolean(user) };
  } catch (e) {
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
    // ignore
  }
}

export const useAuthStore = create((set) => ({
  ...getStoredSession(),

  login: async (email, password) => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const envAdminEmail = import.meta.env.VITE_ADMIN_EMAIL || '';
    const envAdminPass = import.meta.env.VITE_ADMIN_PASSWORD || '';

    const isAdmin = Boolean(
      (envAdminEmail && email.toLowerCase() === envAdminEmail.toLowerCase() && (!envAdminPass || password === envAdminPass)) ||
      (!envAdminEmail && email.toLowerCase().includes('admin'))
    );

    const name = email.split('@')[0].replace(/[._]/g, ' ');
    const formattedName = name.charAt(0).toUpperCase() + name.slice(1);

    const user = {
      id: `usr_${Date.now()}`,
      email,
      name: isAdmin ? (formattedName.toLowerCase().includes('admin') ? 'Studio Administrator' : formattedName) : (formattedName || 'Client Patron'),
      role: isAdmin ? 'admin' : 'customer',
      avatarUrl: isAdmin ? ADMIN_AVATAR : USER_AVATAR,
    };

    persistSession(user);
    set({ user, isAuthenticated: true });
    return user;
  },

  register: async (name, email, password) => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const user = {
      id: `usr_${Date.now()}`,
      email,
      name: name || 'Client Patron',
      role: 'customer',
      avatarUrl: USER_AVATAR,
    };

    persistSession(user);
    set({ user, isAuthenticated: true });
    return user;
  },

  logout: () => {
    persistSession(null);
    set({ user: null, isAuthenticated: false });
  },
}));

import { create } from 'zustand';

const AUTH_STORAGE_KEY = 'milprime_auth_session';
const REGISTERED_USERS_KEY = 'milprime_registered_users';

const USER_AVATAR = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" fill="none"><rect width="40" height="40" rx="20" fill="%23f4f4f5"/><circle cx="20" cy="15" r="6" fill="%2371717a"/><path d="M10 33c0-5.523 4.477-10 10-10s10 4.477 10 10" fill="%2371717a"/></svg>';
const ADMIN_AVATAR = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" fill="none"><rect width="40" height="40" rx="20" fill="%2309090b"/><path d="M20 10l8 4.5v6.5c0 5-3.5 9.5-8 11-4.5-1.5-8-6-8-11v-6.5l8-4.5z" stroke="%23ffffff" stroke-width="2" stroke-linejoin="round"/><circle cx="20" cy="19" r="2.5" fill="%23ffffff"/></svg>';

function getStoredUsers() {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(REGISTERED_USERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function saveRegisteredUsers(users) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(users));
  } catch (e) {
    // ignore
  }
}

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
    // Simulated realistic network latency
    await new Promise((resolve) => setTimeout(resolve, 300));

    const envAdminEmail = (import.meta.env.VITE_ADMIN_EMAIL || '').trim();
    const envAdminPass = (import.meta.env.VITE_ADMIN_PASSWORD || '').trim();

    const normalizedInputEmail = (email || '').trim().toLowerCase();
    const isAdminEmail = Boolean(envAdminEmail && normalizedInputEmail === envAdminEmail.toLowerCase());

    // 1. Check Studio Administrator credentials from environment
    if (isAdminEmail) {
      if (!envAdminPass || password !== envAdminPass) {
        throw new Error('Invalid administrator password');
      }
      const adminUser = {
        id: 'usr_admin',
        email: email.trim(),
        name: 'Studio Administrator',
        role: 'admin',
        avatarUrl: ADMIN_AVATAR,
      };
      persistSession(adminUser);
      set({ user: adminUser, isAuthenticated: true });
      return adminUser;
    }

    // 2. Check local client accounts from localStorage
    const users = getStoredUsers();
    const userAccount = users.find((u) => u.normalizedEmail === normalizedInputEmail);

    if (!userAccount) {
      throw new Error('No account found with this email. Please register first.');
    }

    if (userAccount.password !== password) {
      throw new Error('Invalid password provided.');
    }

    const sessionUser = {
      id: userAccount.id,
      email: userAccount.email,
      name: userAccount.name,
      role: 'customer',
      avatarUrl: userAccount.avatarUrl || USER_AVATAR,
    };

    persistSession(sessionUser);
    set({ user: sessionUser, isAuthenticated: true });
    return sessionUser;
  },

  register: async (name, email, password) => {
    await new Promise((resolve) => setTimeout(resolve, 300));

    if (!name || !name.trim()) throw new Error('Please provide your name.');
    if (!email || !email.trim()) throw new Error('Please provide a valid email address.');
    if (!password || password.length < 4) throw new Error('Password must be at least 4 characters.');

    const normalizedEmail = email.trim().toLowerCase();
    const users = getStoredUsers();

    // Check if account already exists
    const existing = users.find((u) => u.normalizedEmail === normalizedEmail);
    if (existing) {
      throw new Error('An account with this email address already exists. Please sign in.');
    }

    const newUser = {
      id: `usr_${Date.now()}`,
      name: name.trim(),
      email: email.trim(),
      normalizedEmail,
      password: password,
      role: 'customer',
      avatarUrl: USER_AVATAR,
      createdAt: new Date().toISOString(),
    };

    // Save account to local accounts list
    users.push(newUser);
    saveRegisteredUsers(users);

    // Establish active session
    const sessionUser = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: 'customer',
      avatarUrl: USER_AVATAR,
    };

    persistSession(sessionUser);
    set({ user: sessionUser, isAuthenticated: true });
    return sessionUser;
  },

  logout: () => {
    persistSession(null);
    set({ user: null, isAuthenticated: false });
  },
}));

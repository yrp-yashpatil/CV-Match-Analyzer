import { HistoryItem, User } from "../types";

// Mock keys
const USER_KEY_PREFIX = 'cv_analyzer_user_';
const HISTORY_KEY_PREFIX = 'cv_analyzer_history_';
const ACTIVE_USER_KEY = 'cv_analyzer_active_user';

export const storageService = {
  // Auth
  login: (email: string): User | null => {
    const storedUser = localStorage.getItem(USER_KEY_PREFIX + email);
    if (storedUser) {
      const user = JSON.parse(storedUser);
      localStorage.setItem(ACTIVE_USER_KEY, JSON.stringify(user));
      return user;
    }
    return null;
  },

  signup: (email: string, name: string): User => {
    const user: User = { email, name };
    localStorage.setItem(USER_KEY_PREFIX + email, JSON.stringify(user));
    localStorage.setItem(ACTIVE_USER_KEY, JSON.stringify(user));
    return user;
  },

  logout: () => {
    localStorage.removeItem(ACTIVE_USER_KEY);
  },

  getCurrentUser: (): User | null => {
    const stored = localStorage.getItem(ACTIVE_USER_KEY);
    return stored ? JSON.parse(stored) : null;
  },

  // History
  saveAnalysis: (userEmail: string, item: HistoryItem) => {
    const key = HISTORY_KEY_PREFIX + userEmail;
    const currentHistoryStr = localStorage.getItem(key);
    const currentHistory: HistoryItem[] = currentHistoryStr ? JSON.parse(currentHistoryStr) : [];
    
    // Add to beginning
    const updatedHistory = [item, ...currentHistory];
    localStorage.setItem(key, JSON.stringify(updatedHistory));
  },

  getHistory: (userEmail: string): HistoryItem[] => {
    const key = HISTORY_KEY_PREFIX + userEmail;
    const historyStr = localStorage.getItem(key);
    return historyStr ? JSON.parse(historyStr) : [];
  },

  deleteAnalysis: (userEmail: string, id: string) => {
    const key = HISTORY_KEY_PREFIX + userEmail;
    const currentHistoryStr = localStorage.getItem(key);
    if (currentHistoryStr) {
      const list: HistoryItem[] = JSON.parse(currentHistoryStr);
      const updated = list.filter(item => item.id !== id);
      localStorage.setItem(key, JSON.stringify(updated));
    }
  }
};
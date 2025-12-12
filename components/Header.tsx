import React from 'react';
import { Briefcase, History, LogIn, LogOut, User as UserIcon, Sun, Moon } from 'lucide-react';
import { User, AppState } from '../types';

interface HeaderProps {
  user: User | null;
  onNavigate: (state: AppState) => void;
  onLogout: () => void;
  currentAppState: AppState;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onNavigate, onLogout, currentAppState, theme, onToggleTheme }) => {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-indigo-100 dark:border-gray-700 sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div 
            className="flex items-center space-x-3 cursor-pointer group" 
            onClick={() => onNavigate(AppState.INPUT)}
          >
            <div className="bg-indigo-600 p-2 rounded-lg group-hover:bg-indigo-700 transition-colors">
              <Briefcase className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white leading-tight">CV Match Analyzer</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400 hidden sm:block">AI-Powered ATS Optimization</p>
            </div>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4">
            <button
              onClick={onToggleTheme}
              className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
            >
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>

            <div className="h-6 w-px bg-gray-200 dark:bg-gray-700 mx-1"></div>

            {user ? (
              <>
                <button
                  onClick={() => onNavigate(AppState.HISTORY)}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    currentAppState === AppState.HISTORY 
                      ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300' 
                      : 'text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <History className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">My Analyses</span>
                </button>
                
                <div className="flex items-center space-x-3">
                  <div className="hidden md:flex items-center text-sm text-gray-700 dark:text-gray-300">
                    <div className="bg-indigo-100 dark:bg-indigo-900/50 p-1 rounded-full mr-2">
                      <UserIcon className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <span className="font-medium">{user.name}</span>
                  </div>
                  <button
                    onClick={onLogout}
                    className="text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors p-2 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20"
                    title="Sign Out"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              </>
            ) : (
              <button
                onClick={() => onNavigate(AppState.AUTH)}
                className="flex items-center px-4 py-2 rounded-full bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm"
              >
                <LogIn className="w-4 h-4 mr-2" />
                Sign In / Sign Up
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
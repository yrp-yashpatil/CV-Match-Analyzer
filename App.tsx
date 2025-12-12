import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import AnalyzerForm from './components/AnalyzerForm';
import ResultsDashboard from './components/ResultsDashboard';
import AuthForm from './components/AuthForm';
import HistoryView from './components/HistoryView';
import { analyzeCV } from './services/geminiService';
import { storageService } from './services/storageService';
import { AnalysisResult, AppState, User, HistoryItem } from './types';

const App: React.FC = () => {
  const [cvText, setCvText] = useState<string>('');
  const [jdText, setJdText] = useState<string>('');
  const [appState, setAppState] = useState<AppState>(AppState.INPUT);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // Load user and theme on mount
  useEffect(() => {
    const currentUser = storageService.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }

    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark' || (!storedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  }, []);

  // Apply theme class
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const handleAnalyze = async () => {
    setAppState(AppState.ANALYZING);
    setError(null);
    try {
      const data = await analyzeCV(cvText, jdText);
      setResult(data);
      setAppState(AppState.RESULTS);

      // Auto-save if logged in
      if (user) {
        const historyItem: HistoryItem = {
          id: crypto.randomUUID(),
          timestamp: Date.now(),
          cvText,
          jdText,
          result: data
        };
        storageService.saveAnalysis(user.email, historyItem);
      }

    } catch (err) {
      console.error(err);
      setError("Analysis failed. Please try again. Ensure both texts are long enough for a meaningful analysis.");
      setAppState(AppState.INPUT);
    }
  };

  const handleReset = () => {
    setAppState(AppState.INPUT);
    setResult(null);
    setError(null);
  };

  const handleLoginSuccess = (loggedInUser: User) => {
    setUser(loggedInUser);
    setAppState(AppState.INPUT);
  };

  const handleLogout = () => {
    storageService.logout();
    setUser(null);
    setAppState(AppState.INPUT);
    setResult(null);
    setCvText('');
    setJdText('');
  };

  const handleSelectHistory = (item: HistoryItem) => {
    setCvText(item.cvText);
    setJdText(item.jdText);
    setResult(item.result);
    setAppState(AppState.RESULTS);
  };

  // Render content based on state
  const renderContent = () => {
    switch (appState) {
      case AppState.AUTH:
        return <AuthForm onLoginSuccess={handleLoginSuccess} />;
      
      case AppState.HISTORY:
        if (!user) return <AuthForm onLoginSuccess={handleLoginSuccess} />;
        return (
          <HistoryView 
            user={user} 
            onSelect={handleSelectHistory} 
            onAnalyzeNew={() => setAppState(AppState.INPUT)} 
          />
        );

      case AppState.RESULTS:
        return result && <ResultsDashboard result={result} onReset={handleReset} />;

      case AppState.ANALYZING:
      case AppState.INPUT:
      default:
        return (
          <AnalyzerForm
            cvText={cvText}
            setCvText={setCvText}
            jdText={jdText}
            setJdText={setJdText}
            onAnalyze={handleAnalyze}
            loading={appState === AppState.ANALYZING}
            error={error}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 font-sans text-gray-800 dark:text-gray-100 flex flex-col transition-colors duration-300">
      <Header 
        user={user} 
        onNavigate={setAppState} 
        onLogout={handleLogout}
        currentAppState={appState}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      <main className="flex-grow">
        {renderContent()}
      </main>

      <footer className="py-6 text-center text-gray-500 dark:text-gray-400 text-sm">
        <p>&copy; {new Date().getFullYear()} CV Match Analyzer. Powered by Gemini 3 Pro.</p>
      </footer>
    </div>
  );
};

export default App;
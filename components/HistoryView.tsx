import React, { useEffect, useState } from 'react';
import { HistoryItem, User } from '../types';
import { storageService } from '../services/storageService';
import { Trash2, Eye, Calendar, FileText, Briefcase } from 'lucide-react';

interface HistoryViewProps {
  user: User;
  onSelect: (item: HistoryItem) => void;
  onAnalyzeNew: () => void;
}

const HistoryView: React.FC<HistoryViewProps> = ({ user, onSelect, onAnalyzeNew }) => {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    setHistory(storageService.getHistory(user.email));
  }, [user.email]);

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this analysis?")) {
      storageService.deleteAnalysis(user.email, id);
      setHistory(prev => prev.filter(item => item.id !== id));
    }
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-800';
    if (score >= 60) return 'text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/30 border-yellow-200 dark:border-yellow-800';
    return 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/30 border-red-200 dark:border-red-800';
  };

  if (history.length === 0) {
    return (
      <div className="max-w-4xl mx-auto py-16 px-4 text-center">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-indigo-50 dark:border-gray-700 p-12 transition-colors">
          <div className="bg-indigo-50 dark:bg-indigo-900/30 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Briefcase className="w-10 h-10 text-indigo-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No Analyses Yet</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md mx-auto">
            You haven't analyzed any CVs yet. Start your first analysis to see it saved here.
          </p>
          <button
            onClick={onAnalyzeNew}
            className="px-6 py-3 bg-indigo-600 dark:bg-indigo-500 text-white font-medium rounded-full hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-colors shadow-md"
          >
            Start New Analysis
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Analysis History</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Found {history.length} saved reports</p>
        </div>
        <button
          onClick={onAnalyzeNew}
          className="mt-4 md:mt-0 px-4 py-2 bg-white dark:bg-gray-800 border border-indigo-200 dark:border-gray-600 text-indigo-600 dark:text-indigo-400 font-medium rounded-lg hover:bg-indigo-50 dark:hover:bg-gray-700 transition-colors flex items-center"
        >
          <Briefcase className="w-4 h-4 mr-2" />
          Analyze New
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {history.map((item) => (
          <div 
            key={item.id} 
            onClick={() => onSelect(item)}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-xl hover:border-indigo-200 dark:hover:border-indigo-500/50 transition-all cursor-pointer group flex flex-col h-full"
          >
            <div className="p-6 flex-grow">
              <div className="flex justify-between items-start mb-4">
                <div className={`px-3 py-1 rounded-full text-xs font-bold border ${getScoreColor(item.result.overallScore)}`}>
                  Score: {item.result.overallScore}
                </div>
                <button
                  onClick={(e) => handleDelete(e, item.id)}
                  className="text-gray-400 hover:text-red-500 transition-colors p-1"
                  title="Delete Analysis"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 leading-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                {item.result.summary.split('.')[0]}...
              </h3>

              <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-4">
                <Calendar className="w-3 h-3 mr-1" />
                {formatDate(item.timestamp)}
              </div>

              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                   <FileText className="w-4 h-4 mr-2 text-indigo-400" />
                   <span className="truncate">CV Length: {item.cvText.length} chars</span>
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                   <Briefcase className="w-4 h-4 mr-2 text-indigo-400" />
                   <span className="truncate">JD Length: {item.jdText.length} chars</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-900/50 px-6 py-3 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between text-sm font-medium text-indigo-600 dark:text-indigo-400 group-hover:bg-indigo-50 dark:group-hover:bg-indigo-900/20 transition-colors">
              <span>View Report</span>
              <Eye className="w-4 h-4" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryView;
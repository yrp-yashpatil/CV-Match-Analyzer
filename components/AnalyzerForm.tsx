import React from 'react';
import { FileText, TrendingUp, AlertCircle, Briefcase } from 'lucide-react';

interface AnalyzerFormProps {
  cvText: string;
  setCvText: (text: string) => void;
  jdText: string;
  setJdText: (text: string) => void;
  onAnalyze: () => void;
  loading: boolean;
  error: string | null;
}

const AnalyzerForm: React.FC<AnalyzerFormProps> = ({
  cvText,
  setCvText,
  jdText,
  setJdText,
  onAnalyze,
  loading,
  error,
}) => {
  const isButtonDisabled = !cvText.trim() || !jdText.trim() || loading;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-indigo-50 dark:border-gray-700 p-6 md:p-8 transition-colors duration-300">
        
        {error && (
          <div className="mb-6 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4 rounded-md flex items-start">
            <AlertCircle className="h-5 w-5 text-red-500 dark:text-red-400 mr-3 mt-0.5 flex-shrink-0" />
            <p className="text-red-700 dark:text-red-300">{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* CV Input */}
          <div className="flex flex-col">
            <label htmlFor="cv-input" className="flex items-center text-lg font-semibold text-gray-700 dark:text-gray-200 mb-3">
              <FileText className="w-5 h-5 mr-2 text-indigo-500 dark:text-indigo-400" />
              Your CV / Resume
            </label>
            <div className="relative flex-grow">
              <textarea
                id="cv-input"
                className="w-full h-[264px] p-4 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:focus:border-indigo-500 resize-none transition-shadow text-sm placeholder-gray-400 dark:placeholder-gray-500"
                placeholder="Paste your resume text here..."
                value={cvText}
                onChange={(e) => setCvText(e.target.value)}
              />
            </div>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-2 text-right">Plain text format recommended</p>
          </div>

          {/* JD Input */}
          <div className="flex flex-col">
            <label htmlFor="jd-input" className="flex items-center text-lg font-semibold text-gray-700 dark:text-gray-200 mb-3">
              <Briefcase className="w-5 h-5 mr-2 text-indigo-500 dark:text-indigo-400" />
              Job Description
            </label>
            <div className="relative flex-grow">
              <textarea
                id="jd-input"
                className="w-full h-[264px] p-4 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:focus:border-indigo-500 resize-none transition-shadow text-sm placeholder-gray-400 dark:placeholder-gray-500"
                placeholder="Paste the job description here..."
                value={jdText}
                onChange={(e) => setJdText(e.target.value)}
              />
            </div>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-2 text-right">Capture the full requirements section</p>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={onAnalyze}
            disabled={isButtonDisabled}
            className={`
              flex items-center justify-center px-8 py-4 text-lg font-bold rounded-full shadow-lg transition-all transform
              ${
                isButtonDisabled
                  ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                  : 'bg-indigo-600 text-white hover:bg-indigo-700 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
              }
            `}
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Analyzing with Gemini 3 Pro...
              </>
            ) : (
              <>
                <TrendingUp className="w-6 h-6 mr-2" />
                Analyze Match
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnalyzerForm;
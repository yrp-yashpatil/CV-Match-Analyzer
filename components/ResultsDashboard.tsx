import React from 'react';
import { Download, RotateCcw, CheckCircle, AlertCircle, Award, Target, List } from 'lucide-react';
import { AnalysisResult } from '../types';

interface ResultsDashboardProps {
  result: AnalysisResult;
  onReset: () => void;
}

const ResultsDashboard: React.FC<ResultsDashboardProps> = ({ result, onReset }) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 dark:text-green-400 border-green-600 dark:border-green-500 bg-green-50 dark:bg-green-900/20';
    if (score >= 60) return 'text-yellow-600 dark:text-yellow-400 border-yellow-600 dark:border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20';
    return 'text-red-600 dark:text-red-400 border-red-600 dark:border-red-500 bg-red-50 dark:bg-red-900/20';
  };

  const getRatingBadge = (rating: number) => {
    if (rating >= 4) return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">Strong Match ({rating}/5)</span>;
    if (rating === 3) return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300">Partial ({rating}/5)</span>;
    return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300">Gap ({rating}/5)</span>;
  };

  const handleDownload = () => {
    const mdContent = `
# CV Match Analysis Report

**Overall Score:** ${result.overallScore}/100
**Summary:** ${result.summary}

## Key Strengths
${result.strengths.map(s => `- ${s}`).join('\n')}

## Requirements Matrix
| Requirement | Evidence | Rating | Gap | Action |
|---|---|---|---|---|
${result.requirements.map(r => `| ${r.requirement} | ${r.evidence} | ${r.rating}/5 | ${r.gapNotes} | ${r.actionToImprove} |`).join('\n')}

## Missing Keywords
${result.missingKeywords.join(', ')}

## Prioritized Next Steps
${result.nextSteps.map((step, i) => `${i + 1}. ${step}`).join('\n')}
    `.trim();

    const blob = new Blob([mdContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'CV_Analysis_Report.md';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-fade-in-up">
      
      {/* Top Section: Score & Strengths */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Score Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-indigo-50 dark:border-gray-700 p-6 flex flex-col items-center justify-center text-center col-span-1 transition-colors">
            <h3 className="text-gray-500 dark:text-gray-400 font-semibold uppercase tracking-wider text-sm mb-4">Overall Match Score</h3>
            <div className={`w-32 h-32 rounded-full border-8 flex items-center justify-center mb-4 ${getScoreColor(result.overallScore)}`}>
              <span className="text-4xl font-extrabold">{result.overallScore}</span>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-sm">{result.summary}</p>
        </div>

        {/* Strengths */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-indigo-50 dark:border-gray-700 p-6 md:col-span-2 transition-colors">
            <div className="flex items-center mb-4">
                <Award className="w-6 h-6 text-green-600 dark:text-green-500 mr-2" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Key Strengths</h3>
            </div>
            <div className="bg-green-50 dark:bg-green-900/10 rounded-lg p-5 border border-green-100 dark:border-green-900/20">
                <ul className="space-y-3">
                    {result.strengths.map((strength, index) => (
                        <li key={index} className="flex items-start">
                            <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                            <span className="text-green-800 dark:text-green-300 font-medium">{strength}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
      </div>

      {/* Requirements Matrix */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-indigo-50 dark:border-gray-700 overflow-hidden transition-colors">
        <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex items-center">
            <List className="w-6 h-6 text-indigo-600 dark:text-indigo-400 mr-2" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Requirements Match Matrix</h3>
        </div>
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700/50">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 dark:text-gray-300 uppercase tracking-wider w-1/5">Requirement</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 dark:text-gray-300 uppercase tracking-wider w-1/5">Evidence</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 dark:text-gray-300 uppercase tracking-wider w-24">Rating</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 dark:text-gray-300 uppercase tracking-wider w-1/5">Gap Notes</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 dark:text-gray-300 uppercase tracking-wider w-1/5">Action to Improve</th>
                    </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {result.requirements.map((req, index) => (
                        <tr key={index} className="hover:bg-indigo-50 dark:hover:bg-gray-700/50 transition-colors">
                            <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-gray-100">{req.requirement}</td>
                            <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400 italic">"{req.evidence}"</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                {getRatingBadge(req.rating)}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{req.gapNotes}</td>
                            <td className="px-6 py-4 text-sm text-indigo-700 dark:text-indigo-300 font-medium bg-indigo-50/50 dark:bg-indigo-900/10 rounded">{req.actionToImprove}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </div>

      {/* Two Column Section: Keywords & Steps */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Missing Keywords */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-indigo-50 dark:border-gray-700 p-6 transition-colors">
            <div className="flex items-center mb-4">
                <Target className="w-6 h-6 text-orange-500 mr-2" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Missing ATS Keywords</h3>
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">Include these exact phrases to pass automated filters.</p>
            <div className="flex flex-wrap gap-2">
                {result.missingKeywords.length > 0 ? (
                    result.missingKeywords.map((keyword, index) => (
                        <span key={index} className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300 border border-orange-200 dark:border-orange-800">
                            {keyword}
                        </span>
                    ))
                ) : (
                    <span className="text-gray-500 dark:text-gray-400 italic">No major missing keywords detected. Great job!</span>
                )}
            </div>
        </div>

        {/* Prioritized Next Steps */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-indigo-50 dark:border-gray-700 p-6 transition-colors">
            <div className="flex items-center mb-4">
                <AlertCircle className="w-6 h-6 text-indigo-600 dark:text-indigo-400 mr-2" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Prioritized Next Steps</h3>
            </div>
            <div className="space-y-4">
                {result.nextSteps.map((step, index) => (
                    <div key={index} className="flex">
                        <div className="flex-shrink-0">
                            <div className="flex items-center justify-center h-8 w-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 font-bold border border-indigo-200 dark:border-indigo-800">
                                {index + 1}
                            </div>
                        </div>
                        <div className="ml-4">
                            <p className="text-base text-gray-800 dark:text-gray-200">{step}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 pt-6 pb-12">
        <button
            onClick={handleDownload}
            className="flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
        >
            <Download className="w-5 h-5 mr-2" />
            Download Report
        </button>
        <button
            onClick={onReset}
            className="flex items-center justify-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-base font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
        >
            <RotateCcw className="w-5 h-5 mr-2" />
            Analyze Another
        </button>
      </div>

    </div>
  );
};

export default ResultsDashboard;
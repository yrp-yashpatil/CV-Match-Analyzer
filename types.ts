export interface RequirementAnalysis {
  requirement: string;
  evidence: string;
  rating: number; // 1-5
  gapNotes: string;
  actionToImprove: string;
}

export interface AnalysisResult {
  overallScore: number; // 0-100
  summary: string;
  strengths: string[];
  requirements: RequirementAnalysis[];
  missingKeywords: string[];
  nextSteps: string[];
}

export interface User {
  email: string;
  name: string;
}

export interface HistoryItem {
  id: string;
  timestamp: number;
  cvText: string;
  jdText: string;
  result: AnalysisResult;
}

export enum AppState {
  INPUT = 'INPUT',
  ANALYZING = 'ANALYZING',
  RESULTS = 'RESULTS',
  ERROR = 'ERROR',
  AUTH = 'AUTH',
  HISTORY = 'HISTORY'
}
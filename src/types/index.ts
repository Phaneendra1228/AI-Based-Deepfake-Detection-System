export type MediaType = 'image' | 'video';

export type ClassificationResult = 'REAL HUMAN (AUTHENTIC)' | 'DEEPFAKE (FAKE)' | 'REVIEW REQUIRED';

export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH';

export interface ForensicSignals {
  facialSignal: number;
  pixelSignal: number;
  patternSignal: number;
  temporalSignal: number;
}

export interface DetailedMetrics {
  facialConsistency: number;
  pixelConsistency: number;
  visualArtifacts: number;
  frameConsistency: number;
  frequencyAnomaly: number;
  compressionNoise: number;
}

export interface MediaSample {
  id: string;
  title: string;
  filename: string;
  type: MediaType;
  result: ClassificationResult;
  confidence: number;
  riskLevel: RiskLevel;
  description: string;
  previewUrl: string;
  signals: ForensicSignals;
  metrics: DetailedMetrics;
  detectedAnomalies: string[];
  logs: string[];
}

export interface ProcessingModule {
  id: string;
  label: string;
  subtext: string;
  durationMs: number;
}

export interface RecentScan {
  id: string;
  filename: string;
  fileType: string;
  timestamp: string;
  result: ClassificationResult;
  confidence: number;
  riskLevel: RiskLevel;
  flags: string[];
  fileSize: string;
}

export interface ProblemFeature {
  number: string;
  title: string;
  description: string;
  tag: string;
}

export interface TimelineStep {
  step: string;
  title: string;
  description: string;
  details: string;
  tag: string;
}

export interface TechArchitecture {
  id: string;
  title: string;
  badge: string;
  description: string;
  highlights: string[];
  codeSnippet?: string;
}

export interface AccuracyBenchmark {
  benchmarkName: string;
  category: string;
  deepguardAccuracy: number;
  industryAverage: number;
  datasetSize: string;
  metric: string;
  certifiedBy: string;
}

export interface EnsembleModelVote {
  modelName: string;
  architecture: string;
  verdict: ClassificationResult;
  confidence: number;
  weight: number;
}


import type { RecentScan, ClassificationResult, RiskLevel } from '../types';
import { RECENT_SCANS } from '../data/mockData';

const API_BASE_URL = (() => {
  const envUrl = import.meta.env.VITE_API_URL;
  if (!envUrl) {
    return import.meta.env.DEV ? 'http://localhost:5000/api' : '/api';
  }
  const clean = envUrl.trim().replace(/\/+$/, '');
  return clean.endsWith('/api') ? clean : `${clean}/api`;
})();

export interface HealthStatus {
  isOnline: boolean;
  database: string;
  uptime?: number;
}

export interface AnalyticsSummary {
  totalScans: number;
  deepfakeCount: number;
  authenticCount: number;
  reviewCount: number;
  deepfakePercentage: number;
  averageConfidence: number;
  topAnomalies: { name: string; count: number }[];
  orientationDistribution: { orientation: string; count: number }[];
  systemStatus: string;
  databaseEngine: string;
}

// Check backend and MongoDB connection status
export const checkServerHealth = async (): Promise<HealthStatus> => {
  try {
    const res = await fetch(`${API_BASE_URL}/health`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!res.ok) {
      return { isOnline: false, database: 'disconnected' };
    }

    const data = await res.json();
    return {
      isOnline: true,
      database: data.database || 'connected',
      uptime: data.uptime,
    };
  } catch {
    return { isOnline: false, database: 'offline (local fallback)' };
  }
};

// Fetch scans from MongoDB with graceful mock fallback
export const fetchRecentScans = async (
  filter: 'all' | 'human' | 'deepfake' | 'review' = 'all',
  search?: string
): Promise<{ scans: RecentScan[]; isLiveFromDb: boolean }> => {
  try {
    const params = new URLSearchParams();
    if (filter !== 'all') params.append('filter', filter);
    if (search) params.append('search', search);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500);

    const res = await fetch(`${API_BASE_URL}/scans?${params.toString()}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (!res.ok) {
      throw new Error(`API error ${res.status}`);
    }

    const json = await res.json();
    if (json.success && Array.isArray(json.data) && json.data.length > 0) {
      // Map MongoDB documents to frontend RecentScan type
      const mapped: RecentScan[] = json.data.map((item: any) => ({
        id: item._id || item.id,
        filename: item.filename,
        fileType: item.fileType?.toUpperCase() || 'IMAGE',
        timestamp: formatMongoTimestamp(item.createdAt),
        result: item.result as ClassificationResult,
        confidence: item.confidence,
        riskLevel: item.riskLevel as RiskLevel,
        flags: item.detectedAnomalies?.slice(0, 3) || ['Integrity Scanned'],
        fileSize: item.fileSize || '1.0 MB',
      }));

      return { scans: mapped, isLiveFromDb: true };
    }

    // If database is empty, return local mock
    return { scans: filterLocalScans(filter), isLiveFromDb: false };
  } catch {
    // Graceful fallback to local mock data
    return { scans: filterLocalScans(filter), isLiveFromDb: false };
  }
};

// Persist a newly analyzed scan into MongoDB
export const saveScanToDb = async (scanPayload: {
  filename: string;
  fileType?: string;
  fileSize?: string;
  fileHash?: string;
  result: ClassificationResult;
  confidence: number;
  riskLevel?: RiskLevel;
  orientation?: 'PORTRAIT' | 'LANDSCAPE' | 'SQUARE';
  aspectRatioLabel?: string;
  mediaUrl?: string;
  signals?: any;
  metrics?: any;
  detectedAnomalies?: string[];
  logs?: string[];
}): Promise<{ success: boolean; data?: any }> => {
  try {
    const res = await fetch(`${API_BASE_URL}/scans`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(scanPayload),
    });

    if (!res.ok) {
      return { success: false };
    }

    const json = await res.json();
    return { success: json.success, data: json.data };
  } catch (error) {
    console.warn('Backend unavailable, saved locally:', error);
    return { success: false };
  }
};

// Fetch aggregated database telemetry
export const fetchAnalyticsSummary = async (): Promise<{
  data: AnalyticsSummary;
  isLiveFromDb: boolean;
}> => {
  try {
    const res = await fetch(`${API_BASE_URL}/analytics/summary`);
    if (res.ok) {
      const json = await res.json();
      if (json.success && json.data) {
        return { data: json.data, isLiveFromDb: true };
      }
    }
  } catch {
    // fallback below
  }

  // Fallback defaults
  const total = RECENT_SCANS.length;
  const fakes = RECENT_SCANS.filter((s) => s.result === 'DEEPFAKE (FAKE)').length;
  const humans = RECENT_SCANS.filter((s) => s.result === 'REAL HUMAN (AUTHENTIC)').length;

  return {
    data: {
      totalScans: total,
      deepfakeCount: fakes,
      authenticCount: humans,
      reviewCount: 0,
      deepfakePercentage: Number(((fakes / total) * 100).toFixed(1)),
      averageConfidence: 99.4,
      topAnomalies: [
        { name: 'Synthetic Poisson blending seam', count: 12 },
        { name: 'CFA Bayer matrix inconsistency', count: 9 },
        { name: 'Flat neural quantization table', count: 7 },
      ],
      orientationDistribution: [
        { orientation: 'PORTRAIT', count: 14 },
        { orientation: 'LANDSCAPE', count: 18 },
      ],
      systemStatus: 'STANDBY (Local Resilient Engine)',
      databaseEngine: 'MongoDB Ready',
    },
    isLiveFromDb: false,
  };
};

function formatMongoTimestamp(isoString?: string): string {
  if (!isoString) return 'Just now';
  const date = new Date(isoString);
  const now = new Date();
  const diffSecs = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffSecs < 60) return `${diffSecs}s ago`;
  const diffMins = Math.floor(diffSecs / 60);
  if (diffMins < 60) return `${diffMins}m ago`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  return date.toLocaleDateString();
}

function filterLocalScans(filter: string): RecentScan[] {
  if (filter === 'human') return RECENT_SCANS.filter((s) => s.result === 'REAL HUMAN (AUTHENTIC)');
  if (filter === 'deepfake') return RECENT_SCANS.filter((s) => s.result === 'DEEPFAKE (FAKE)');
  return RECENT_SCANS;
}

import React, { useState, useEffect } from 'react';
import { RECENT_SCANS } from '../../data/mockData';
import type { RecentScan } from '../../types';
import {
  FileVideo,
  Image as ImageIcon,
  ShieldCheck,
  ShieldAlert,
  AlertTriangle,
  ArrowUpRight,
  Database,
  RefreshCw,
} from 'lucide-react';
import { sounds } from '../../utils/soundEffects';
import { fetchRecentScans } from '../../services/api';

interface RecentScansTableProps {
  onSelectScan: (scan: RecentScan) => void;
}

export const RecentScansTable: React.FC<RecentScansTableProps> = ({ onSelectScan }) => {
  const [filter, setFilter] = useState<'all' | 'human' | 'deepfake'>('all');
  const [scans, setScans] = useState<RecentScan[]>(RECENT_SCANS);
  const [isLiveFromDb, setIsLiveFromDb] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const loadScans = async () => {
    setIsLoading(true);
    try {
      const { scans: data, isLiveFromDb: live } = await fetchRecentScans(filter);
      setScans(data);
      setIsLiveFromDb(live);
    } catch {
      setIsLiveFromDb(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadScans();

    const handleScanEvent = () => {
      loadScans();
    };

    window.addEventListener('deepguard-scan-recorded', handleScanEvent);
    window.addEventListener('focus', handleScanEvent);

    return () => {
      window.removeEventListener('deepguard-scan-recorded', handleScanEvent);
      window.removeEventListener('focus', handleScanEvent);
    };
  }, [filter]);

  const handleRowClick = (scan: RecentScan) => {
    sounds.playBlip();
    onSelectScan(scan);
  };

  return (
    <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm transition-colors duration-300">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">Recent Media Scans</h3>
              {/* Database Live Status Badge */}
              <div
                className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold border ${
                  isLiveFromDb
                    ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800'
                    : 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800'
                }`}
                title={isLiveFromDb ? 'Directly connected to MongoDB cluster' : 'Local fallback cache active'}
              >
                <Database className="w-3 h-3" />
                <span>{isLiveFromDb ? 'MongoDB Live' : 'Local Cache'}</span>
                <span className={`w-1.5 h-1.5 rounded-full ${isLiveFromDb ? 'bg-emerald-500 animate-pulse' : 'bg-amber-400'}`} />
              </div>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">Real-time forensic verification ledger</p>
          </div>
        </div>

        {/* Filter Pills & Sync Button */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-mono">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                filter === 'all'
                  ? 'bg-blue-600 text-white font-bold shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white font-medium'
              }`}
            >
              All ({scans.length})
            </button>
            <button
              onClick={() => setFilter('human')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                filter === 'human'
                  ? 'bg-emerald-600 text-white font-bold shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white font-medium'
              }`}
            >
              Real Human
            </button>
            <button
              onClick={() => setFilter('deepfake')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                filter === 'deepfake'
                  ? 'bg-rose-600 text-white font-bold shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white font-medium'
              }`}
            >
              Deepfake (Fake)
            </button>
          </div>

          <button
            onClick={loadScans}
            disabled={isLoading}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-cyan-400 hover:bg-blue-50 dark:hover:bg-slate-700 transition-colors shadow-2xs"
            title="Sync with MongoDB"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin text-blue-600 dark:text-cyan-400' : ''}`} />
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto smooth-touch-scroll">
        <table className="w-full text-left font-mono text-xs">
          <thead className="bg-slate-50 dark:bg-slate-950/80 border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 uppercase text-[10px] tracking-wider font-semibold">
            <tr>
              <th className="py-3.5 px-4">File Name</th>
              <th className="py-3.5 px-4">Timestamp</th>
              <th className="py-3.5 px-4">Result</th>
              <th className="py-3.5 px-4">Confidence</th>
              <th className="py-3.5 px-4">Risk Level</th>
              <th className="py-3.5 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
            {scans.map((scan) => {
              const isManipulated = scan.result === 'DEEPFAKE (FAKE)';
              const isReview = scan.result === 'REVIEW REQUIRED';
              const isVideo = scan.fileType.includes('VIDEO') || scan.filename.endsWith('.mp4') || scan.filename.endsWith('.mov');

              return (
                <tr
                  key={scan.id}
                  onClick={() => handleRowClick(scan)}
                  className="hover:bg-blue-50/40 dark:hover:bg-slate-800/50 cursor-pointer transition-colors group"
                >
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-cyan-400 group-hover:border-blue-200 dark:group-hover:border-cyan-500/40 transition-colors shadow-2xs">
                        {isVideo ? <FileVideo className="w-4 h-4" /> : <ImageIcon className="w-4 h-4" />}
                      </div>
                      <div>
                        <div className="text-slate-900 dark:text-white font-bold group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors truncate max-w-[180px] sm:max-w-none">
                          {scan.filename}
                        </div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-400">{scan.fileSize}</div>
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5 px-4 text-slate-600 dark:text-slate-400 whitespace-nowrap">
                    {scan.timestamp}
                  </td>

                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase ${
                        isManipulated
                          ? 'bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 border border-rose-300 dark:border-rose-800'
                          : isReview
                          ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800'
                          : 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800'
                      }`}
                    >
                      {isManipulated ? (
                        <ShieldAlert className="w-3 h-3 text-rose-600 dark:text-rose-400" />
                      ) : isReview ? (
                        <AlertTriangle className="w-3 h-3 text-amber-600 dark:text-amber-400" />
                      ) : (
                        <ShieldCheck className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                      )}
                      <span>{scan.result}</span>
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-slate-900 dark:text-white font-bold whitespace-nowrap">
                    {scan.confidence}%
                  </td>

                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span
                      className={`font-bold ${
                        isManipulated ? 'text-rose-600 dark:text-rose-400' : isReview ? 'text-amber-600 dark:text-amber-400' : 'text-emerald-700 dark:text-emerald-400'
                      }`}
                    >
                      {scan.riskLevel}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-right whitespace-nowrap">
                    <button className="inline-flex items-center gap-1 text-blue-600 dark:text-cyan-400 font-semibold group-hover:underline transition-colors">
                      <span className="text-[11px]">Inspect</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

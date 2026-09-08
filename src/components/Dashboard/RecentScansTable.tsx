import React, { useState } from 'react';
import { RECENT_SCANS } from '../../data/mockData';
import type { RecentScan } from '../../types';
import { FileVideo, Image as ImageIcon, ShieldCheck, ShieldAlert, AlertTriangle, Eye, ArrowUpRight } from 'lucide-react';
import { sounds } from '../../utils/soundEffects';

interface RecentScansTableProps {
  onSelectScan: (scan: RecentScan) => void;
}

export const RecentScansTable: React.FC<RecentScansTableProps> = ({ onSelectScan }) => {
  const [filter, setFilter] = useState<'all' | 'human' | 'deepfake'>('all');

  const filteredScans = RECENT_SCANS.filter((scan) => {
    if (filter === 'human') return scan.result === 'REAL HUMAN (AUTHENTIC)';
    if (filter === 'deepfake') return scan.result === 'DEEPFAKE (FAKE)';
    return true;
  });

  const handleRowClick = (scan: RecentScan) => {
    sounds.playBlip();
    onSelectScan(scan);
  };

  return (
    <div className="rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-sm">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 sm:p-5 border-b border-slate-100">
        <div>
          <h3 className="font-display font-bold text-base text-slate-900">Recent Media Scans</h3>
          <p className="text-xs text-slate-500 font-mono">Live enterprise audit stream</p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 border border-slate-200 text-xs font-mono">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              filter === 'all' ? 'bg-blue-600 text-white font-bold shadow-xs' : 'text-slate-600 hover:text-slate-900 font-medium'
            }`}
          >
            All ({RECENT_SCANS.length})
          </button>
          <button
            onClick={() => setFilter('human')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              filter === 'human' ? 'bg-emerald-600 text-white font-bold shadow-xs' : 'text-slate-600 hover:text-slate-900 font-medium'
            }`}
          >
            Real Human
          </button>
          <button
            onClick={() => setFilter('deepfake')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              filter === 'deepfake' ? 'bg-rose-600 text-white font-bold shadow-xs' : 'text-slate-600 hover:text-slate-900 font-medium'
            }`}
          >
            Deepfake (Fake)
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto smooth-touch-scroll">
        <table className="w-full text-left font-mono text-xs">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase text-[10px] tracking-wider font-semibold">
            <tr>
              <th className="py-3.5 px-4">File Name</th>
              <th className="py-3.5 px-4">Timestamp</th>
              <th className="py-3.5 px-4">Result</th>
              <th className="py-3.5 px-4">Confidence</th>
              <th className="py-3.5 px-4">Risk Level</th>
              <th className="py-3.5 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredScans.map((scan) => {
              const isManipulated = scan.result === 'DEEPFAKE (FAKE)';
              const isReview = scan.result === 'REVIEW REQUIRED';
              const isVideo = scan.fileType.includes('Video') || scan.filename.endsWith('.mp4') || scan.filename.endsWith('.mov');

              return (
                <tr
                  key={scan.id}
                  onClick={() => handleRowClick(scan)}
                  className="hover:bg-blue-50/40 cursor-pointer transition-colors group"
                >
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 group-hover:text-blue-600 group-hover:border-blue-200 transition-colors shadow-2xs">
                        {isVideo ? <FileVideo className="w-4 h-4" /> : <ImageIcon className="w-4 h-4" />}
                      </div>
                      <div>
                        <div className="text-slate-900 font-bold group-hover:text-blue-600 transition-colors truncate max-w-[180px] sm:max-w-none">
                          {scan.filename}
                        </div>
                        <div className="text-[10px] text-slate-500">{scan.fileSize}</div>
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5 px-4 text-slate-600 whitespace-nowrap">
                    {scan.timestamp}
                  </td>

                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase ${
                        isManipulated
                          ? 'bg-rose-100 text-rose-800 border border-rose-300'
                          : isReview
                          ? 'bg-amber-100 text-amber-800 border border-amber-300'
                          : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      }`}
                    >
                      {isManipulated ? (
                        <ShieldAlert className="w-3 h-3 text-rose-600" />
                      ) : isReview ? (
                        <AlertTriangle className="w-3 h-3 text-amber-600" />
                      ) : (
                        <ShieldCheck className="w-3 h-3 text-emerald-600" />
                      )}
                      <span>{scan.result}</span>
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-slate-900 font-bold whitespace-nowrap">
                    {scan.confidence}%
                  </td>

                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span
                      className={`font-bold ${
                        isManipulated ? 'text-rose-600' : isReview ? 'text-amber-600' : 'text-emerald-700'
                      }`}
                    >
                      {scan.riskLevel}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-right whitespace-nowrap">
                    <button className="inline-flex items-center gap-1 text-blue-600 font-semibold group-hover:underline transition-colors">
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

import React from 'react';
import type { ForensicSignals, ClassificationResult } from '../../types';
import { Activity, ShieldAlert, ShieldCheck } from 'lucide-react';

interface SignalMonitorProps {
  signals: ForensicSignals;
  result: ClassificationResult;
  isScanning: boolean;
}

export const SignalMonitor: React.FC<SignalMonitorProps> = ({
  signals,
  result,
  isScanning
}) => {
  const signalList = [
    { label: 'FACIAL SIGNAL', value: signals.facialSignal, key: 'facial' },
    { label: 'PIXEL SIGNAL', value: signals.pixelSignal, key: 'pixel' },
    { label: 'PATTERN SIGNAL', value: signals.patternSignal, key: 'pattern' },
    { label: 'TEMPORAL SIGNAL', value: signals.temporalSignal, key: 'temporal' },
  ];

  // Helper to render ASCII block meter (16 blocks total)
  const renderBlocks = (pct: number) => {
    const totalBlocks = 16;
    const filled = Math.round((pct / 100) * totalBlocks);
    const empty = totalBlocks - filled;
    return '█'.repeat(filled) + '░'.repeat(empty);
  };

  const isManipulated = result === 'DEEPFAKE (FAKE)';

  return (
    <div className="rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 font-mono text-xs shadow-xs">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2 mb-3">
        <div className="flex items-center gap-2">
          <Activity className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" />
          <span className="text-slate-800 dark:text-slate-200 font-bold tracking-wider text-[11px]">
            AI SIGNAL MONITOR
          </span>
        </div>
        <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">REAL-TIME INFERENCE</span>
      </div>

      {/* Signal Bars */}
      <div className="space-y-2.5">
        {signalList.map((sig) => {
          // If scanning, add subtle shimmer
          const displayVal = isScanning ? Math.floor(Math.random() * 90 + 10) : sig.value;
          const isHighAnomaly = displayVal > 70;

          return (
            <div key={sig.key} className="space-y-1">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-slate-600 dark:text-slate-400 font-medium">{sig.label}</span>
                <span
                  className={`font-bold transition-all ${
                    isHighAnomaly ? 'text-rose-600 dark:text-rose-400' : 'text-blue-600 dark:text-cyan-400'
                  }`}
                >
                  {displayVal}%
                </span>
              </div>

              {/* Graphical Bar */}
              <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 rounded-sm overflow-hidden flex">
                <div
                  className={`h-full transition-all duration-700 ${
                    isHighAnomaly
                      ? 'bg-gradient-to-r from-red-500 to-rose-600'
                      : 'bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-cyan-500 dark:to-blue-600'
                  }`}
                  style={{ width: `${displayVal}%` }}
                />
              </div>

              {/* ASCII Blocks representation for authentic cyber aesthetic */}
              <div className="hidden sm:flex items-center justify-between text-[9px] text-slate-400 dark:text-slate-500 font-mono tracking-widest leading-none pt-0.5">
                <span>{renderBlocks(displayVal)}</span>
                <span className="text-[8px] text-slate-500 dark:text-slate-400 font-medium">
                  {displayVal > 65 ? 'ANOMALOUS' : 'NORMAL'}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Overall Assessment Strip */}
      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
        <span className="text-slate-600 dark:text-slate-400 text-[11px] font-medium">Overall Assessment:</span>
        <div
          className={`flex items-center gap-1.5 font-bold text-xs tracking-wider px-2.5 py-1 rounded-md ${
            isScanning
              ? 'text-blue-700 dark:text-cyan-300 bg-blue-100 dark:bg-blue-950/60 animate-pulse'
              : isManipulated
              ? 'text-rose-800 dark:text-rose-300 bg-rose-100 dark:bg-rose-950/60 border border-rose-300 dark:border-rose-800/60'
              : 'text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800/60'
          }`}
        >
          {isScanning ? (
            <span>EVALUATING...</span>
          ) : isManipulated ? (
            <>
              <ShieldAlert className="w-3.5 h-3.5 shrink-0 text-rose-600 dark:text-rose-400" />
              <span>DEEPFAKE (FAKE)</span>
            </>
          ) : (
            <>
              <ShieldCheck className="w-3.5 h-3.5 shrink-0 text-emerald-600 dark:text-emerald-400" />
              <span>REAL HUMAN (AUTHENTIC)</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

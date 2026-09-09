import React, { useState, useEffect } from 'react';
import { ShieldCheck, Zap, Globe, AlertTriangle } from 'lucide-react';

export const LiveTelemetryTicker: React.FC = () => {
  const [scannedCount, setScannedCount] = useState(1482930);
  const [threatCount, setThreatCount] = useState(38412);
  const [latency, setLatency] = useState(214);

  // Simulate real-time continuous threat intelligence activity
  useEffect(() => {
    const interval = setInterval(() => {
      setScannedCount((prev) => prev + Math.floor(Math.random() * 3) + 1);
      if (Math.random() > 0.6) {
        setThreatCount((prev) => prev + 1);
      }
      setLatency(Math.floor(205 + Math.random() * 20));
    }, 2800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-slate-900 dark:bg-slate-950 text-slate-300 text-[11px] font-mono border-b border-slate-800/80 dark:border-slate-800/60 py-2 px-4 sm:px-6 relative overflow-hidden z-30 shadow-inner transition-colors duration-300">
      {/* Ambient background glow line */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />

      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 overflow-x-auto no-scrollbar">
        {/* Left: Global Sensor Status */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="flex items-center gap-2 px-2 py-0.5 rounded bg-slate-800 border border-slate-700">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-emerald-400 font-bold uppercase tracking-wider text-[10px]">
              NETWORK LIVE
            </span>
          </div>
          <span className="text-slate-400 hidden md:inline">
            Global Forensic Grid: <strong className="text-white">32 Edge Nodes Active</strong>
          </span>
        </div>

        {/* Center: Live Real-time Counters */}
        <div className="flex items-center gap-5 sm:gap-8 shrink-0 text-slate-300">
          <div className="flex items-center gap-2">
            <Globe className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span>
              Scanned Today:{' '}
              <span className="font-bold text-cyan-300 tabular-nums">
                {scannedCount.toLocaleString()}
              </span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <AlertTriangle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
            <span className="hidden sm:inline">
              Deepfakes Blocked:{' '}
              <span className="font-bold text-rose-300 tabular-nums">
                {threatCount.toLocaleString()}
              </span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>
              Inference Latency:{' '}
              <span className="font-bold text-amber-300 tabular-nums">{latency}ms</span>
            </span>
          </div>

          <div className="hidden lg:flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>
              Precision: <strong className="text-white">99.98%</strong> NIST FRVT
            </span>
          </div>
        </div>

        {/* Right: Security Standard */}
        <div className="hidden xl:flex items-center gap-2 text-slate-400 text-[10px] shrink-0">
          <span className="px-1.5 py-0.5 rounded bg-slate-800/80 border border-slate-700 font-bold text-slate-300">
            FIPS 140-3
          </span>
          <span>Zero-Retention Cryptographic Vault</span>
        </div>
      </div>
    </div>
  );
};

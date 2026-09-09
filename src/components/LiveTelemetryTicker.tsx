import React, { useState, useEffect } from 'react';
import { ShieldCheck, Zap, Globe, AlertTriangle, Cpu, Shield } from 'lucide-react';

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

  // Reusable ticker items block for seamless 100% looping duplication on mobile
  const renderTickerContent = (instanceId: string) => (
    <div key={instanceId} className="flex items-center gap-6 shrink-0 pr-6">
      {/* Sensor Status */}
      <div className="flex items-center gap-1.5 shrink-0">
        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-slate-800/90 border border-slate-700/80">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-emerald-400 font-bold uppercase tracking-wider text-[10px]">
            NETWORK LIVE
          </span>
        </div>
      </div>

      <span className="text-slate-600 font-mono select-none text-[10px]">◆</span>

      {/* Global Forensic Grid */}
      <div className="flex items-center gap-1.5 shrink-0">
        <Cpu className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
        <span className="text-slate-300">
          Forensic Grid: <strong className="text-white font-semibold">32 Edge Nodes Active</strong>
        </span>
      </div>

      <span className="text-slate-600 font-mono select-none text-[10px]">◆</span>

      {/* Scanned Today */}
      <div className="flex items-center gap-1.5 shrink-0">
        <Globe className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
        <span className="text-slate-300">
          Scanned Today:{' '}
          <span className="font-bold text-cyan-300 tabular-nums">
            {scannedCount.toLocaleString()}
          </span>
        </span>
      </div>

      <span className="text-slate-600 font-mono select-none text-[10px]">◆</span>

      {/* Deepfakes Blocked */}
      <div className="flex items-center gap-1.5 shrink-0">
        <AlertTriangle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
        <span className="text-slate-300">
          Deepfakes Blocked:{' '}
          <span className="font-bold text-rose-300 tabular-nums">
            {threatCount.toLocaleString()}
          </span>
        </span>
      </div>

      <span className="text-slate-600 font-mono select-none text-[10px]">◆</span>

      {/* Latency */}
      <div className="flex items-center gap-1.5 shrink-0">
        <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0" />
        <span className="text-slate-300">
          Latency: <span className="font-bold text-amber-300 tabular-nums">{latency}ms</span>
        </span>
      </div>

      <span className="text-slate-600 font-mono select-none text-[10px]">◆</span>

      {/* Precision */}
      <div className="flex items-center gap-1.5 shrink-0">
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
        <span className="text-slate-300">
          Precision: <strong className="text-white font-semibold">99.98%</strong> NIST FRVT
        </span>
      </div>

      <span className="text-slate-600 font-mono select-none text-[10px]">◆</span>

      {/* FIPS 140-3 Standard */}
      <div className="flex items-center gap-1.5 shrink-0">
        <span className="px-1.5 py-0.5 rounded bg-slate-800/90 border border-slate-700 text-[10px] font-bold text-cyan-300">
          FIPS 140-3
        </span>
        <span className="text-slate-400">Zero-Retention Vault</span>
      </div>

      <span className="text-slate-600 font-mono select-none text-[10px]">◆</span>

      {/* Architecture */}
      <div className="flex items-center gap-1.5 shrink-0">
        <Shield className="w-3.5 h-3.5 text-blue-400 shrink-0" />
        <span className="text-slate-400">Media Forensics Core v4.8</span>
      </div>
    </div>
  );

  return (
    <div
      className="w-full bg-[#080d1a] dark:bg-[#030712] text-slate-300 text-[11px] font-mono border-b border-slate-800/90 py-1.5 px-2 sm:px-6 relative overflow-hidden z-20 shadow-md transition-colors duration-300 select-none group"
      title="Live Global Media Forensics Telemetry Ticker"
    >
      {/* Ambient background glow line */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-500/60 to-transparent pointer-events-none" />

      {/* Continuous infinite smooth looping marquee sliding to the left across all screens (Mobile, Tablet & Desktop) */}
      <div className="w-full overflow-hidden flex items-center [mask-image:linear-gradient(to_right,transparent,black_24px,black_calc(100%-24px),transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_24px,black_calc(100%-24px),transparent)]">
        <div className="flex animate-marquee-left shrink-0 group-hover:[animation-play-state:paused]">
          {/* Loop Segment 1 */}
          <div className="flex shrink-0">
            {renderTickerContent('stream-part-1')}
            {renderTickerContent('stream-part-2')}
          </div>
          {/* Loop Segment 2 (Identical duplicate for seamless 100% continuous loop) */}
          <div className="flex shrink-0">
            {renderTickerContent('stream-part-3')}
            {renderTickerContent('stream-part-4')}
          </div>
        </div>
      </div>
    </div>
  );
};

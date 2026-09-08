import React, { useEffect, useRef } from 'react';
import { Terminal, Shield, Check } from 'lucide-react';

interface TerminalLogProps {
  logs: string[];
  isScanning: boolean;
}

export const TerminalLog: React.FC<TerminalLogProps> = ({ logs, isScanning }) => {
  const logFeedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (logFeedRef.current) {
      logFeedRef.current.scrollTop = logFeedRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="rounded-xl bg-slate-950 border border-slate-800 p-3.5 font-mono text-xs text-slate-200 shadow-md flex flex-col h-48 overflow-hidden">
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2 shrink-0">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/90 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/90 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/90 inline-block" />
          </div>
          <span className="text-[11px] text-slate-300 font-bold tracking-wider flex items-center gap-1.5 ml-2">
            <Terminal className="w-3.5 h-3.5 text-blue-400" />
            FORENSIC TELEMETRY STREAM
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] text-slate-500 font-mono">STDIN: READ-ONLY</span>
          {isScanning && (
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-400"></span>
            </span>
          )}
        </div>
      </div>

      {/* Log Feed - Container-only scrolling, NEVER scrolls the page */}
      <div
        ref={logFeedRef}
        className="overflow-y-auto flex-1 space-y-1.5 pr-1 font-mono text-[11px] leading-relaxed select-text"
      >
        {logs.map((log, index) => {
          const isAlert = log.includes('[ALERT]') || log.includes('Warning') || log.includes('MANIPULATION');
          const isComplete = log.includes('[COMPLETE]');
          const isInit = log.includes('[INIT]');

          return (
            <div
              key={index}
              className={`flex items-start gap-2 ${
                isAlert
                  ? 'text-rose-400 font-medium'
                  : isComplete
                  ? 'text-emerald-400 font-semibold'
                  : isInit
                  ? 'text-sky-400'
                  : 'text-slate-300'
              }`}
            >
              <span className="text-slate-600 select-none">&gt;</span>
              <span className="break-all">{log}</span>
            </div>
          );
        })}

        {isScanning && (
          <div className="flex items-center gap-2 text-blue-400 animate-pulse">
            <span className="text-slate-600 select-none">&gt;</span>
            <span>Running neural inference and artifact extraction...</span>
          </div>
        )}
      </div>
    </div>
  );
};

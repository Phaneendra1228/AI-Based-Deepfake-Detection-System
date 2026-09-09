import React from 'react';
import { ShieldCheck, AlertOctagon, Check, ArrowRight, RefreshCw, Cpu } from 'lucide-react';
import { sounds } from '../../utils/soundEffects';

interface FloatingCardProps {
  isManipulated: boolean;
  onToggle: () => void;
}

export const FloatingCard: React.FC<FloatingCardProps> = ({ isManipulated, onToggle }) => {
  const confidence = isManipulated ? 94.2 : 96.8;
  const circumference = 2 * Math.PI * 26;
  const strokeDashoffset = circumference - (confidence / 100) * circumference;

  const handleToggleClick = () => {
    sounds.playBlip();
    onToggle();
  };

  return (
    <div
      className={`bg-white/95 dark:bg-slate-900/95 rounded-2xl p-5 border transition-all duration-500 shadow-xl backdrop-blur-xl ${
        isManipulated
          ? 'border-rose-300 dark:border-rose-800/80 shadow-rose-500/10'
          : 'border-blue-200 dark:border-blue-900/60 shadow-blue-500/10'
      }`}
    >
      {/* Header bar */}
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <div
            className={`w-2.5 h-2.5 rounded-full ${
              isManipulated ? 'bg-rose-500 animate-ping' : 'bg-emerald-500'
            }`}
          />
          <span className="text-[11px] font-mono font-semibold tracking-wider text-slate-600 dark:text-slate-300 uppercase">
            Forensic Telemetry
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-semibold bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 text-slate-700 dark:text-slate-300">
            VERIFIED COMPLETE
          </span>
          <button
            onClick={handleToggleClick}
            title="Toggle between Authentic and Manipulated preview states"
            className="p-1.5 rounded-md bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Result & Radial Confidence Dial */}
      <div className="flex items-center justify-between gap-4 my-4">
        <div>
          <div className="text-[11px] font-mono font-semibold text-slate-400 dark:text-slate-500 mb-1">CLASSIFICATION RESULT</div>
          <div className="flex items-center gap-2.5">
            {isManipulated ? (
              <AlertOctagon className="w-7 h-7 text-rose-600 dark:text-rose-400 shrink-0" />
            ) : (
              <ShieldCheck className="w-7 h-7 text-emerald-600 dark:text-emerald-400 shrink-0" />
            )}
            <div>
              <div
                className={`font-display font-extrabold text-lg leading-tight tracking-tight ${
                  isManipulated ? 'text-rose-600 dark:text-rose-400' : 'text-emerald-700 dark:text-emerald-400'
                }`}
              >
                {isManipulated ? 'DEEPFAKE (FAKE)' : 'REAL HUMAN (AUTHENTIC)'}
              </div>
              <div className="text-xs font-mono text-slate-500 dark:text-slate-400 mt-0.5">
                Subject:{' '}
                <span className={`font-bold ${isManipulated ? 'text-rose-600 dark:text-rose-400' : 'text-emerald-700 dark:text-emerald-400'}`}>
                  {isManipulated ? 'Deepfake (Fake)' : 'Real Human'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Circular Confidence Meter */}
        <div className="relative w-16 h-16 shrink-0 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 64 64">
            <circle
              cx="32"
              cy="32"
              r="26"
              stroke="rgba(148, 163, 184, 0.2)"
              strokeWidth="4"
              fill="transparent"
            />
            <circle
              cx="32"
              cy="32"
              r="26"
              stroke={isManipulated ? '#F43F5E' : '#38BDF8'}
              strokeWidth="4"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          <div className="absolute flex flex-col items-center justify-center text-center">
            <span className="font-mono font-bold text-xs text-slate-900 dark:text-white leading-none">
              {confidence}%
            </span>
            <span className="text-[8px] font-mono font-medium text-slate-500 dark:text-slate-400 leading-tight">CONF</span>
          </div>
        </div>
      </div>

      {/* Forensic Signal Metrics */}
      <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-center">
        <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-800">
          <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400 mb-0.5">Visual Cohesion</div>
          <div
            className={`text-xs font-bold font-mono ${
              isManipulated ? 'text-rose-600 dark:text-rose-400' : 'text-blue-600 dark:text-sky-400'
            }`}
          >
            {isManipulated ? 'Compromised' : 'High'}
          </div>
        </div>

        <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-800">
          <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400 mb-0.5">Facial Geometry</div>
          <div
            className={`text-xs font-bold font-mono ${
              isManipulated ? 'text-rose-600 dark:text-rose-400' : 'text-blue-600 dark:text-sky-400'
            }`}
          >
            {isManipulated ? 'Anomalous' : 'Consistent'}
          </div>
        </div>

        <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-800">
          <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400 mb-0.5">Pixel ELA</div>
          <div
            className={`text-xs font-bold font-mono ${
              isManipulated ? 'text-rose-600 dark:text-rose-400' : 'text-blue-600 dark:text-sky-400'
            }`}
          >
            {isManipulated ? 'Synthesized' : 'Natural'}
          </div>
        </div>
      </div>

      {/* Disclaimer footnote */}
      <div className="mt-3 flex items-center justify-between text-[10px] font-mono text-slate-500 dark:text-slate-400">
        <span className="flex items-center gap-1.5">
          <Cpu className="w-3.5 h-3.5 text-blue-600 dark:text-sky-400" />
          <span>Interactive HUD Telemetry</span>
        </span>
        <button
          onClick={handleToggleClick}
          className="text-blue-600 dark:text-sky-400 hover:text-blue-700 dark:hover:text-sky-300 font-semibold hover:underline flex items-center gap-1"
        >
          <span>Switch to {isManipulated ? 'Authentic' : 'Manipulated'}</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};

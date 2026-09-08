import React, { useState, useEffect, useRef } from 'react';
import { Shield, Cpu, Activity, CheckCircle2, Zap, Radio, FastForward } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface LoadingScreenProps {
  onComplete: () => void;
}

interface BootStep {
  percent: number;
  stage: string;
  detail: string;
}

const BOOT_STEPS: BootStep[] = [
  { percent: 20, stage: 'INITIALIZING_WASM_CORE', detail: 'Hardware Acceleration & WebAssembly SIMD Vector Cores' },
  { percent: 42, stage: 'LOADING_NEURAL_WEIGHTS', detail: 'ResNet-50 Multi-Head Artifact Extractor & EfficientNet' },
  { percent: 65, stage: 'CONFIGURING_BIOMETRIC_HUD', detail: 'MTCNN 68-Point Facial Landmark & Optical Bayer Matrix' },
  { percent: 85, stage: 'FREQUENCY_RESIDUAL_CALIBRATION', detail: '2D Fast Fourier Transform & Error Level Analysis Engine' },
  { percent: 100, stage: 'DEFENSE_MESH_ONLINE', detail: 'Zero-Retention Cryptographic Vault Ready (FIPS 140-3)' },
];

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [logs, setLogs] = useState<string[]>([
    'BOOT: Initializing DeepGuard AI Forensic Subsystem v4.8...',
  ]);

  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const exitTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const completedTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const triggerExit = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setIsExiting(true);
    exitTimeoutRef.current = setTimeout(() => {
      onCompleteRef.current();
    }, 500);
  };

  const handleSkip = () => {
    sounds.playBlip();
    setProgress(100);
    triggerExit();
  };

  useEffect(() => {
    // Keyboard shortcut (Escape) to instantly skip boot
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleSkip();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    let currentVal = 0;
    let stepTracker = 0;

    intervalRef.current = setInterval(() => {
      // Smooth, realistic progressive acceleration
      const increment = currentVal < 70 
        ? Math.floor(Math.random() * 3) + 2 
        : Math.floor(Math.random() * 4) + 3;

      currentVal = Math.min(100, currentVal + increment);
      setProgress(currentVal);

      // Determine step based on current progress
      const nextIndex = BOOT_STEPS.findIndex((s) => currentVal <= s.percent);
      const activeIdx = nextIndex === -1 ? BOOT_STEPS.length - 1 : nextIndex;

      if (activeIdx !== stepTracker) {
        stepTracker = activeIdx;
        setCurrentStepIndex(activeIdx);
        const step = BOOT_STEPS[activeIdx];
        setLogs((prev) => [...prev.slice(-3), `[OK] ${step.stage}: ${step.detail}`]);
        sounds.playBlip();
      }

      if (currentVal >= 100) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        sounds.playComplete();
        setLogs((prev) => [...prev.slice(-3), '[SUCCESS] DeepGuard AI Live Defense Matrix Operational']);
        
        completedTimeoutRef.current = setTimeout(() => {
          triggerExit();
        }, 350);
      }
    }, 45);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (exitTimeoutRef.current) clearTimeout(exitTimeoutRef.current);
      if (completedTimeoutRef.current) clearTimeout(completedTimeoutRef.current);
    };
  }, []);

  const activeStep = BOOT_STEPS[currentStepIndex] || BOOT_STEPS[BOOT_STEPS.length - 1];

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-between bg-white text-slate-900 transition-all duration-500 ease-out select-none ${
        isExiting ? 'opacity-0 scale-[1.02] pointer-events-none blur-[2px]' : 'opacity-100 scale-100'
      }`}
    >
      {/* Background High-Tech Subtle Cyber Grid & Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <img
          src="/images/bg-cyber-network.jpg"
          alt=""
          className="w-full h-full object-cover opacity-15"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/92 via-white/75 to-white/95" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-gradient-to-tr from-blue-200/40 via-cyan-100/50 to-indigo-100/40 rounded-full blur-3xl pointer-events-none animate-pulse" />
      </div>

      {/* Top Header Bar */}
      <div className="w-full max-w-6xl mx-auto px-6 pt-6 sm:pt-8 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-200/80 flex items-center justify-center shadow-xs">
            <Shield className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-bold text-sm sm:text-base tracking-tight text-slate-900">
                DeepGuard <span className="text-blue-600">AI</span>
              </span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-50 text-blue-700 border border-blue-200">
                BOOT v4.8
              </span>
            </div>
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block">
              Autonomous Media Forensics
            </span>
          </div>
        </div>

        {/* Skip Button */}
        <button
          onClick={handleSkip}
          className="group flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-200 text-xs font-mono font-medium text-slate-600 hover:text-slate-900 transition-all shadow-xs cursor-pointer"
        >
          <span>Skip Boot</span>
          <FastForward className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          <span className="text-[10px] text-slate-400 hidden sm:inline">(ESC)</span>
        </button>
      </div>

      {/* Center Cinematic Biometric Radar Core */}
      <div className="flex flex-col items-center justify-center max-w-lg w-full px-6 my-auto relative z-10 text-center">
        {/* Multi-Layered Rotating Reticle System */}
        <div className="relative w-44 h-44 sm:w-52 sm:h-52 flex items-center justify-center mb-8">
          {/* Outer Rotating Gear Ring */}
          <div
            className="absolute inset-0 rounded-full border border-dashed border-blue-300 pointer-events-none animate-spin"
            style={{ animationDuration: '18s' }}
          />

          {/* Secondary Counter-Rotating Accent Ring */}
          <div
            className="absolute inset-2 rounded-full border border-blue-400/40 pointer-events-none animate-spin"
            style={{ animationDuration: '12s', animationDirection: 'reverse' }}
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-cyan-500 shadow-[0_0_10px_#06b6d4]" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-blue-600 shadow-[0_0_10px_#2563eb]" />
          </div>

          {/* Tertiary Subtle Glow Ring */}
          <div className="absolute inset-6 rounded-full bg-gradient-to-tr from-blue-500/10 via-cyan-400/15 to-indigo-500/10 border border-blue-200/80 backdrop-blur-sm shadow-inner" />

          {/* Reticle Targeting Brackets */}
          <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-blue-600" />
          <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-blue-600" />
          <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-blue-600" />
          <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-blue-600" />

          {/* Inner Glowing Shield & Laser Sweep */}
          <div className="relative z-10 flex flex-col items-center justify-center w-24 h-24 rounded-2xl bg-white border border-blue-200 shadow-xl overflow-hidden group">
            {/* High-Tech Sweep Line */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_12px_#06b6d4] animate-laser-sweep" />
            </div>

            <Shield className="w-10 h-10 text-blue-600 drop-shadow-sm transition-transform duration-300 group-hover:scale-110" />
            <Cpu className="w-4 h-4 text-cyan-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />

            <div className="absolute bottom-1.5 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-[8px] font-mono font-bold text-slate-500">READY</span>
            </div>
          </div>
        </div>

        {/* System Title */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-[11px] font-mono text-blue-700 font-semibold mb-2 shadow-xs">
            <Radio className="w-3 h-3 text-blue-600 animate-pulse" />
            <span>AI QUANTUM FORENSIC ENGINE</span>
          </div>

          <h1 className="font-display font-bold text-2xl sm:text-3xl text-slate-900 tracking-tight">
            Calibrating Defense Grid
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-sm mx-auto font-mono">
            {activeStep.detail}
          </p>
        </div>

        {/* Progress Bar & Percentage */}
        <div className="w-full space-y-2 mb-6">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-slate-500 font-medium tracking-wider">
              {activeStep.stage}
            </span>
            <span className="font-bold text-blue-600 tabular-nums text-sm">
              {progress}%
            </span>
          </div>

          {/* Cyber Track */}
          <div className="relative w-full h-2.5 rounded-full bg-slate-100 border border-slate-200 overflow-hidden p-0.5">
            <div
              className="h-full rounded-full bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 transition-all duration-100 ease-out relative shadow-[0_0_12px_rgba(37,99,235,0.4)]"
              style={{ width: `${progress}%` }}
            >
              {/* Shimmer overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-pulse" />
            </div>
          </div>
        </div>

        {/* Live Terminal Telemetry Output */}
        <div className="w-full rounded-xl bg-slate-900/95 border border-slate-800 p-3 text-left shadow-lg">
          <div className="flex items-center justify-between pb-1.5 border-b border-slate-800 text-[10px] font-mono text-slate-400 mb-2">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-rose-500 inline-block" />
              <span className="w-2 h-2 rounded-full bg-amber-500 inline-block" />
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
              <span className="ml-1 text-slate-300 font-semibold">DIAGNOSTIC TELEMETRY STREAM</span>
            </div>
            <span className="text-cyan-400 font-bold">STAGE {currentStepIndex + 1}/5</span>
          </div>

          <div className="space-y-1 font-mono text-[11px] leading-tight overflow-hidden">
            {logs.map((log, i) => (
              <div key={i} className="flex items-center gap-2 text-slate-300">
                <span className="text-cyan-400 select-none">❯</span>
                <span className="truncate">{log}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Global Status Bar */}
      <div className="w-full max-w-6xl mx-auto px-6 pb-6 sm:pb-8 relative z-10">
        <div className="pt-4 border-t border-slate-200/80 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-2">
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              <span>LATENCY: <strong className="text-slate-800">12ms</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <Activity className="w-3.5 h-3.5 text-emerald-500" />
              <span>EDGE MESH: <strong className="text-slate-800">32 NODES SYNCED</strong></span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
              <span>NIST FRVT ACCURACY: <strong className="text-slate-800">99.98%</strong></span>
            </div>
            <span className="text-slate-300 hidden sm:inline">|</span>
            <span className="hidden sm:inline text-slate-400">FIPS 140-3 ZERO-RETENTION VAULT</span>
          </div>
        </div>
      </div>
    </div>
  );
};

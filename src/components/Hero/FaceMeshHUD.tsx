import React, { useState, useEffect, useRef } from 'react';
import { Scan, Eye, Activity, AlertTriangle, CheckCircle2 } from 'lucide-react';

interface FaceMeshHUDProps {
  isManipulated?: boolean;
  onToggleState?: () => void;
}

// 68 anatomical facial landmark coordinates normalized (0-100 scale)
const FACE_LANDMARKS = [
  // Jawline (0-16)
  { x: 18, y: 35 }, { x: 20, y: 46 }, { x: 23, y: 58 }, { x: 27, y: 70 },
  { x: 33, y: 80 }, { x: 41, y: 88 }, { x: 50, y: 92 }, { x: 59, y: 88 },
  { x: 67, y: 80 }, { x: 73, y: 70 }, { x: 77, y: 58 }, { x: 80, y: 46 },
  { x: 82, y: 35 },
  // Right Eyebrow (17-21)
  { x: 26, y: 28 }, { x: 32, y: 24 }, { x: 38, y: 24 }, { x: 44, y: 27 },
  // Left Eyebrow (22-26)
  { x: 56, y: 27 }, { x: 62, y: 24 }, { x: 68, y: 24 }, { x: 74, y: 28 },
  // Nose Bridge (27-30)
  { x: 50, y: 34 }, { x: 50, y: 41 }, { x: 50, y: 48 }, { x: 50, y: 55 },
  // Nose Bottom (31-35)
  { x: 43, y: 58 }, { x: 47, y: 59 }, { x: 50, y: 60 }, { x: 53, y: 59 }, { x: 57, y: 58 },
  // Right Eye (36-41)
  { x: 30, y: 36 }, { x: 35, y: 33 }, { x: 41, y: 34 }, { x: 44, y: 38 }, { x: 40, y: 40 }, { x: 34, y: 39 },
  // Left Eye (42-47)
  { x: 56, y: 38 }, { x: 59, y: 34 }, { x: 65, y: 33 }, { x: 70, y: 36 }, { x: 66, y: 39 }, { x: 60, y: 40 },
  // Outer Lips (48-59)
  { x: 38, y: 72 }, { x: 43, y: 68 }, { x: 47, y: 67 }, { x: 50, y: 68 }, { x: 53, y: 67 }, { x: 57, y: 68 },
  { x: 62, y: 72 }, { x: 57, y: 77 }, { x: 53, y: 78 }, { x: 50, y: 78 }, { x: 47, y: 78 }, { x: 43, y: 77 },
  // Inner Lips (60-67)
  { x: 41, y: 72 }, { x: 47, y: 70 }, { x: 50, y: 71 }, { x: 53, y: 70 }, { x: 59, y: 72 }, { x: 53, y: 74 }, { x: 50, y: 74 }, { x: 47, y: 74 }
];

export const FaceMeshHUD: React.FC<FaceMeshHUDProps> = ({ isManipulated = false, onToggleState }) => {
  const [rotationDeg, setRotationDeg] = useState(0);
  const [scanPos, setScanPos] = useState(15);
  const [activeLandmark, setActiveLandmark] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Animate HUD rotation and scanning laser
  useEffect(() => {
    let animId: number;
    let start = performance.now();

    const loop = (now: number) => {
      const elapsed = (now - start) / 1000;
      setRotationDeg((elapsed * 15) % 360);
      // Sine wave scanline between 10% and 90%
      const pos = 50 + Math.sin(elapsed * 1.5) * 40;
      setScanPos(pos);
      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, []);

  const themeCyan = isManipulated ? '#E11D48' : '#0284C7';
  const themeViolet = isManipulated ? '#F43F5E' : '#4F46E5';
  const themeGlow = isManipulated ? 'shadow-glow-crimson' : 'shadow-glow-cyan';

  return (
    <div
      ref={containerRef}
      className={`relative w-full aspect-square max-w-[480px] mx-auto rounded-2xl bg-white/95 border ${
        isManipulated ? 'border-rose-300 shadow-rose-500/10' : 'border-blue-200 shadow-blue-500/10'
      } p-4 backdrop-blur-xl shadow-xl transition-all duration-700 overflow-hidden select-none`}
    >
      {/* Background Clean Grid */}
      <div className="absolute inset-0 cyber-grid opacity-30 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-50/30 via-transparent to-indigo-50/20 pointer-events-none" />

      {/* Top Telemetry Header */}
      <div className="relative z-10 flex items-center justify-between border-b border-slate-200 pb-2.5 text-[11px] font-mono">
        <div className="flex items-center gap-2">
          <Scan className={`w-3.5 h-3.5 ${isManipulated ? 'text-rose-600 animate-pulse' : 'text-blue-600'}`} />
          <span className="text-slate-800 font-semibold tracking-wider">
            {isManipulated ? 'ALERT: ANOMALOUS BIOMETRIC DETECTED' : 'FORENSIC SCAN: ACTIVE'}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-slate-500">FPS: 60.0</span>
          <span className="text-slate-300">•</span>
          <span className={isManipulated ? 'text-rose-600 font-bold' : 'text-emerald-600 font-bold'}>
            {isManipulated ? 'HIGH RISK' : 'AUTHENTIC'}
          </span>
        </div>
      </div>

      {/* Main Forensic Canvas Area */}
      <div className="relative w-full h-[calc(100%-48px)] mt-2 flex items-center justify-center">
        {/* Rotating Radar Rings */}
        <div
          className="absolute w-[84%] aspect-square rounded-full border border-dashed border-slate-200 pointer-events-none transition-transform"
          style={{ transform: `rotate(${rotationDeg}deg)` }}
        >
          {/* Compass ticks */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-3 bg-blue-500/40" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-3 bg-blue-500/40" />
          <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1.5 w-3 bg-blue-500/40" />
          <div className="absolute right-0 top-1/2 -translate-y-1/2 h-1.5 w-3 bg-blue-500/40" />
        </div>

        {/* Counter-rotating Inner Arc */}
        <div
          className="absolute w-[68%] aspect-square rounded-full border-t-2 border-r border-transparent pointer-events-none"
          style={{
            borderTopColor: themeCyan,
            borderRightColor: 'rgba(2, 132, 199, 0.15)',
            transform: `rotate(${-rotationDeg * 1.5}deg)`
          }}
        />

        {/* Moving Laser Scan Line */}
        <div
          className="absolute left-2 right-2 h-0.5 pointer-events-none z-20 transition-all"
          style={{
            top: `${scanPos}%`,
            background: `linear-gradient(90deg, transparent 0%, ${themeCyan} 50%, transparent 100%)`,
            boxShadow: `0 0 10px 1px ${themeCyan}`
          }}
        >
          {/* Scanline trailing glow */}
          <div
            className="w-full h-8 -mt-8 opacity-20"
            style={{
              background: `linear-gradient(to top, ${themeCyan}, transparent)`
            }}
          />
        </div>

        {/* 68-Point Biometric Face Mesh SVG */}
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full max-w-[340px] max-h-[340px] relative z-10 filter drop-shadow-[0_2px_8px_rgba(2,132,199,0.2)]"
        >
          {/* Connecting Mesh Triangles / Lines */}
          <g stroke={isManipulated ? 'rgba(225,29,72,0.35)' : 'rgba(2,132,199,0.3)'} strokeWidth="0.5" fill="none">
            {/* Jawline loop */}
            <polyline points={FACE_LANDMARKS.slice(0, 13).map((p) => `${p.x},${p.y}`).join(' ')} />
            {/* Eyebrows */}
            <polyline points={FACE_LANDMARKS.slice(13, 17).map((p) => `${p.x},${p.y}`).join(' ')} />
            <polyline points={FACE_LANDMARKS.slice(17, 21).map((p) => `${p.x},${p.y}`).join(' ')} />
            {/* Nose */}
            <polyline points={FACE_LANDMARKS.slice(21, 25).map((p) => `${p.x},${p.y}`).join(' ')} />
            <polyline points={FACE_LANDMARKS.slice(25, 30).map((p) => `${p.x},${p.y}`).join(' ')} />
            {/* Right eye */}
            <polygon points={FACE_LANDMARKS.slice(30, 36).map((p) => `${p.x},${p.y}`).join(' ')} />
            {/* Left eye */}
            <polygon points={FACE_LANDMARKS.slice(36, 42).map((p) => `${p.x},${p.y}`).join(' ')} />
            {/* Outer Lips */}
            <polygon points={FACE_LANDMARKS.slice(42, 54).map((p) => `${p.x},${p.y}`).join(' ')} />
            {/* Cross-mesh triangulation connections */}
            <line x1="50" y1="34" x2="38" y2="34" />
            <line x1="50" y1="34" x2="62" y2="34" />
            <line x1="50" y1="48" x2="43" y2="58" />
            <line x1="50" y1="48" x2="57" y2="58" />
            <line x1="50" y1="60" x2="50" y2="68" />
            <line x1="43" y1="58" x2="38" y2="72" />
            <line x1="57" y1="58" x2="62" y2="72" />
            <line x1="50" y1="78" x2="50" y2="92" />
            <line x1="38" y1="72" x2="33" y2="80" />
            <line x1="62" y1="72" x2="67" y2="80" />
          </g>

          {/* If manipulated, render highlighted anomaly zones */}
          {isManipulated && (
            <g>
              {/* Mouth blending anomaly box */}
              <rect
                x="34"
                y="64"
                width="32"
                height="18"
                fill="rgba(225,29,72,0.12)"
                stroke="#E11D48"
                strokeWidth="0.8"
                strokeDasharray="2 1"
                className="animate-pulse"
              />
              <text x="35" y="62" fill="#E11D48" fontSize="3" fontFamily="monospace" fontWeight="bold">
                BLENDING ARTIFACT #01
              </text>

              {/* Eye asymmetry warning */}
              <circle
                cx="37"
                cy="37"
                r="7"
                fill="rgba(225,29,72,0.12)"
                stroke="#E11D48"
                strokeWidth="0.6"
                strokeDasharray="1.5 1"
              />
              <text x="25" y="30" fill="#E11D48" fontSize="2.8" fontFamily="monospace">
                CORNEA MISMATCH
              </text>
            </g>
          )}

          {/* Landmark Nodes */}
          {FACE_LANDMARKS.map((p, idx) => (
            <circle
              key={idx}
              cx={p.x}
              cy={p.y}
              r={activeLandmark === idx ? 1.6 : 0.9}
              fill={activeLandmark === idx ? '#FFFFFF' : themeCyan}
              stroke={themeViolet}
              strokeWidth="0.3"
              className="cursor-pointer transition-all hover:r-2"
              onMouseEnter={() => setActiveLandmark(idx)}
              onMouseLeave={() => setActiveLandmark(null)}
            />
          ))}

          {/* Iris Pupil Coordinates */}
          <circle cx="37.5" cy="37" r="1.4" fill={isManipulated ? '#E11D48' : '#0284C7'} />
          <circle cx="63" cy="37" r="1.4" fill={isManipulated ? '#E11D48' : '#0284C7'} />
        </svg>

        {/* HUD Data Tags Overlaid */}
        <div className="absolute top-2 left-2 flex flex-col gap-1 text-[10px] font-mono text-slate-700 pointer-events-none">
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-white/90 border border-slate-200 shadow-xs">
            <span className="text-blue-600 font-bold">ROI:</span>
            <span>FACE_01 [68 PTS]</span>
          </div>
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-white/90 border border-slate-200 shadow-xs">
            <span className="text-indigo-600 font-bold">AZIMUTH:</span>
            <span>{Math.round(rotationDeg)}° NOMINAL</span>
          </div>
        </div>

        <div className="absolute top-2 right-2 flex flex-col items-end gap-1 text-[10px] font-mono pointer-events-none">
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-white/90 border border-slate-200 shadow-xs">
            <span className="text-slate-500">JITTER:</span>
            <span className={isManipulated ? 'text-rose-600 font-bold' : 'text-emerald-600 font-bold'}>
              {isManipulated ? '0.142px (FAIL)' : '0.012px (PASS)'}
            </span>
          </div>
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-white/90 border border-slate-200 shadow-xs">
            <span className="text-slate-500">SPEC_CORR:</span>
            <span className={isManipulated ? 'text-rose-600 font-bold' : 'text-blue-600 font-bold'}>
              {isManipulated ? '0.38 (LOW)' : '0.97 (HIGH)'}
            </span>
          </div>
        </div>

        {/* Bottom Interactive State Switcher Pill */}
        {onToggleState && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-30">
            <button
              onClick={onToggleState}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-medium backdrop-blur-md transition-all shadow-xs ${
                isManipulated
                  ? 'bg-rose-50 border border-rose-300 text-rose-700 hover:bg-rose-100 shadow-sm'
                  : 'bg-blue-50 border border-blue-300 text-blue-700 hover:bg-blue-100 shadow-sm'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              <span>Simulate: {isManipulated ? 'View Authentic' : 'View Manipulated'}</span>
            </button>
          </div>
        )}
      </div>

      {/* Reticle Corner Marks */}
      <div className="absolute top-1.5 left-1.5 w-2.5 h-2.5 border-t-2 border-l-2 border-blue-500" />
      <div className="absolute top-1.5 right-1.5 w-2.5 h-2.5 border-t-2 border-r-2 border-blue-500" />
      <div className="absolute bottom-1.5 left-1.5 w-2.5 h-2.5 border-b-2 border-l-2 border-blue-500" />
      <div className="absolute bottom-1.5 right-1.5 w-2.5 h-2.5 border-b-2 border-r-2 border-blue-500" />
    </div>
  );
};

import React, { useState } from 'react';
import type { MediaSample } from '../../types';
import { Layers, Maximize2, Minimize2 } from 'lucide-react';
import { sounds } from '../../utils/soundEffects';

interface HeatmapVisualProps {
  sample: MediaSample;
}

export const HeatmapVisual: React.FC<HeatmapVisualProps> = ({ sample }) => {
  const [viewMode, setViewMode] = useState<'rgb' | 'ela' | 'mesh'>('ela');
  const [mediaOrientation, setMediaOrientation] = useState<'portrait' | 'landscape' | 'square'>('landscape');
  const [fitMode, setFitMode] = useState<'contain' | 'cover'>('contain');

  const isManipulated = sample.result === 'DEEPFAKE (FAKE)';

  const handleModeChange = (mode: 'rgb' | 'ela' | 'mesh') => {
    sounds.playBlip();
    setViewMode(mode);
  };

  const handleMediaMeta = (width: number, height: number) => {
    if (height > width * 1.05) {
      setMediaOrientation('portrait');
    } else if (width > height * 1.05) {
      setMediaOrientation('landscape');
    } else {
      setMediaOrientation('square');
    }
  };

  return (
    <div className="rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 overflow-hidden flex flex-col justify-between shadow-xs">
      {/* View Switcher Controls */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200/80 dark:border-slate-800 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-blue-600 dark:text-cyan-400" />
          <span className="text-xs font-mono font-bold text-slate-800 dark:text-slate-200">
            SPECTRAL FORENSIC VIEWER
          </span>
          <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
            mediaOrientation === 'portrait' ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300' : 'bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-cyan-300'
          }`}>
            {mediaOrientation === 'portrait' ? 'PORTRAIT 9:16' : 'LANDSCAPE 16:9'}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 p-1 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs">
            <button
              onClick={() => handleModeChange('rgb')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                viewMode === 'rgb'
                  ? 'bg-blue-600 dark:bg-cyan-600 text-white font-bold shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white font-medium'
              }`}
            >
              RGB Optical
            </button>
            <button
              onClick={() => handleModeChange('ela')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                viewMode === 'ela'
                  ? 'bg-blue-600 dark:bg-cyan-600 text-white font-bold shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white font-medium'
              }`}
            >
              ELA Heatmap
            </button>
            <button
              onClick={() => handleModeChange('mesh')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                viewMode === 'mesh'
                  ? 'bg-blue-600 dark:bg-cyan-600 text-white font-bold shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white font-medium'
              }`}
            >
              Mesh Biometrics
            </button>
          </div>

          <button
            type="button"
            onClick={() => setFitMode((m) => (m === 'contain' ? 'cover' : 'contain'))}
            className="p-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 shadow-xs transition-colors"
            title={fitMode === 'contain' ? 'Fill frame' : 'Fit complete media'}
          >
            {fitMode === 'contain' ? <Maximize2 className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" /> : <Minimize2 className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />}
          </button>
        </div>
      </div>

      {/* Visual Canvas Viewport (Adaptive Portrait & Landscape) */}
      <div className={`relative w-full rounded-xl overflow-hidden bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-center shadow-inner transition-all duration-300 ${
        mediaOrientation === 'portrait'
          ? 'h-[440px] sm:h-[500px]'
          : 'aspect-[4/3] sm:aspect-video max-h-[460px]'
      }`}>
        {/* Ambient Blurred Backdrop Layer for Portrait / Letterbox Framing */}
        {sample.type === 'video' ? (
          <video
            src={sample.previewUrl}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-30 scale-110 pointer-events-none"
          />
        ) : (
          <img
            src={sample.previewUrl}
            alt=""
            className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-30 scale-110 pointer-events-none"
          />
        )}

        {/* Base Media (Preserves Complete Portrait and Landscape dimensions without cropping) */}
        {sample.type === 'video' ? (
          <video
            src={sample.previewUrl}
            autoPlay
            loop
            muted
            playsInline
            onLoadedMetadata={(e) => {
              const v = e.currentTarget;
              handleMediaMeta(v.videoWidth, v.videoHeight);
            }}
            className={`relative z-10 max-h-[460px] max-w-full rounded shadow-xl transition-all duration-500 ${
              fitMode === 'cover' ? 'w-full h-full object-cover' : 'w-auto h-auto object-contain'
            } ${
              viewMode === 'ela'
                ? 'filter contrast-150 saturate-200 hue-rotate-180 invert brightness-90'
                : viewMode === 'mesh'
                ? 'filter grayscale contrast-125 opacity-40'
                : ''
            }`}
          />
        ) : (
          <img
            src={sample.previewUrl}
            alt={sample.title}
            onLoad={(e) => {
              const img = e.currentTarget;
              handleMediaMeta(img.naturalWidth, img.naturalHeight);
            }}
            className={`relative z-10 max-h-[460px] max-w-full rounded shadow-xl transition-all duration-500 ${
              fitMode === 'cover' ? 'w-full h-full object-cover' : 'w-auto h-auto object-contain'
            } ${
              viewMode === 'ela'
                ? 'filter contrast-150 saturate-200 hue-rotate-180 invert brightness-90'
                : viewMode === 'mesh'
                ? 'filter grayscale contrast-125 opacity-40'
                : ''
            }`}
          />
        )}

        {/* ELA (Error Level Analysis) Simulated Artifact Map Overlay */}
        {viewMode === 'ela' && (
          <div className="absolute inset-0 pointer-events-none mix-blend-screen bg-gradient-to-tr from-purple-900/40 via-transparent to-cyan-500/30 z-20">
            {isManipulated ? (
              <>
                {/* Hotspot bounding circles indicating synthetic boundary noise */}
                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full border-2 border-dashed border-red-500 bg-red-500/25 animate-pulse" />
                <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-44 h-16 rounded-xl border border-yellow-400 bg-yellow-400/20" />
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/80 text-[10px] font-mono text-red-400 border border-red-500/40">
                  ALERT: HIGH-FREQUENCY DCT RESIDUAL SPIKE (+42dB)
                </div>
              </>
            ) : (
              <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/80 text-[10px] font-mono text-emerald-400 border border-emerald-500/40">
                STATUS: UNIFORM POISSON NOISE DISTRIBUTION (PASS)
              </div>
            )}
          </div>
        )}

        {/* Biometric Mesh Overlay (Adaptive to Portrait / Landscape) */}
        {viewMode === 'mesh' && (
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-20">
            <svg className={`text-cyan-400 transition-all ${
              mediaOrientation === 'portrait' ? 'w-3/5 h-4/5' : 'w-4/5 h-4/5'
            }`} viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 3" />
              <circle cx="35" cy="40" r="6" fill="none" stroke="#00F0FF" strokeWidth="0.8" />
              <circle cx="65" cy="40" r="6" fill="none" stroke="#00F0FF" strokeWidth="0.8" />
              <path d="M 35 70 Q 50 82 65 70" fill="none" stroke={isManipulated ? '#F43F5E' : '#00F0FF'} strokeWidth="1.2" />
              <line x1="50" y1="35" x2="50" y2="60" stroke="#00F0FF" strokeWidth="0.8" />
            </svg>
            <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/80 text-[10px] font-mono text-cyan-400 border border-cyan-400/30">
              TRACKED: 68 BIOMETRIC VECTORS
            </div>
          </div>
        )}

        {/* Legend in corner */}
        <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/80 text-[9px] font-mono text-slate-400 border border-white/10 z-20">
          MODE: {viewMode.toUpperCase()}
        </div>
      </div>
    </div>
  );
};

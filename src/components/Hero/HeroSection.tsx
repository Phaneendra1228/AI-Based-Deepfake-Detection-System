import React, { useState } from 'react';
import { ArrowRight, Terminal, Shield, CheckCircle2, ChevronDown, Camera, Cpu, Eye, ShieldAlert, ShieldCheck, Sparkles, Activity, Layers } from 'lucide-react';
import { FaceMeshHUD } from './FaceMeshHUD';
import { FloatingCard } from './FloatingCard';
import { sounds } from '../../utils/soundEffects';

interface HeroSectionProps {
  onAnalyzeClick: () => void;
  onExploreTechClick: () => void;
}

const HERO_PRESETS = [
  { id: 'biometric', name: 'Executive Scan', src: '/images/hero-biometrics.jpg', tag: '68-PT MESH' },
  { id: 'banking', name: 'FinTech KYC', src: '/images/app-banking.jpg', tag: 'LIVENESS PASS' },
  { id: 'forensics', name: 'Forensic Lab', src: '/images/app-forensics.jpg', tag: 'RESNET-50' },
  { id: 'newsroom', name: 'Broadcast Stream', src: '/images/app-newsroom.jpg', tag: 'SYNC AUDIT' },
];

export const HeroSection: React.FC<HeroSectionProps> = ({
  onAnalyzeClick,
  onExploreTechClick
}) => {
  const [isManipulatedState, setIsManipulatedState] = useState(false);
  const [visualMode, setVisualMode] = useState<'photo' | 'mesh'>('photo');
  const [activePresetIndex, setActivePresetIndex] = useState(0);

  const toggleHeroState = () => {
    sounds.playBlip();
    setIsManipulatedState(!isManipulatedState);
  };

  const handleSelectPreset = (idx: number) => {
    sounds.playBlip();
    setActivePresetIndex(idx);
  };

  const currentPreset = HERO_PRESETS[activePresetIndex];

  return (
    <section id="hero" className="relative pt-8 pb-16 md:pt-14 md:pb-24 overflow-hidden bg-white dark:bg-slate-950 transition-colors duration-300">
      {/* Background ambient lighting blobs */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-100/40 dark:bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-indigo-100/35 dark:bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Typography & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Forensics Live Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/40 border border-blue-200/80 dark:border-blue-800/60 text-xs font-mono text-blue-700 dark:text-cyan-400 mb-6 shadow-xs backdrop-blur-md">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600 dark:bg-cyan-400"></span>
              </span>
              <span className="tracking-widest font-semibold uppercase">
                AI-POWERED MEDIA FORENSICS
              </span>
              <span className="text-slate-300 dark:text-slate-700">|</span>
              <span className="text-slate-500 dark:text-slate-400 font-normal">DEFENSE GRADE</span>
            </div>

            {/* Main Heading */}
            <h1 className="font-display font-bold text-4xl sm:text-6xl xl:text-7xl tracking-tight text-slate-900 dark:text-white leading-[1.08] mb-6">
              See Beyond <br />
              <span className="relative inline-block">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 dark:from-cyan-400 dark:via-blue-500 dark:to-indigo-400">
                  the Fake.
                </span>
                {/* Glowing line underline accent */}
                <span className="absolute -bottom-2 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-transparent dark:from-cyan-400 dark:via-blue-500 dark:to-transparent rounded-full opacity-80" />
              </span>
            </h1>

            {/* Supporting Subheading */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed mb-8 font-normal">
              Detect manipulated images and videos with intelligent AI-powered media analysis. 
              <strong className="text-slate-900 dark:text-white font-semibold"> DeepGuard AI</strong> unpacks facial micro-movements, 
              frequency domain anomalies, and biological skin textures to authenticate human reality with mathematical certainty.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto mb-8">
              <button
                onClick={() => {
                  sounds.playBlip();
                  onAnalyzeClick();
                }}
                className="group relative inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl font-semibold text-sm bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 dark:from-cyan-500 dark:via-blue-600 dark:to-indigo-600 text-white shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/30 hover:scale-[1.01] active:scale-[0.99] transition-all duration-200"
              >
                <span>Analyze Media Now</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => {
                  sounds.playBlip();
                  onExploreTechClick();
                }}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-cyan-400 hover:border-blue-300 dark:hover:border-cyan-500/40 hover:bg-slate-50 dark:hover:bg-slate-800/60 shadow-xs transition-all duration-200"
              >
                <Terminal className="w-4 h-4 text-blue-600 dark:text-cyan-400" />
                <span>Explore Technology</span>
              </button>
            </div>

            {/* Feature Trust Strip */}
            <div className="pt-6 border-t border-slate-200/80 dark:border-slate-800 w-full flex flex-wrap items-center gap-y-2.5 gap-x-6 text-xs font-mono text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-cyan-400" />
                <span className="text-slate-700 dark:text-slate-300">Image & Video Forensics</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <span className="text-slate-700 dark:text-slate-300">ResNet-50 Feature Extraction</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span className="text-slate-700 dark:text-slate-300">Canvas Error Level Analysis</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Forensic HUD & Floating Card */}
          <div className="lg:col-span-5 relative flex flex-col items-center">
            
            {/* Top View Mode & Preset Selection Bar */}
            <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-2 mb-3">
              {/* Preset Thumbnails Selector */}
              <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs overflow-x-auto no-scrollbar w-full sm:w-auto">
                {HERO_PRESETS.map((preset, idx) => (
                  <button
                    key={preset.id}
                    onClick={() => handleSelectPreset(idx)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-mono whitespace-nowrap transition-all ${
                      activePresetIndex === idx
                        ? 'bg-white dark:bg-slate-800 text-blue-700 dark:text-cyan-400 font-bold shadow-2xs border border-slate-200 dark:border-slate-700'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {preset.name}
                  </button>
                ))}
              </div>

              {/* View Mode Switcher */}
              <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs shrink-0">
                <button
                  onClick={() => {
                    sounds.playBlip();
                    setVisualMode('photo');
                  }}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-mono font-medium transition-all ${
                    visualMode === 'photo'
                      ? 'bg-white dark:bg-slate-800 text-blue-700 dark:text-cyan-400 shadow-2xs border border-slate-200 dark:border-slate-700 font-bold'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Camera className="w-3 h-3 text-blue-600 dark:text-cyan-400" />
                  <span>Feed</span>
                </button>

                <button
                  onClick={() => {
                    sounds.playBlip();
                    setVisualMode('mesh');
                  }}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-mono font-medium transition-all ${
                    visualMode === 'mesh'
                      ? 'bg-white dark:bg-slate-800 text-blue-700 dark:text-cyan-400 shadow-2xs border border-slate-200 dark:border-slate-700 font-bold'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Cpu className="w-3 h-3 text-indigo-600 dark:text-indigo-400" />
                  <span>Mesh</span>
                </button>
              </div>
            </div>

            {/* Visual HUD Container */}
            <div className="relative w-full">
              {visualMode === 'photo' ? (
                <div
                  className={`relative w-full aspect-square max-w-[480px] mx-auto rounded-2xl bg-white dark:bg-slate-900 border-2 ${
                    isManipulatedState
                      ? 'border-rose-400 dark:border-rose-600 shadow-rose-500/20'
                      : 'border-cyan-400 dark:border-cyan-500 shadow-cyan-500/20'
                  } p-2.5 backdrop-blur-xl shadow-2xl transition-all duration-500 overflow-hidden select-none group`}
                >
                  {/* Photo Layer */}
                  <div className="relative w-full h-full rounded-xl overflow-hidden bg-slate-950">
                    <img
                      src={currentPreset.src}
                      alt={currentPreset.name}
                      className="w-full h-full object-cover transition-opacity duration-300"
                    />

                    {/* Laser Sweep Scanline */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden">
                      <div className="w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_#00F0FF] animate-laser-sweep" />
                    </div>

                    {/* HUD Overlays */}
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-slate-900/90 border border-cyan-400/50 backdrop-blur-md text-[10px] font-mono text-cyan-300 flex items-center gap-1.5 shadow-sm">
                      <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                      <span>{currentPreset.tag}: LIVE MONITORING</span>
                    </div>

                    <div className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-slate-900/90 border border-white/20 backdrop-blur-md text-[10px] font-mono text-white shadow-sm flex items-center gap-1.5">
                      <Activity className="w-3 h-3 text-emerald-400" />
                      <span>60 FPS • 1080P</span>
                    </div>

                    {/* Corner Targeting Reticles */}
                    <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-cyan-400 pointer-events-none" />
                    <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-cyan-400 pointer-events-none" />
                    <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-cyan-400 pointer-events-none" />
                    <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-cyan-400 pointer-events-none" />

                    {/* Bottom Status Card */}
                    <div className="absolute bottom-3 inset-x-3 p-2.5 rounded-xl bg-slate-900/90 border border-white/20 backdrop-blur-md flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {isManipulatedState ? (
                          <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0" />
                        ) : (
                          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                        )}
                        <span className="text-[11px] font-mono text-white font-semibold">
                          {isManipulatedState ? 'SYNTHETIC ARTIFACT FLAGGED' : 'BIOMETRIC SIGNATURE VERIFIED'}
                        </span>
                      </div>

                      <button
                        onClick={toggleHeroState}
                        className="px-2 py-0.5 rounded bg-white/20 hover:bg-white/30 text-[10px] font-mono text-white font-medium transition-all"
                      >
                        Simulate Flip
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <FaceMeshHUD
                  isManipulated={isManipulatedState}
                  onToggleState={toggleHeroState}
                />
              )}

              {/* Floating Detection Card Overlay */}
              <div className="relative lg:absolute lg:-bottom-10 lg:-left-12 w-full lg:max-w-[380px] mt-4 lg:mt-0 z-20">
                <FloatingCard
                  isManipulated={isManipulatedState}
                  onToggle={toggleHeroState}
                />
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Down indicator */}
      <div className="hidden md:flex justify-center mt-12">
        <a
          href="#trust-strip"
          onClick={(e) => {
            e.preventDefault();
            const el = document.getElementById('trust-strip');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          className="p-2.5 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs hover:border-blue-300 dark:hover:border-cyan-500 text-slate-400 dark:text-slate-500 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors"
        >
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </a>
      </div>
    </section>
  );
};

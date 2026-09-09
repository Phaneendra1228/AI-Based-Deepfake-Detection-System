import React, { useState, useEffect } from 'react';
import { Shield, ShieldAlert, ShieldCheck, Radio, Globe, Zap, Cpu, Filter, RefreshCw, AlertTriangle, ChevronRight, Activity } from 'lucide-react';
import { sounds } from '../../utils/soundEffects';

interface Incident {
  id: string;
  sector: 'Banking & KYC' | 'Executive Video' | 'Broadcast Media' | 'Gov Identity';
  type: string;
  location: string;
  confidence: number;
  timeAgo: string;
  status: 'BLOCKED' | 'FLAGGED' | 'NEUTRALIZED';
  vector: string;
}

const INITIAL_INCIDENTS: Incident[] = [
  {
    id: 'INC-9042',
    sector: 'Banking & KYC',
    type: 'Synthetic Liveness Spoofing & Latent Mask',
    location: 'Tokyo Edge Node (JP-02)',
    confidence: 99.8,
    timeAgo: 'Just now',
    status: 'BLOCKED',
    vector: 'Optical Bayer Noise Discontinuity',
  },
  {
    id: 'INC-9041',
    sector: 'Executive Video',
    type: 'Diffusion Face-Swap in Boardroom Stream',
    location: 'Frankfurt Central (EU-01)',
    confidence: 99.4,
    timeAgo: '5s ago',
    status: 'NEUTRALIZED',
    vector: 'MTCNN 68-pt Eye Micro-Tremor Absence',
  },
  {
    id: 'INC-9040',
    sector: 'Broadcast Media',
    type: 'Voice Synthesis Audio Injection',
    location: 'London Teleport (UK-04)',
    confidence: 98.9,
    timeAgo: '14s ago',
    status: 'FLAGGED',
    vector: 'Mel-Spectrogram Harmonic Phase Shift',
  },
  {
    id: 'INC-9039',
    sector: 'Gov Identity',
    type: 'High-Res Morphing Attack on Passport Scan',
    location: 'Washington DC (US-01)',
    confidence: 99.7,
    timeAgo: '28s ago',
    status: 'BLOCKED',
    vector: '2D Fourier High-Frequency Aliasing',
  },
  {
    id: 'INC-9038',
    sector: 'Banking & KYC',
    type: 'Replay Video Injection via Virtual Cam',
    location: 'Singapore Node (SG-03)',
    confidence: 99.2,
    timeAgo: '42s ago',
    status: 'BLOCKED',
    vector: 'Screen Pixel Moiré Diffraction Pattern',
  },
];

const SIMULATED_VECTORS = [
  { sector: 'Banking & KYC' as const, type: 'GAN-Generated Driver License Inpainting', location: 'Zurich Hub (CH-01)', vector: 'JPEG Error Level Residual Spike' },
  { sector: 'Executive Video' as const, type: 'Real-Time Deepfake Video Call Hijack', location: 'New York Metro (US-02)', vector: 'Pupil Glint Reflection Incoherence' },
  { sector: 'Broadcast Media' as const, type: 'Manipulated News Anchor Speech Audio', location: 'Sydney Edge (AU-01)', vector: 'Acoustic Vocal Tract Resonance Mismatch' },
  { sector: 'Gov Identity' as const, type: 'Neural Face Blend in Border Clearance', location: 'Amsterdam Gateway (NL-02)', vector: 'Facial Vascular Pulse FFT Anomaly' },
];

export const LiveThreatRadar: React.FC = () => {
  const [incidents, setIncidents] = useState<Incident[]>(INITIAL_INCIDENTS);
  const [selectedFilter, setSelectedFilter] = useState<'ALL' | 'Banking & KYC' | 'Executive Video' | 'Broadcast Media'>('ALL');
  const [radarRotation, setRadarRotation] = useState(0);
  const [liveBlocksToday, setLiveBlocksToday] = useState(38412);
  const [activeTab, setActiveTab] = useState<'stream' | 'radar'>('stream');

  // Rotate radar sweep smoothly
  useEffect(() => {
    let animId: number;
    let start = performance.now();
    const loop = (now: number) => {
      const elapsed = (now - start) / 1000;
      setRadarRotation((elapsed * 45) % 360);
      animId = requestAnimationFrame(loop);
    };
    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Periodic automatic live feed push
  useEffect(() => {
    const interval = setInterval(() => {
      const randomSeed = SIMULATED_VECTORS[Math.floor(Math.random() * SIMULATED_VECTORS.length)];
      const newIncident: Incident = {
        id: `INC-${Math.floor(9043 + Math.random() * 800)}`,
        sector: randomSeed.sector,
        type: randomSeed.type,
        location: randomSeed.location,
        confidence: Number((98.5 + Math.random() * 1.4).toFixed(1)),
        timeAgo: 'Just now',
        status: Math.random() > 0.3 ? 'BLOCKED' : 'NEUTRALIZED',
        vector: randomSeed.vector,
      };

      setIncidents((prev) => [newIncident, ...prev.slice(0, 7)]);
      setLiveBlocksToday((prev) => prev + 1);
    }, 6500);

    return () => clearInterval(interval);
  }, []);

  const handleSimulateAttack = () => {
    sounds.playScan();
    const randomSeed = SIMULATED_VECTORS[Math.floor(Math.random() * SIMULATED_VECTORS.length)];
    const newIncident: Incident = {
      id: `SIM-${Math.floor(1000 + Math.random() * 9000)}`,
      sector: randomSeed.sector,
      type: `[TEST TRIGGER] ${randomSeed.type}`,
      location: 'Local Sensor Node (TEST-01)',
      confidence: 99.9,
      timeAgo: 'Just now',
      status: 'BLOCKED',
      vector: randomSeed.vector,
    };

    setIncidents((prev) => [newIncident, ...prev.slice(0, 7)]);
    setLiveBlocksToday((prev) => prev + 1);
  };

  const filteredIncidents = selectedFilter === 'ALL'
    ? incidents
    : incidents.filter((inc) => inc.sector === selectedFilter);

  return (
    <section className="py-12 md:py-16 bg-white dark:bg-slate-950 relative overflow-hidden border-b border-slate-200/80 dark:border-slate-800/80 transition-colors duration-300">
      {/* Background Ambience */}
      <div className="absolute inset-0 cyber-grid opacity-20 dark:opacity-10 pointer-events-none" />
      <div className="absolute top-10 left-1/3 w-80 h-80 bg-blue-100/30 dark:bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/60 text-xs font-mono font-semibold text-blue-700 dark:text-cyan-400 mb-3 shadow-xs">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600 dark:bg-cyan-400"></span>
              </span>
              <span>LIVE THREAT INTERCEPTION RADAR</span>
              <span className="text-slate-300 dark:text-slate-700">|</span>
              <span className="text-slate-500 dark:text-slate-400 font-normal">REAL-TIME GLOBAL TELEMETRY</span>
            </div>

            <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 dark:text-white tracking-tight">
              Defending Reality Across Global Nodes
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-2 max-w-2xl">
              Witness real-time synthetic deepfakes, audio clones, and facial morphs intercepted by DeepGuard AI’s distributed 32-node edge cluster.
            </p>
          </div>

          {/* Quick Real-Time Action & Controls */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleSimulateAttack}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 dark:bg-cyan-600 dark:hover:bg-cyan-500 text-white text-xs font-semibold shadow-sm hover:shadow-md hover:shadow-blue-500/20 active:scale-95 transition-all"
            >
              <Zap className="w-3.5 h-3.5 text-yellow-300" />
              <span>Simulate Live Anomaly Test</span>
            </button>

            <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono">
              <button
                onClick={() => {
                  sounds.playBlip();
                  setActiveTab('stream');
                }}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                  activeTab === 'stream'
                    ? 'bg-white dark:bg-slate-800 text-blue-700 dark:text-cyan-400 shadow-xs border border-slate-200 dark:border-slate-700 font-bold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Stream View
              </button>
              <button
                onClick={() => {
                  sounds.playBlip();
                  setActiveTab('radar');
                }}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                  activeTab === 'radar'
                    ? 'bg-white dark:bg-slate-800 text-blue-700 dark:text-cyan-400 shadow-xs border border-slate-200 dark:border-slate-700 font-bold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Radar HUD
              </button>
            </div>
          </div>
        </div>

        {/* Real-time Metric Cards Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
          <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 block uppercase">Threats Neutralized Today</span>
              <span className="font-display font-bold text-xl sm:text-2xl text-slate-900 dark:text-white tabular-nums">
                {liveBlocksToday.toLocaleString()}
              </span>
            </div>
            <div className="w-9 h-9 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/60 flex items-center justify-center text-rose-600 dark:text-rose-400">
              <ShieldAlert className="w-5 h-5" />
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 block uppercase">Median Analysis Latency</span>
              <span className="font-display font-bold text-xl sm:text-2xl text-blue-600 dark:text-cyan-400 tabular-nums">
                14.2ms
              </span>
            </div>
            <div className="w-9 h-9 rounded-lg bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/60 flex items-center justify-center text-blue-600 dark:text-cyan-400">
              <Zap className="w-5 h-5" />
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 block uppercase">Distributed Edge Nodes</span>
              <span className="font-display font-bold text-xl sm:text-2xl text-emerald-600 dark:text-emerald-400 tabular-nums">
                32 / 32
              </span>
            </div>
            <div className="w-9 h-9 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <Globe className="w-5 h-5" />
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 block uppercase">True Human Precision</span>
              <span className="font-display font-bold text-xl sm:text-2xl text-indigo-600 dark:text-indigo-400 tabular-nums">
                99.98%
              </span>
            </div>
            <div className="w-9 h-9 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/60 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Main Interactive Content Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left / Center: Live Stream List */}
          <div className="lg:col-span-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md p-4 sm:p-5 relative overflow-hidden">
            {/* Filter Pills */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3.5 border-b border-slate-100 dark:border-slate-800 mb-3">
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
                <span className="text-xs font-mono text-slate-400 dark:text-slate-500 mr-1 flex items-center gap-1">
                  <Filter className="w-3 h-3" /> Filter:
                </span>
                {(['ALL', 'Banking & KYC', 'Executive Video', 'Broadcast Media'] as const).map((filter) => (
                  <button
                    key={filter}
                    onClick={() => {
                      sounds.playBlip();
                      setSelectedFilter(filter);
                    }}
                    className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all ${
                      selectedFilter === filter
                        ? 'bg-blue-600 dark:bg-cyan-600 text-white font-bold shadow-xs'
                        : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-750 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    {filter === 'ALL' ? 'All Incidents' : filter}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400 dark:text-slate-500">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>FEED: REAL-TIME SECURE</span>
              </div>
            </div>

            {/* Incidents Stream */}
            <div className="space-y-2.5">
              {filteredIncidents.map((incident) => {
                const isBlocked = incident.status === 'BLOCKED';
                return (
                  <div
                    key={incident.id}
                    className="p-3 sm:p-3.5 rounded-xl bg-slate-50/70 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 hover:border-blue-300 dark:hover:border-cyan-500/50 hover:bg-blue-50/20 dark:hover:bg-slate-800/80 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 group shadow-2xs"
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                        isBlocked ? 'bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-400 border border-rose-200 dark:border-rose-800/60' : 'bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800/60'
                      }`}>
                        <AlertTriangle className="w-4 h-4" />
                      </div>

                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span className="font-mono text-xs font-bold text-slate-900 dark:text-white">
                            {incident.id}
                          </span>
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300">
                            {incident.sector}
                          </span>
                          <span className="text-[11px] font-mono text-slate-400 dark:text-slate-500">
                            {incident.location}
                          </span>
                        </div>

                        <div className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">
                          {incident.type}
                        </div>

                        <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1.5">
                          <span className="text-blue-600 dark:text-cyan-400 font-medium">Vector:</span>
                          <span>{incident.vector}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-200/60 dark:border-slate-800">
                      <div className="flex items-center gap-2">
                        <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold tracking-wider ${
                          isBlocked
                            ? 'bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-400 border border-rose-200 dark:border-rose-800/60'
                            : 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60'
                        }`}>
                          {incident.status}
                        </span>
                        <span className="font-mono text-xs font-bold text-blue-700 dark:text-cyan-400">
                          {incident.confidence}%
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500 mt-1">
                        {incident.timeAgo}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: 360° Radar HUD Widget & Node Matrix */}
          <div className="lg:col-span-4 space-y-5">
            {/* 360° Radar HUD Display */}
            <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md p-5 relative overflow-hidden text-center">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-4 text-xs font-mono">
                <div className="flex items-center gap-2">
                  <Radio className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400 animate-pulse" />
                  <span className="font-bold text-slate-800 dark:text-slate-200">GLOBAL SENSOR SWEEP</span>
                </div>
                <span className="text-slate-500 dark:text-slate-400">AZIMUTH: 360°</span>
              </div>

              {/* Radar Circle */}
              <div className="relative w-44 h-44 sm:w-48 sm:h-48 mx-auto rounded-full bg-slate-50 dark:bg-slate-950 border border-blue-200/80 dark:border-cyan-500/30 shadow-inner flex items-center justify-center overflow-hidden">
                {/* Concentric rings */}
                <div className="absolute inset-4 rounded-full border border-dashed border-slate-200 dark:border-slate-800 pointer-events-none" />
                <div className="absolute inset-10 rounded-full border border-slate-200 dark:border-slate-800 pointer-events-none" />
                <div className="absolute inset-16 rounded-full border border-dashed border-blue-200 dark:border-cyan-800/40 pointer-events-none" />

                {/* Crosshairs */}
                <div className="absolute inset-x-0 top-1/2 h-px bg-slate-200 dark:bg-slate-800 pointer-events-none" />
                <div className="absolute inset-y-0 left-1/2 w-px bg-slate-200 dark:bg-slate-800 pointer-events-none" />

                {/* Rotating Beam */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ transform: `rotate(${radarRotation}deg)` }}
                >
                  <div className="w-1/2 h-1/2 bg-gradient-to-br from-blue-500/25 dark:from-cyan-400/30 to-transparent origin-bottom-right rounded-tl-full" />
                </div>

                {/* Active Threat Blips */}
                <div className="absolute top-10 right-12 w-2.5 h-2.5 rounded-full bg-rose-500 shadow-[0_0_8px_#f43f5e] animate-ping" />
                <div className="absolute bottom-12 left-10 w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_6px_#f59e0b] animate-ping" />
                <div className="absolute top-16 left-14 w-2 h-2 rounded-full bg-cyan-500 shadow-[0_0_6px_#06b6d4]" />

                {/* Center Core */}
                <div className="w-8 h-8 rounded-full bg-white dark:bg-slate-900 border-2 border-blue-600 dark:border-cyan-400 shadow-md flex items-center justify-center z-10">
                  <Shield className="w-4 h-4 text-blue-600 dark:text-cyan-400" />
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400">
                <span>SECTOR: ASIA-PACIFIC / EU</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">ALL SENSORS NOMINAL</span>
              </div>
            </div>

            {/* Micro Explainer Card */}
            <div className="rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-slate-850 border border-blue-200/80 dark:border-slate-800 p-5 shadow-xs text-left">
              <div className="flex items-center gap-2 mb-2 text-blue-700 dark:text-cyan-400 font-semibold text-xs font-mono">
                <Activity className="w-4 h-4 text-blue-600 dark:text-cyan-400" />
                <span>INTELLIGENT DEFENSE PROTOCOL</span>
              </div>
              <h4 className="font-display font-bold text-sm text-slate-900 dark:text-white mb-1">
                Zero-Retention Privacy Guarantee
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
                DeepGuard processes media entirely within cryptographic RAM buffers. No face images or private telemetry are stored or transmitted.
              </p>
              <div className="flex items-center gap-2 text-[11px] font-mono text-blue-700 dark:text-cyan-400 font-semibold">
                <span>FIPS 140-3 COMPLIANT</span>
                <span>•</span>
                <span>ISO 27001</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

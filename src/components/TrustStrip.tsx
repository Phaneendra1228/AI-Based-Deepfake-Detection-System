import React from 'react';
import { Cpu, Network, Eye, Layers, Image as ImageIcon, BrainCircuit, Code, Terminal } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

export const TrustStrip: React.FC = () => {
  const chips = [
    { name: 'CNN', icon: BrainCircuit, color: 'text-cyber-cyan', border: 'border-cyber-cyan/30' },
    { name: 'SVM', icon: Network, color: 'text-cyber-violet', border: 'border-cyber-violet/30' },
    { name: 'Computer Vision', icon: Eye, color: 'text-sky-400', border: 'border-sky-400/30' },
    { name: 'Feature Extraction', icon: Layers, color: 'text-emerald-400', border: 'border-emerald-400/30' },
    { name: 'Image Processing', icon: ImageIcon, color: 'text-amber-400', border: 'border-amber-400/30' },
    { name: 'Deep Learning', icon: Cpu, color: 'text-fuchsia-400', border: 'border-fuchsia-400/30' },
    { name: 'OpenCV', icon: Code, color: 'text-blue-400', border: 'border-blue-400/30' },
    { name: 'Python Forensics', icon: Terminal, color: 'text-slate-300', border: 'border-slate-500/30' }
  ];

  return (
    <div id="trust-strip" className="relative py-10 border-y border-slate-200/80 bg-slate-50/70 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Label */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-ping" />
            <span className="text-xs sm:text-sm font-mono tracking-wider text-slate-700 uppercase font-semibold">
              Built for the fight against synthetic media
            </span>
          </div>

          {/* Chips */}
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-2 sm:gap-2.5">
            {chips.map((chip) => {
              const Icon = chip.icon;
              return (
                <div
                  key={chip.name}
                  onMouseEnter={() => sounds.playBlip()}
                  className="group flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-mono text-slate-700 hover:text-slate-900 hover:border-blue-300 hover:shadow-md transition-all cursor-default shadow-xs"
                >
                  <Icon className={`w-3.5 h-3.5 ${chip.color} transition-transform group-hover:scale-110`} />
                  <span className="font-medium">{chip.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

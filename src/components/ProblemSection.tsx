import React from 'react';
import { PROBLEM_FEATURES } from '../data/mockData';
import { TrendingUp, Users, ShieldAlert, Fingerprint, ArrowUpRight } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

export const ProblemSection: React.FC = () => {
  const icons = [TrendingUp, Users, ShieldAlert, Fingerprint];

  return (
    <section id="problem" className="py-12 md:py-16 relative overflow-hidden bg-slate-50/60 dark:bg-slate-950 border-b border-slate-200/80 dark:border-slate-800/80 transition-colors duration-300">
      {/* Background subtle cyber grid */}
      <div className="absolute inset-0 cyber-grid opacity-30 dark:opacity-10 pointer-events-none" />
      <div className="absolute -top-32 right-1/3 w-80 h-80 bg-blue-100/40 dark:bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/60 text-xs font-mono font-semibold text-rose-700 dark:text-rose-400 mb-3 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
            <span>THE SYNTHETIC REALITY PARADOX</span>
          </div>

          <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 dark:text-white tracking-tight max-w-3xl mb-3">
            When Reality Can Be Generated.
          </h2>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl">
            Generative AI has dissolved the boundary between captured truth and synthetic simulation. 
            Legacy defenses and human eyesight are no longer sufficient.
          </p>
        </div>

        {/* Visual Forensic Comparison Showcase */}
        <div className="mb-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 sm:p-5 shadow-lg relative overflow-hidden">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800 mb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
              <div>
                <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">
                  Real-World Comparison: Optical Physics vs Generative Artifacts
                </h3>
                <p className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                  Microscopic sensor grain & biological liveness vs synthetic neural latent space diffusion
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="px-2.5 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60 font-semibold text-[11px]">
                ● AUTHENTIC HUMAN: 98.4%
              </span>
              <span className="px-2.5 py-0.5 rounded-md bg-rose-50 dark:bg-rose-950/50 text-rose-700 dark:text-rose-400 border border-rose-200 dark:border-rose-800/60 font-semibold text-[11px]">
                ▲ SYNTHETIC DEEPFAKE: 12.1%
              </span>
            </div>
          </div>

          {/* Forensic Image Comparison Container */}
          <div className="relative rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 aspect-[16/9] max-h-[320px] sm:max-h-[350px] bg-slate-950 group">
            <img
              src="/images/threat-comparison.jpg"
              alt="Authentic Human vs Synthetic Deepfake Forensic Comparison"
              className="w-full h-full object-cover group-hover:scale-[1.01] transition-transform duration-500"
            />
            {/* Ambient vignette gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />

            {/* Floating Callout Badges on bottom */}
            <div className="absolute bottom-4 inset-x-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pointer-events-none">
              <div className="px-3.5 py-2 rounded-xl bg-slate-900/90 border border-emerald-400/40 text-xs font-mono text-emerald-300 backdrop-blur-md shadow-lg flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>LEFT: Verified Epidermal Pore Scatter & Optical Bayer Filter Noise</span>
              </div>

              <div className="px-3.5 py-2 rounded-xl bg-slate-900/90 border border-rose-400/40 text-xs font-mono text-rose-300 backdrop-blur-md shadow-lg flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-rose-400" />
                <span>RIGHT: Adversarial Edge Inconsistencies & Latent Blending Artifacts</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Feature Blocks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PROBLEM_FEATURES.map((item, index) => {
            const Icon = icons[index];
            return (
              <div
                key={item.number}
                onMouseEnter={() => sounds.playBlip()}
                className="group relative rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-cyan-500 p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl shadow-sm"
              >
                {/* Number & Tag */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono font-bold text-3xl text-slate-300 dark:text-slate-700 group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors">
                      {item.number}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-md text-[10px] font-mono font-semibold bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 group-hover:text-blue-700 dark:group-hover:text-cyan-300 group-hover:border-blue-200 dark:group-hover:border-cyan-500/50 transition-colors">
                      {item.tag}
                    </span>
                  </div>

                  {/* Icon */}
                  <div className="w-11 h-11 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-800/60 flex items-center justify-center mb-4 text-blue-600 dark:text-cyan-400 group-hover:bg-blue-600 dark:group-hover:bg-cyan-500 group-hover:text-white transition-all shadow-xs">
                    <Icon className="w-5 h-5 transition-transform group-hover:scale-110" />
                  </div>

                  {/* Title */}
                  <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white mb-2.5 group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Bottom subtle accent line */}
                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200">
                  <span>FORENSIC VECTOR #{item.number}</span>
                  <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-all transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

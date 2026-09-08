import React from 'react';
import { Check, X, Shield, Zap, Sparkles } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

export const WhyDeepGuard: React.FC = () => {
  const points = [
    {
      title: 'AI-Powered Multi-Layer Analysis',
      desc: 'Simultaneous evaluation across frequency transforms, deep convolutional features, and biometric landmarks.',
      deepguard: true,
      manual: false,
    },
    {
      title: 'Automated Real-Time Processing',
      desc: 'Sub-second turnaround enabling continuous automated protection for high-throughput video streams.',
      deepguard: true,
      manual: false,
    },
    {
      title: 'Visual & Frequency Pattern Extraction',
      desc: 'Spots microscopic GAN up-sampling grids and Poisson blending seams invisible to human eyesight.',
      deepguard: true,
      manual: false,
    },
    {
      title: 'Scalable Enterprise Architecture',
      desc: 'Microservices containerized pipeline ready for cloud, edge, and hybrid forensic deployments.',
      deepguard: true,
      manual: false,
    },
    {
      title: 'Clear Explainable Detection Reports',
      desc: 'Provides transparent confidence percentages, anomaly heatmaps, and evidentiary audit records.',
      deepguard: true,
      manual: false,
    },
    {
      title: 'Forensic-Oriented Insights',
      desc: 'Designed specifically to support forensic analysts and legal teams with cryptographically verifiable chains of custody.',
      deepguard: true,
      manual: false,
    },
  ];

  return (
    <section id="why-deepguard" className="py-12 md:py-16 relative overflow-hidden bg-slate-50/60 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-xs font-mono font-semibold text-blue-700 mb-3 shadow-xs">
            <Zap className="w-3.5 h-3.5 text-blue-600" />
            <span>THE ADVANTAGE</span>
          </div>

          <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 tracking-tight mb-3">
            Detection Built for Modern Media.
          </h2>

          <p className="text-sm sm:text-base text-slate-600 max-w-2xl">
            Compare DeepGuard AI automated media forensics against conventional manual inspection 
            and rudimentary single-layer filters.
          </p>
        </div>

        {/* Feature Grid with Checkmarks */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {points.map((point) => (
            <div
              key={point.title}
              onMouseEnter={() => sounds.playBlip()}
              className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-blue-400 hover:shadow-xl transition-all duration-300 flex flex-col justify-between shadow-sm"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 mb-4 shadow-xs">
                  <Check className="w-5 h-5" />
                </div>

                <h3 className="font-display font-bold text-lg text-slate-900 mb-2">
                  {point.title}
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  {point.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-mono">
                <span className="text-blue-700 font-bold flex items-center gap-1">
                  <Check className="w-3.5 h-3.5 text-blue-600" /> DeepGuard AI
                </span>
                <span className="text-slate-400 flex items-center gap-1 font-medium">
                  <X className="w-3.5 h-3.5" /> Legacy Manual
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

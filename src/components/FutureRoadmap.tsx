import React from 'react';
import { Video, Cpu, Globe, Smartphone, Microscope, Compass, Sparkles } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

export const FutureRoadmap: React.FC = () => {
  const roadmapCards = [
    {
      title: 'REAL-TIME VIDEO DETECTION',
      desc: 'Analyze live video feeds, RTMP broadcast streams, and video calls continuously with sub-frame temporal latency.',
      status: 'In Development',
      badge: 'Beta Q3',
      icon: Video,
      color: 'text-cyber-cyan',
    },
    {
      title: 'TRANSFORMER-BASED MODELS',
      desc: 'Deploy Vision Transformers (ViT) and cross-attention architectures to capture long-range contextual spatial tampering.',
      status: 'Research Lab',
      badge: 'Prototype',
      icon: Cpu,
      color: 'text-cyber-violet',
    },
    {
      title: 'SOCIAL PLATFORM INTEGRATION',
      desc: 'Web extensions and high-scale enterprise API gateways for real-time social media feed verification and provenance stamping.',
      status: 'Architecture',
      badge: 'Planned',
      icon: Globe,
      color: 'text-sky-400',
    },
    {
      title: 'MOBILE ON-DEVICE FORENSICS',
      desc: 'Lightweight quantized neural weights (TensorRT/ONNX) running locally on mobile devices with zero cloud dependency.',
      status: 'Prototyping',
      badge: 'Q4 Preview',
      icon: Smartphone,
      color: 'text-cyber-emerald',
    },
    {
      title: 'ADVANCED FORENSIC SUITE',
      desc: 'In-depth digital investigation workflows with frame-by-frame timeline scrubbing, audio spectral phoneme analysis, and court reporting.',
      status: 'Production Preview',
      badge: 'Enterprise',
      icon: Microscope,
      color: 'text-amber-400',
    },
  ];

  return (
    <section id="roadmap" className="py-24 relative overflow-hidden bg-slate-50/60 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-xs font-mono font-semibold text-indigo-700 mb-4 shadow-xs">
            <Compass className="w-3.5 h-3.5 text-indigo-600" />
            <span>THE NEXT GENERATION</span>
          </div>

          <h2 className="font-display font-bold text-3xl sm:text-5xl text-slate-900 tracking-tight mb-4">
            What's Next?
          </h2>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl">
            As generative synthesis technologies evolve, DeepGuard AI continues to advance our research 
            frontiers across vision transformers, edge hardware, and streaming intelligence.
          </p>
        </div>

        {/* Roadmap Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {roadmapCards.map((card, i) => {
            const Icon = card.icon;

            return (
              <div
                key={card.title}
                onMouseEnter={() => sounds.playBlip()}
                className={`bg-white rounded-2xl p-6 border border-slate-200 hover:border-blue-400 hover:shadow-xl transition-all duration-300 flex flex-col justify-between shadow-sm ${
                  i === 0 ? 'md:col-span-2 lg:col-span-1' : ''
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shadow-xs">
                      <Icon className="w-5 h-5" />
                    </div>

                    <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-slate-100 border border-slate-200 text-slate-700">
                      {card.badge}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-lg text-slate-900 mb-2">
                    {card.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed mb-4">
                    {card.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-mono text-slate-500">
                  <span>STATUS</span>
                  <span className="text-blue-600 font-bold">{card.status}</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

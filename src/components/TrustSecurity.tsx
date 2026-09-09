import React from 'react';
import { Shield, Lock, Eye, Server, CheckCircle2, Cpu } from 'lucide-react';

export const TrustSecurity: React.FC = () => {
  const trustIndicators = [
    {
      title: 'Privacy-Aware',
      desc: 'Zero-retention media processing. Analyzed assets are processed ephemerally in RAM and purged upon completion.',
      icon: Lock,
    },
    {
      title: 'Secure Processing',
      desc: 'End-to-end TLS 1.3 encrypted data pipelines with cryptographic SHA-256 asset hash verification.',
      icon: Shield,
    },
    {
      title: 'Explainable Results',
      desc: 'Transparent multi-signal diagnostics providing confidence bounds and visible anomaly heatmaps.',
      icon: Eye,
    },
    {
      title: 'Scalable Architecture',
      desc: 'Elastic microservices architecture engineered to process high-throughput enterprise media workloads.',
      icon: Server,
    },
  ];

  return (
    <section id="security" className="py-24 relative overflow-hidden bg-white dark:bg-slate-950 border-b border-slate-200/80 dark:border-slate-800">
      {/* Background glowing shield radial effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-96 bg-blue-100/30 dark:bg-blue-950/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Center Glowing Shield Visual */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="relative flex items-center justify-center w-24 h-24 rounded-3xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50 border-2 border-blue-200 dark:border-blue-800/80 shadow-xl dark:shadow-blue-500/10 p-5 mb-6 group">
            <Shield className="w-12 h-12 text-blue-600 dark:text-blue-400 transition-transform group-hover:scale-110" />
            <Cpu className="w-5 h-5 text-indigo-600 dark:text-indigo-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute inset-0 rounded-3xl border border-blue-300 dark:border-blue-500 animate-ping opacity-20 pointer-events-none" />
          </div>

          <h2 className="font-display font-bold text-3xl sm:text-5xl text-slate-900 dark:text-white tracking-tight mb-4 max-w-2xl">
            Protect Trust in a Synthetic World.
          </h2>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
            DeepGuard AI is designed to assist organizations and users in evaluating suspicious digital media 
            through machine-learning and computer-vision based analysis.
          </p>
        </div>

        {/* 4 Trust Indicators */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {trustIndicators.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 hover:border-blue-300 dark:hover:border-blue-500/50 hover:bg-white dark:hover:bg-slate-900 hover:shadow-md transition-all shadow-xs"
              >
                <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4 shadow-xs">
                  <Icon className="w-5 h-5" />
                </div>

                <h3 className="font-display font-bold text-base text-slate-900 dark:text-white mb-2">
                  {item.title}
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-mono">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Responsible AI Compliance Notice */}
        <div className="max-w-3xl mx-auto rounded-2xl bg-slate-100 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 p-4 sm:p-5 text-center font-mono text-xs text-slate-600 dark:text-slate-400 shadow-xs">
          <span className="text-blue-700 dark:text-blue-400 font-bold block mb-1">
            RESPONSIBLE AI DISCLOSURE & FORENSIC PROTOCOL
          </span>
          DeepGuard AI outputs probabilistic confidence scores and anomaly heatmaps to assist trained human evaluators. 
          Our models are continuously re-benchmarked against emerging generative adversarial networks and diffusion models.
        </div>

      </div>
    </section>
  );
};

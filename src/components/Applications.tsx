import React from 'react';
import { Share2, ShieldAlert, Scale, Newspaper, UserCheck, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

export const Applications: React.FC = () => {
  const apps = [
    {
      title: 'IDENTITY & FINTECH',
      subtitle: 'Biometric Anti-Spoofing & KYC',
      description: 'Fortify digital banking onboarding, facial liveness verification, and remote authentication against zero-day deepfake replay attacks.',
      image: '/images/app-banking.jpg',
      badge: 'LIVENESS VERIFIED',
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      icon: UserCheck,
      metric: 'Zero-Trust Liveness Injection Defense',
    },
    {
      title: 'BROADCAST NEWS & MEDIA',
      subtitle: 'Real-Time Newsroom Verification',
      description: 'Empower journalists and editorial broadcast suites to instantly validate citizen-submitted footage and breaking political press conferences.',
      image: '/images/app-newsroom.jpg',
      badge: 'BROADCAST GRADE',
      badgeColor: 'bg-sky-50 text-sky-700 border-sky-200',
      icon: Newspaper,
      metric: '< 15s Latency in Live Control Rooms',
    },
    {
      title: 'DIGITAL FORENSICS & LAW',
      subtitle: 'Courtroom-Admissible Evidence',
      description: 'Cryptographically sealed audit trails, 2D Fourier spectra, and pixel tamper maps engineered to meet ISO/IEC 27037 legal standards.',
      image: '/images/app-forensics.jpg',
      badge: 'ISO/IEC 27037 ADMISSIBLE',
      badgeColor: 'bg-violet-50 text-violet-700 border-violet-200',
      icon: Scale,
      metric: 'Chained SHA-256 Hash Verification',
    },
    {
      title: 'EXECUTIVE CYBERSECURITY',
      subtitle: 'Boardroom & CEO Clone Defense',
      description: 'Defend against AI voice and video cloning used in high-stakes CEO impersonation fraud, authorization spoofs, and corporate espionage.',
      image: '/images/app-executive.jpg',
      badge: 'BIOMETRIC ENCRYPTED',
      badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
      icon: ShieldAlert,
      metric: 'Real-Time Meeting Stream Protection',
    },
    {
      title: 'SOCIAL PLATFORMS',
      subtitle: 'High-Throughput Content Moderation',
      description: 'Automated ultra-scale neural scanning of media ingestion pipelines to quarantine synthetic disinformation campaigns before viral spread.',
      image: '/images/hero-biometrics.jpg',
      badge: '5M+ ITEMS / DAY',
      badgeColor: 'bg-cyan-50 text-cyan-700 border-cyan-200',
      icon: Share2,
      metric: 'Sub-250ms High-Concurrency API',
    },
  ];

  return (
    <section id="applications" className="py-12 md:py-16 relative overflow-hidden bg-slate-50/60 dark:bg-slate-950 border-b border-slate-200/80 dark:border-slate-800/80 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-xs font-mono font-semibold text-emerald-700 dark:text-emerald-400 mb-3 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>ENTERPRISE HORIZONS</span>
          </div>

          <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 dark:text-white tracking-tight mb-3">
            Built for Digital Trust.
          </h2>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl">
            From intelligence agencies and newsrooms to financial institutions and social networks, 
            DeepGuard AI provides mission-critical synthetic media protection.
          </p>
        </div>

        {/* 5 Applications Grid with Real Photography */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {apps.map((app, idx) => {
            const Icon = app.icon;

            return (
              <div
                key={app.title}
                onMouseEnter={() => sounds.playBlip()}
                className={`group rounded-3xl overflow-hidden flex flex-col justify-between transition-all duration-300 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-cyan-500/50 hover:shadow-2xl hover:-translate-y-1.5 shadow-sm ${
                  idx === 0 ? 'lg:col-span-1' : ''
                }`}
              >
                {/* Photo Preview Container */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                  <img
                    src={app.image}
                    alt={app.subtitle}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Subtle gradient vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

                  {/* Sector Tag & Status Badge */}
                  <div className="absolute top-3 inset-x-3 flex items-center justify-between">
                    <span className={`px-2.5 py-1 rounded-md text-[10px] font-mono font-bold border backdrop-blur-md shadow-sm ${app.badgeColor} dark:bg-slate-900/90 dark:border-slate-700`}>
                      ● {app.badge}
                    </span>

                    <div className="w-8 h-8 rounded-lg bg-slate-900/80 border border-white/20 flex items-center justify-center text-white backdrop-blur-md">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Overlay Title on Image */}
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <span className="text-[10px] font-mono tracking-widest text-cyan-300 uppercase font-semibold">
                      {app.title}
                    </span>
                    <h3 className="font-display font-bold text-base text-white truncate">
                      {app.subtitle}
                    </h3>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-5">
                    {app.description}
                  </p>

                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400">
                    <div className="flex items-center gap-1.5 text-blue-600 dark:text-cyan-400 font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{app.metric}</span>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

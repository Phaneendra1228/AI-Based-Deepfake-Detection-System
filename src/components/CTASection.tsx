import React from 'react';
import { ArrowRight, Terminal, Shield, Sparkles, Binary } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface CTASectionProps {
  onLaunchScanner: () => void;
  onExploreTech: () => void;
}

export const CTASection: React.FC<CTASectionProps> = ({ onLaunchScanner, onExploreTech }) => {
  return (
    <section className="py-12 md:py-16 relative overflow-hidden bg-slate-50/50 dark:bg-slate-950 border-b border-slate-200/80 dark:border-slate-800">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Frosted Cyber Card Container */}
        <div className="relative rounded-3xl p-6 sm:p-10 text-center overflow-hidden bg-white dark:bg-slate-900/90 border border-blue-200/90 dark:border-blue-800/60 shadow-2xl shadow-blue-500/10 dark:shadow-blue-900/20">
          {/* Cyber Network Background Layer inside Card */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-30 dark:opacity-20 mix-blend-multiply dark:mix-blend-screen pointer-events-none"
            style={{ backgroundImage: `url('/images/bg-cyber-network.jpg')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/70 to-blue-50/80 dark:from-slate-900/95 dark:via-slate-900/85 dark:to-slate-950/90 pointer-events-none" />
          
          {/* Background Animated Rings */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] rounded-full border border-blue-200/60 dark:border-blue-500/20 animate-spin-slow pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] rounded-full border border-dashed border-indigo-200 dark:border-indigo-500/20 pointer-events-none" />

          <div className="relative z-10">
            {/* Core Shield Badge */}
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800/80 shadow-md shadow-blue-500/10 dark:shadow-blue-500/20 text-blue-600 dark:text-blue-400 mb-6">
              <Shield className="w-7 h-7" />
            </div>

            {/* Heading */}
            <h2 className="font-display font-bold text-3xl sm:text-5xl text-slate-900 dark:text-white tracking-tight leading-tight mb-4">
              Don't Just Watch. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-600 dark:from-blue-400 dark:via-indigo-400 dark:to-cyan-400 drop-shadow-sm">
                Verify.
              </span>
            </h2>

            {/* Subtitle */}
            <p className="text-sm sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-8 leading-relaxed font-normal">
              Bring intelligent media analysis into your workflow. Evaluate images, videos, and biometric consistency 
              with next-generation AI forensics.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => {
                  sounds.playBlip();
                  onLaunchScanner();
                }}
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-bold text-sm bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40 hover:scale-105 active:scale-95 transition-all min-h-[48px]"
              >
                <span>Launch Media Scanner</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => {
                  sounds.playBlip();
                  onExploreTech();
                }}
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl font-bold text-sm bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 transition-colors min-h-[48px] shadow-xs"
              >
                <Terminal className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span>Explore the Technology</span>
              </button>
            </div>

            <div className="mt-8 text-xs font-mono text-slate-500 dark:text-slate-400 font-medium">
              Instant Evaluation • Zero Data Retention • Cryptographic Audit Trail
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

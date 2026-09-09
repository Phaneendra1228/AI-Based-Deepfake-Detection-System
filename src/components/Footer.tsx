import React from 'react';
import { Shield, Cpu } from 'lucide-react';
import { sounds } from '../utils/soundEffects';
import type { PageId } from './PagePagination';

interface FooterProps {
  onNavigate?: (page: PageId) => void;
  onRebootBootScreen?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onRebootBootScreen }) => {
  const handlePageNav = (pageId: PageId) => {
    sounds.playBlip();
    if (onNavigate) {
      onNavigate(pageId);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 pt-12 pb-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-200 dark:border-slate-800">
          
          {/* Brand Info */}
          <div className="md:col-span-5 flex flex-col items-start">
            <button
              onClick={() => handlePageNav('home')}
              className="flex items-center gap-3 mb-4 text-left group"
            >
              <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50 border border-blue-200 dark:border-blue-800 p-2 shadow-xs group-hover:scale-105 transition-transform">
                <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <Cpu className="w-2.5 h-2.5 text-indigo-600 dark:text-indigo-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              </div>
              <span className="font-display font-bold text-xl tracking-tight text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                DeepGuard <span className="text-blue-600 dark:text-blue-400">AI</span>
              </span>
            </button>

            <p className="text-slate-600 dark:text-slate-400 text-sm max-w-sm mb-6 leading-relaxed">
              AI-powered media authenticity analysis. Advancing digital forensics, biometric verification, 
              and generative media defense for an honest digital future.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-xs font-mono font-semibold text-emerald-700 dark:text-emerald-400 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>GLOBAL FORENSIC MESH OPERATIONAL</span>
              </div>

              {onRebootBootScreen && (
                <button
                  onClick={() => {
                    sounds.playBlip();
                    onRebootBootScreen();
                  }}
                  className="px-3 py-1.5 rounded-full bg-white dark:bg-slate-900 hover:bg-blue-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors shadow-2xs flex items-center gap-1.5"
                >
                  <Cpu className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                  <span>Re-test Boot Screen</span>
                </button>
              )}
            </div>
          </div>

          {/* Links Columns */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            
            {/* Column 1: Architecture */}
            <div>
              <h4 className="font-mono text-xs font-bold text-slate-900 dark:text-slate-200 uppercase tracking-wider mb-4">
                Architecture
              </h4>
              <ul className="space-y-2.5 text-xs font-mono text-slate-600 dark:text-slate-400">
                <li>
                  <button onClick={() => handlePageNav('home')} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    Product Core
                  </button>
                </li>
                <li>
                  <button onClick={() => handlePageNav('technology')} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    How It Works
                  </button>
                </li>
                <li>
                  <button onClick={() => handlePageNav('technology')} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    Technology & Models
                  </button>
                </li>
                <li>
                  <button onClick={() => handlePageNav('scanner')} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    Media Scanner
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 2: Solutions */}
            <div>
              <h4 className="font-mono text-xs font-bold text-slate-900 dark:text-slate-200 uppercase tracking-wider mb-4">
                Solutions
              </h4>
              <ul className="space-y-2.5 text-xs font-mono text-slate-600 dark:text-slate-400">
                <li>
                  <button onClick={() => handlePageNav('applications')} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    Applications
                  </button>
                </li>
                <li>
                  <button onClick={() => handlePageNav('dashboard')} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    Cyber Dashboard
                  </button>
                </li>
                <li>
                  <button onClick={() => handlePageNav('case-studies')} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    Case Studies
                  </button>
                </li>
                <li>
                  <button onClick={() => handlePageNav('forensics')} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    Forensic Dossier
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3: Trust & Compliance */}
            <div>
              <h4 className="font-mono text-xs font-bold text-slate-900 dark:text-slate-200 uppercase tracking-wider mb-4">
                Compliance
              </h4>
              <ul className="space-y-2.5 text-xs font-mono text-slate-600 dark:text-slate-400">
                <li>
                  <button onClick={() => handlePageNav('home')} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    Security & Trust
                  </button>
                </li>
                <li>
                  <button onClick={() => handlePageNav('home')} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    Zero-Retention Policy
                  </button>
                </li>
                <li>
                  <button onClick={() => handlePageNav('forensics')} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    Explainable AI
                  </button>
                </li>
                <li>
                  <a href="mailto:forensics@deepguard.ai" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    Contact Forensics
                  </a>
                </li>
              </ul>
            </div>

          </div>

        </div>

        {/* Bottom Disclaimer & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500 dark:text-slate-400">
          <div>
            &copy; 2026 DeepGuard AI. All rights reserved. Built for digital forensics & synthetic defense.
          </div>

          <div className="text-center md:text-right max-w-md text-[11px] text-slate-500 dark:text-slate-400">
            <span className="font-semibold text-slate-600 dark:text-slate-300">Disclaimer: </span>
            Detection results are AI-assisted assessments and should be reviewed in context for high-stakes decisions.
          </div>
        </div>

      </div>
    </footer>
  );
};

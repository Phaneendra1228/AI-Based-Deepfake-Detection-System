import React, { useState, useEffect } from 'react';
import { ArrowUp, Scan, FileText, Globe, Award, Shield } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

export const FloatingQuickNav: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 350);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    sounds.playBlip();
    if (id === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Quick Section Navigation"
      className="fixed bottom-6 right-6 z-40 flex items-center gap-1.5 p-1.5 rounded-full bg-white/95 border border-slate-200/90 shadow-2xl shadow-blue-500/10 backdrop-blur-xl transition-all duration-300 transform-gpu animate-fade-in"
    >
      <button
        onClick={() => scrollTo('top')}
        className="flex items-center gap-1 px-3 py-2 rounded-full text-xs font-mono font-medium text-slate-700 hover:text-blue-600 hover:bg-slate-100 transition-colors"
        title="Scroll to Top"
      >
        <ArrowUp className="w-3.5 h-3.5 text-blue-600" />
        <span className="hidden sm:inline">Top</span>
      </button>

      <div className="h-4 w-px bg-slate-200" />

      <button
        onClick={() => scrollTo('scanner')}
        className="flex items-center gap-1 px-3 py-2 rounded-full text-xs font-mono font-medium text-slate-700 hover:text-blue-600 hover:bg-blue-50 transition-colors"
      >
        <Scan className="w-3.5 h-3.5 text-cyan-600" />
        <span>Scanner</span>
      </button>

      <button
        onClick={() => scrollTo('report')}
        className="flex items-center gap-1 px-3 py-2 rounded-full text-xs font-mono font-medium text-slate-700 hover:text-blue-600 hover:bg-indigo-50 transition-colors"
      >
        <FileText className="w-3.5 h-3.5 text-indigo-600" />
        <span className="hidden sm:inline">Report</span>
      </button>

      <button
        onClick={() => scrollTo('applications')}
        className="flex items-center gap-1 px-3 py-2 rounded-full text-xs font-mono font-medium text-slate-700 hover:text-blue-600 hover:bg-emerald-50 transition-colors"
      >
        <Globe className="w-3.5 h-3.5 text-emerald-600" />
        <span className="hidden md:inline">Apps</span>
      </button>

      <button
        onClick={() => scrollTo('case-studies')}
        className="flex items-center gap-1 px-3 py-2 rounded-full text-xs font-mono font-medium text-slate-700 hover:text-blue-600 hover:bg-blue-50 transition-colors"
      >
        <Award className="w-3.5 h-3.5 text-blue-600" />
        <span className="hidden md:inline">Stories</span>
      </button>
    </aside>
  );
};

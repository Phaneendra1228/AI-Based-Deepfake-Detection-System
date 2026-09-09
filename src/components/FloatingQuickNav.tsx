import React, { useState, useEffect } from 'react';
import { ArrowUp, Scan, FileText, Globe, Award, BarChart3 } from 'lucide-react';
import { sounds } from '../utils/soundEffects';
import type { PageId } from './PagePagination';

interface FloatingQuickNavProps {
  currentPage?: PageId;
  onNavigate?: (page: PageId) => void;
}

export const FloatingQuickNav: React.FC<FloatingQuickNavProps> = ({
  currentPage = 'home',
  onNavigate,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 350);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleGo = (pageId: PageId | 'top') => {
    sounds.playBlip();
    if (pageId === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (onNavigate) {
      onNavigate(pageId);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Quick Section Navigation"
      className="fixed bottom-6 right-6 z-40 flex items-center gap-1.5 p-1.5 rounded-full bg-white/95 border border-slate-200/90 shadow-2xl shadow-blue-500/10 backdrop-blur-xl transition-all duration-300 transform-gpu"
    >
      <button
        onClick={() => handleGo('top')}
        className="flex items-center gap-1 px-3 py-2 rounded-full text-xs font-mono font-medium text-slate-700 hover:text-blue-600 hover:bg-slate-100 transition-colors"
        title="Scroll to Top"
      >
        <ArrowUp className="w-3.5 h-3.5 text-blue-600" />
        <span className="hidden sm:inline">Top</span>
      </button>

      <div className="h-4 w-px bg-slate-200" />

      <button
        onClick={() => handleGo('scanner')}
        className={`flex items-center gap-1 px-3 py-2 rounded-full text-xs font-mono font-medium transition-colors ${
          currentPage === 'scanner'
            ? 'bg-blue-600 text-white font-bold'
            : 'text-slate-700 hover:text-blue-600 hover:bg-blue-50'
        }`}
      >
        <Scan className={`w-3.5 h-3.5 ${currentPage === 'scanner' ? 'text-white' : 'text-cyan-600'}`} />
        <span>Scanner</span>
      </button>

      <button
        onClick={() => handleGo('forensics')}
        className={`flex items-center gap-1 px-3 py-2 rounded-full text-xs font-mono font-medium transition-colors ${
          currentPage === 'forensics'
            ? 'bg-blue-600 text-white font-bold'
            : 'text-slate-700 hover:text-blue-600 hover:bg-indigo-50'
        }`}
      >
        <FileText className={`w-3.5 h-3.5 ${currentPage === 'forensics' ? 'text-white' : 'text-indigo-600'}`} />
        <span className="hidden sm:inline">Forensics</span>
      </button>

      <button
        onClick={() => handleGo('applications')}
        className={`flex items-center gap-1 px-3 py-2 rounded-full text-xs font-mono font-medium transition-colors ${
          currentPage === 'applications'
            ? 'bg-blue-600 text-white font-bold'
            : 'text-slate-700 hover:text-blue-600 hover:bg-emerald-50'
        }`}
      >
        <Globe className={`w-3.5 h-3.5 ${currentPage === 'applications' ? 'text-white' : 'text-emerald-600'}`} />
        <span className="hidden md:inline">Apps</span>
      </button>

      <button
        onClick={() => handleGo('dashboard')}
        className={`flex items-center gap-1 px-3 py-2 rounded-full text-xs font-mono font-medium transition-colors ${
          currentPage === 'dashboard'
            ? 'bg-blue-600 text-white font-bold'
            : 'text-slate-700 hover:text-blue-600 hover:bg-blue-50'
        }`}
      >
        <BarChart3 className={`w-3.5 h-3.5 ${currentPage === 'dashboard' ? 'text-white' : 'text-blue-600'}`} />
        <span className="hidden md:inline">Dashboard</span>
      </button>
    </aside>
  );
};

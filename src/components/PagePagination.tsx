import React from 'react';
import { ArrowLeft, ArrowRight, RotateCcw } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

export type PageId =
  | 'home'
  | 'technology'
  | 'scanner'
  | 'forensics'
  | 'applications'
  | 'case-studies'
  | 'dashboard';

export interface PageMeta {
  id: PageId;
  title: string;
  description: string;
}

export const PAGES_LIST: PageMeta[] = [
  { id: 'home', title: 'Home', description: 'Overview & Threat Paradox' },
  { id: 'technology', title: 'Technology', description: 'Convolutional & Spectral Architecture' },
  { id: 'scanner', title: 'Scanner', description: 'Live Biometric Inspection Laboratory' },
  { id: 'forensics', title: 'Forensics', description: 'Explainable AI Evidence Dossier' },
  { id: 'applications', title: 'Applications', description: 'Enterprise Trust Sectors' },
  { id: 'case-studies', title: 'Case Studies', description: 'Field-Proven Operations' },
  { id: 'dashboard', title: 'Dashboard', description: 'Telemetry & Fleet Analytics' },
];

interface PagePaginationProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
}

export const PagePagination: React.FC<PagePaginationProps> = ({ currentPage, onNavigate }) => {
  const currentIndex = PAGES_LIST.findIndex((p) => p.id === currentPage);
  const prevPage = currentIndex > 0 ? PAGES_LIST[currentIndex - 1] : null;
  const nextPage = currentIndex < PAGES_LIST.length - 1 ? PAGES_LIST[currentIndex + 1] : null;

  const handleGo = (pageId: PageId) => {
    sounds.playBlip();
    onNavigate(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="w-full py-12 px-4 sm:px-6 lg:px-8 border-t border-slate-200/80 bg-slate-50/70 relative z-20">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        
        {/* Previous Page Button */}
        <div className="w-full sm:w-auto flex justify-start">
          {prevPage ? (
            <button
              onClick={() => handleGo(prevPage.id)}
              className="group flex items-center gap-3 px-5 py-3 rounded-2xl bg-white border border-slate-200 text-slate-700 hover:text-blue-600 hover:border-blue-300 hover:shadow-md transition-all shadow-xs w-full sm:w-auto"
            >
              <ArrowLeft className="w-4 h-4 text-blue-600 transition-transform group-hover:-translate-x-1" />
              <div className="text-left">
                <div className="text-[10px] font-mono uppercase text-slate-400">Previous Page</div>
                <div className="text-sm font-display font-bold text-slate-900 group-hover:text-blue-600">
                  {prevPage.title}
                </div>
              </div>
            </button>
          ) : (
            <div className="hidden sm:block w-32" />
          )}
        </div>

        {/* Center: Interactive Page Dots / Stepper */}
        <div className="flex flex-col items-center gap-2.5">
          <div className="text-xs font-mono text-slate-500">
            Page <span className="font-bold text-slate-900">{currentIndex + 1}</span> of{' '}
            <span className="font-bold text-slate-900">{PAGES_LIST.length}</span>: {PAGES_LIST[currentIndex].title}
          </div>

          <div className="flex items-center gap-1.5 p-1 rounded-full bg-white border border-slate-200 shadow-xs">
            {PAGES_LIST.map((page, idx) => {
              const isActive = page.id === currentPage;
              return (
                <button
                  key={page.id}
                  onClick={() => handleGo(page.id)}
                  title={`${page.title} — ${page.description}`}
                  className={`h-7 px-2.5 rounded-full text-xs font-mono font-medium transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white font-bold shadow-xs'
                      : 'text-slate-600 hover:text-blue-600 hover:bg-slate-100'
                  }`}
                >
                  {idx + 1}. {page.title}
                </button>
              );
            })}
          </div>
        </div>

        {/* Next Page Button */}
        <div className="w-full sm:w-auto flex justify-end">
          {nextPage ? (
            <button
              onClick={() => handleGo(nextPage.id)}
              className="group flex items-center justify-end gap-3 px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-md shadow-blue-500/20 hover:shadow-lg transition-all w-full sm:w-auto"
            >
              <div className="text-right">
                <div className="text-[10px] font-mono uppercase text-blue-100">Next Page</div>
                <div className="text-sm font-display font-bold text-white">
                  {nextPage.title}
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-white transition-transform group-hover:translate-x-1" />
            </button>
          ) : (
            <button
              onClick={() => handleGo('home')}
              className="group flex items-center justify-end gap-3 px-6 py-3 rounded-2xl bg-white border border-slate-200 text-slate-800 hover:text-blue-600 hover:border-blue-300 shadow-sm transition-all w-full sm:w-auto"
            >
              <div className="text-right">
                <div className="text-[10px] font-mono uppercase text-slate-400">Restart Tour</div>
                <div className="text-sm font-display font-bold text-slate-900 group-hover:text-blue-600">
                  Return to Home
                </div>
              </div>
              <RotateCcw className="w-4 h-4 text-blue-600 transition-transform group-hover:rotate-180 duration-500" />
            </button>
          )}
        </div>

      </div>
    </div>
  );
};

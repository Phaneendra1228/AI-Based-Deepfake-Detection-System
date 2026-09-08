import React, { useState, useEffect } from 'react';
import { Shield, Cpu, Volume2, VolumeX, Menu, X, ArrowRight, Activity } from 'lucide-react';
import { sounds } from '../utils/soundEffects';
import { PAGES_LIST, type PageId } from './PagePagination';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  onOpenScanner: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  onOpenScanner
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(sounds.isMuted);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSound = () => {
    const nextMuted = sounds.toggleMute();
    setIsMuted(nextMuted);
  };

  const handlePageClick = (pageId: PageId) => {
    sounds.playBlip();
    setMobileMenuOpen(false);
    onNavigate(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-xl border-b border-slate-200 shadow-xs py-2.5'
          : 'bg-white/70 backdrop-blur-md border-b border-slate-200/50 py-3 sm:py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => handlePageClick('home')}
          className="flex items-center gap-3 group text-left"
        >
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200/80 p-2 shadow-sm transition-transform group-hover:scale-105">
            <Shield className="w-5 h-5 text-blue-600" />
            <Cpu className="w-2.5 h-2.5 text-indigo-600 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-600"></span>
            </span>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-display font-bold text-lg tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
                DeepGuard <span className="text-blue-600">AI</span>
              </span>
              <span className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                v4.8
              </span>
            </div>
            <span className="text-[10px] font-mono text-slate-500 tracking-wider">
              MEDIA FORENSICS CORE
            </span>
          </div>
        </button>

        {/* Center Desktop Navigation Pages */}
        <nav className="hidden lg:flex items-center gap-1 p-1 rounded-full bg-slate-100/90 border border-slate-200/90 backdrop-blur-md">
          {PAGES_LIST.map((page) => {
            const isActive = currentPage === page.id;
            return (
              <button
                key={page.id}
                onClick={() => handlePageClick(page.id)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-full transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white font-bold shadow-xs'
                    : 'text-slate-600 hover:text-blue-600 hover:bg-white'
                }`}
              >
                {page.title}
              </button>
            );
          })}
        </nav>

        {/* Right Action Area */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Status Indicator */}
          <div className="hidden xl:flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[11px] font-mono text-emerald-700">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
            </span>
            <Activity className="w-3 h-3" />
            <span>CORE ONLINE</span>
          </div>

          {/* Sound FX Toggle */}
          <button
            onClick={toggleSound}
            title={isMuted ? 'Enable UI Audio Feedback' : 'Mute UI Audio'}
            className="p-2 rounded-xl bg-slate-100 border border-slate-200 hover:border-blue-300 text-slate-500 hover:text-blue-600 transition-colors"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-blue-600 animate-pulse" />}
          </button>

          {/* Launch Detector Button */}
          <button
            onClick={() => {
              sounds.playBlip();
              onOpenScanner();
            }}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-sm hover:shadow-md hover:shadow-blue-500/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>Launch Detector</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-900"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/95 border-b border-slate-200 backdrop-blur-2xl px-4 pt-3 pb-6 animate-fadeIn shadow-xl">
          <div className="flex flex-col gap-1.5">
            {PAGES_LIST.map((page) => {
              const isActive = currentPage === page.id;
              return (
                <button
                  key={page.id}
                  onClick={() => handlePageClick(page.id)}
                  className={`text-left px-4 py-2.5 text-sm font-medium rounded-xl transition-colors flex items-center justify-between ${
                    isActive
                      ? 'bg-blue-600 text-white font-bold shadow-xs'
                      : 'text-slate-700 hover:bg-blue-50 hover:text-blue-700'
                  }`}
                >
                  <span>{page.title}</span>
                  {isActive && <span className="text-[10px] font-mono uppercase tracking-wider">ACTIVE</span>}
                </button>
              );
            })}

            <button
              onClick={() => {
                sounds.playBlip();
                onOpenScanner();
                setMobileMenuOpen(false);
              }}
              className="mt-3 flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/25"
            >
              <span>Launch Media Scanner</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

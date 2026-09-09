import React, { useState, useEffect } from 'react';
import { Shield, Cpu, Volume2, VolumeX, ArrowRight, Activity, Sun, Moon, ChevronRight } from 'lucide-react';
import { sounds } from '../utils/soundEffects';
import { PAGES_LIST, type PageId } from './PagePagination';
import { LiveTelemetryTicker } from './LiveTelemetryTicker';

interface NavbarProps {
  currentPage: PageId;
  theme?: 'light' | 'dark';
  onToggleTheme?: () => void;
  onNavigate: (page: PageId) => void;
  onOpenScanner: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  theme = 'light',
  onToggleTheme,
  onNavigate,
  onOpenScanner,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(sounds.isMuted);

  // Lock body scroll when mobile menu is open to ensure smooth experience
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Throttled scroll listener to prevent unnecessary re-renders
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrolled = window.scrollY > 20;
          setIsScrolled((prev) => (prev !== scrolled ? scrolled : prev));
          ticking = false;
        });
        ticking = true;
      }
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
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 shadow-xs">
      {/* Primary Navigation Row */}
      <div
        className={`transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl border-b border-slate-200/80 dark:border-slate-800/80 py-2.5'
            : 'bg-white/90 dark:bg-slate-950/90 backdrop-blur-md border-b border-slate-200/50 dark:border-slate-800/50 py-3 sm:py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
        <button
          onClick={() => handlePageClick('home')}
          className="flex items-center gap-3 group text-left"
          aria-label="DeepGuard AI Home"
        >
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-slate-800 border border-blue-200/80 dark:border-blue-500/30 p-2 shadow-xs transition-transform group-hover:scale-105">
            <Shield className="w-5 h-5 text-blue-600 dark:text-cyan-400" />
            <Cpu className="w-2.5 h-2.5 text-indigo-600 dark:text-indigo-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-600 dark:bg-cyan-400"></span>
            </span>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-display font-bold text-lg tracking-tight text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors">
                DeepGuard <span className="text-blue-600 dark:text-cyan-400">AI</span>
              </span>
              <span className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-cyan-300 border border-blue-200 dark:border-blue-800/60">
                v4.8
              </span>
            </div>
            <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 tracking-wider">
              MEDIA FORENSICS CORE
            </span>
          </div>
        </button>

        {/* Center Desktop Navigation Pages */}
        <nav className="hidden lg:flex items-center gap-1 p-1 rounded-full bg-slate-100/90 dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800 backdrop-blur-md shadow-2xs">
          {PAGES_LIST.map((page) => {
            const isActive = currentPage === page.id;
            return (
              <button
                key={page.id}
                onClick={() => handlePageClick(page.id)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-full transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold shadow-md shadow-blue-500/25 scale-[1.02]'
                    : 'text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-cyan-400 hover:bg-white dark:hover:bg-slate-800/80'
                }`}
              >
                {page.title}
              </button>
            );
          })}
        </nav>

        {/* Right Action Area */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Status Indicator */}
          <div className="hidden xl:flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/80 text-[11px] font-mono text-emerald-700 dark:text-emerald-400 shadow-2xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600 dark:bg-emerald-400"></span>
            </span>
            <Activity className="w-3 h-3" />
            <span>CORE ONLINE</span>
          </div>

          {/* Theme Toggle Button (Dark / Light Switch) */}
          {onToggleTheme && (
            <button
              onClick={() => {
                sounds.playBlip();
                onToggleTheme();
              }}
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              aria-label={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-cyan-400 text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-cyan-400 transition-all transform hover:scale-105 active:scale-95 shadow-2xs"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400 transition-transform duration-300 rotate-0 hover:rotate-45" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700 hover:text-indigo-600 transition-transform duration-300 rotate-0 hover:-rotate-12" />
              )}
            </button>
          )}

          {/* Sound FX Toggle */}
          <button
            onClick={toggleSound}
            title={isMuted ? 'Enable UI Audio Feedback' : 'Mute UI Audio'}
            aria-label={isMuted ? 'Enable UI Audio Feedback' : 'Mute UI Audio'}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-cyan-400 text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors shadow-2xs"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-blue-600 dark:text-cyan-400 animate-pulse" />}
          </button>

          {/* Launch Detector Button */}
          <button
            onClick={() => {
              sounds.playBlip();
              onOpenScanner();
            }}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-sm hover:shadow-md hover:shadow-blue-500/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>Launch Detector</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          {/* Mobile Menu Button (3 slides/bars) */}
          <button
            onClick={() => {
              sounds.playBlip();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className={`lg:hidden p-2.5 rounded-xl border transition-all duration-200 active:scale-90 shadow-2xs ${
              mobileMenuOpen
                ? 'bg-blue-50 dark:bg-blue-950/70 border-blue-300 dark:border-blue-700 text-blue-600 dark:text-cyan-400'
                : 'bg-slate-100 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            <div className="relative w-5 h-4 flex flex-col justify-between items-center pointer-events-none">
              <span
                className={`h-0.5 w-5 bg-current rounded-full transform transition-all duration-300 ease-out origin-center ${
                  mobileMenuOpen ? 'translate-y-[7px] rotate-45' : 'translate-y-0 rotate-0'
                }`}
              />
              <span
                className={`h-0.5 w-5 bg-current rounded-full transition-all duration-200 ease-out ${
                  mobileMenuOpen ? 'opacity-0 scale-x-0' : 'opacity-100 scale-x-100'
                }`}
              />
              <span
                className={`h-0.5 w-5 bg-current rounded-full transform transition-all duration-300 ease-out origin-center ${
                  mobileMenuOpen ? '-translate-y-[7px] -rotate-45' : 'translate-y-0 rotate-0'
                }`}
              />
            </div>
          </button>
        </div>
      </div>
    </div>

    {/* Operational Status Ticker (The Black Bar) */}
    <LiveTelemetryTicker />

    {/* Atmospheric Backdrop Overlay (Dims background page when mobile menu is open) */}
    <div
      onClick={() => {
        sounds.playBlip();
        setMobileMenuOpen(false);
      }}
      className={`fixed inset-0 top-0 z-30 bg-slate-950/50 dark:bg-slate-950/75 backdrop-blur-xs transition-opacity duration-300 lg:hidden ${
        mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
      aria-hidden="true"
    />

    {/* Mobile Menu Drawer (Solid background, crisp card items, silky GPU transform animation) */}
    <div
      className={`lg:hidden absolute top-full left-0 right-0 z-40 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 shadow-2xl shadow-slate-900/20 dark:shadow-black/70 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] transform origin-top ${
        mobileMenuOpen
          ? 'opacity-100 translate-y-0 visible pointer-events-auto scale-y-100'
          : 'opacity-0 -translate-y-2.5 invisible pointer-events-none scale-y-95'
      }`}
      style={{ willChange: 'transform, opacity' }}
    >
      <div className="max-h-[calc(100vh-100px)] overflow-y-auto overscroll-contain px-4 pt-3.5 pb-6 flex flex-col gap-2 no-scrollbar">
        {PAGES_LIST.map((page) => {
          const isActive = currentPage === page.id;
          return (
            <button
              key={page.id}
              onClick={() => handlePageClick(page.id)}
              className={`text-left px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-150 flex items-center justify-between active:scale-[0.98] ${
                isActive
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold shadow-md shadow-blue-500/25'
                  : 'bg-slate-50 dark:bg-slate-900/80 border border-slate-200/90 dark:border-slate-800 text-slate-800 dark:text-slate-200 hover:bg-blue-50/80 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-cyan-400 active:bg-blue-100/70 dark:active:bg-slate-800'
              }`}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`w-2 h-2 rounded-full shrink-0 ${
                    isActive ? 'bg-white shadow-[0_0_8px_white]' : 'bg-blue-600 dark:bg-cyan-400 opacity-80'
                  }`}
                />
                <span className="tracking-tight">{page.title}</span>
              </div>
              {isActive ? (
                <span className="text-[10px] font-mono uppercase tracking-wider bg-white/20 text-white px-2.5 py-0.5 rounded-full font-bold">
                  ACTIVE
                </span>
              ) : (
                <ChevronRight className="w-4 h-4 text-slate-400 dark:text-slate-500 shrink-0" />
              )}
            </button>
          );
        })}

        {/* Mobile Theme Switch Row */}
        {onToggleTheme && (
          <div className="mt-1 pt-3 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between px-2 py-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                Appearance
              </span>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-850 text-blue-600 dark:text-cyan-400 border border-slate-200 dark:border-slate-750">
                {theme === 'dark' ? 'DARK MODE' : 'LIGHT MODE'}
              </span>
            </div>
            <button
              onClick={() => {
                sounds.playBlip();
                onToggleTheme();
              }}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono font-bold text-slate-800 dark:text-slate-200 shadow-2xs hover:border-blue-300 dark:hover:border-cyan-500 active:scale-95 transition-all"
            >
              {theme === 'dark' ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-500 fill-amber-500/20" />
                  <span>Dark Mode</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-slate-700 fill-slate-700/10" />
                  <span>Light Mode</span>
                </>
              )}
            </button>
          </div>
        )}

        {/* Launch Scanner CTA */}
        <button
          onClick={() => {
            sounds.playBlip();
            onOpenScanner();
            setMobileMenuOpen(false);
          }}
          className="mt-2 flex items-center justify-center gap-2.5 px-4 py-3.5 rounded-xl text-sm font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:to-indigo-800 text-white shadow-lg shadow-blue-500/25 active:scale-[0.98] transition-all"
        >
          <span>Launch Media Scanner</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        {/* Status indicator */}
        <div className="mt-1 flex items-center justify-center gap-2 text-[11px] font-mono text-slate-500 dark:text-slate-400 py-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>DeepGuard AI v4.8 • Core Systems Live</span>
        </div>
      </div>
    </div>
    </header>
  );
};

import { useState, useEffect } from 'react';
import { SAMPLE_MEDIA } from './data/mockData';
import type { MediaSample } from './types';
import { Navbar } from './components/Navbar';
import { LoadingScreen } from './components/LoadingScreen';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { LiveTelemetryTicker } from './components/LiveTelemetryTicker';
import { HeroSection } from './components/Hero/HeroSection';
import { LiveThreatRadar } from './components/Hero/LiveThreatRadar';
import { TrustStrip } from './components/TrustStrip';
import { ProblemSection } from './components/ProblemSection';
import { TrustSecurity } from './components/TrustSecurity';
import { HowItWorks } from './components/HowItWorks';
import { MediaScanner } from './components/Scanner/MediaScanner';
import { ForensicReport } from './components/Report/ForensicReport';
import { TechSection } from './components/Technology/TechSection';
import { Applications } from './components/Applications';
import { CustomerStories } from './components/CustomerStories';
import { DashboardPreview } from './components/Dashboard/DashboardPreview';
import { WhyDeepGuard } from './components/WhyDeepGuard';
import { CTASection } from './components/CTASection';
import { FloatingQuickNav } from './components/FloatingQuickNav';
import { Footer } from './components/Footer';
import { PagePagination, PAGES_LIST, type PageId } from './components/PagePagination';
import { sounds } from './utils/soundEffects';

export function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activeSample, setActiveSample] = useState<MediaSample>(SAMPLE_MEDIA[0]);
  const [scannerTriggerCount, setScannerTriggerCount] = useState<number>(0);

  // Persistent Dark / Light Theme State
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('deepguard-theme');
      if (saved === 'dark' || saved === 'light') return saved;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });

  // Sync theme class to <html> root element
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('deepguard-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    sounds.playBlip();
    setTheme((t) => (t === 'dark' ? 'light' : 'dark'));
  };

  // Always reset to 'home' on reload / initial launch
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    setCurrentPage('home');
    if (window.location.hash && window.location.hash !== '#home') {
      window.history.replaceState(null, '', window.location.pathname + '#home');
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as PageId;
      if (PAGES_LIST.some((p) => p.id === hash)) {
        setCurrentPage(hash);
      } else if (!hash || hash === 'home') {
        setCurrentPage('home');
      }
    };

    const handleBeforeUnload = () => {
      window.history.replaceState(null, '', window.location.pathname + '#home');
    };

    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const handleNavigate = (page: PageId) => {
    setCurrentPage(page);
    window.location.hash = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLaunchAnalysis = () => {
    handleNavigate('scanner');
    setScannerTriggerCount((c) => c + 1);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#060913] text-slate-900 dark:text-slate-100 selection:bg-blue-500/20 dark:selection:bg-cyan-500/30 selection:text-blue-700 dark:selection:text-cyan-300 font-sans relative overflow-x-hidden flex flex-col justify-between transition-colors duration-300">
      {/* Scroll Progress Neon Gradient Bar */}
      <ScrollProgressBar />

      {/* High-Tech AI Biometric Boot / Loading Screen on Site Open */}
      {isLoading && (
        <LoadingScreen onComplete={() => setIsLoading(false)} />
      )}

      {/* 100% GPU-Accelerated Hardware Composite Background Layer */}
      <div className="fixed inset-0 pointer-events-none -z-10 transform-gpu overflow-hidden will-change-transform">
        <img
          src="/images/bg-cyber-network.jpg"
          alt=""
          className="w-full h-full object-cover opacity-20 dark:opacity-10 transform-gpu"
          loading="eager"
        />
        {/* Soft Radial Gradient Wash for Contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/85 via-white/60 to-white/90 dark:from-[#060913]/90 dark:via-[#060913]/75 dark:to-[#060913]/95" />
      </div>

      {/* Global Navbar */}
      <Navbar
        currentPage={currentPage}
        theme={theme}
        onToggleTheme={toggleTheme}
        onNavigate={handleNavigate}
        onOpenScanner={handleLaunchAnalysis}
      />

      {/* Main Page Container */}
      <main className="relative z-10 pt-16 sm:pt-20 flex-1">
        {/* Real-Time Operational Telemetry Ticker */}
        <LiveTelemetryTicker />

        {/* ========================================================================= */}
        {/* PAGE 1: HOME (Hero, Live Threat Radar, Trust Strip, Threat Comparison)  */}
        {/* ========================================================================= */}
        {currentPage === 'home' && (
          <div key="home" className="page-transition">
            <HeroSection
              onAnalyzeClick={handleLaunchAnalysis}
              onExploreTechClick={() => handleNavigate('technology')}
            />
            <LiveThreatRadar />
            <TrustStrip />
            <ProblemSection />
            <TrustSecurity />
          </div>
        )}

        {/* ========================================================================= */}
        {/* PAGE 2: TECHNOLOGY (Algorithmic CNN/SVM Architecture & 5-Stage Pipeline) */}
        {/* ========================================================================= */}
        {currentPage === 'technology' && (
          <div key="technology" className="page-transition">
            <TechSection />
            <HowItWorks />
          </div>
        )}

        {/* ========================================================================= */}
        {/* PAGE 3: SCANNER (Dedicated Interactive AI Biometric Inspection Lab)      */}
        {/* ========================================================================= */}
        {currentPage === 'scanner' && (
          <div key="scanner" className="page-transition">
            <MediaScanner
              autoTriggerCount={scannerTriggerCount}
              onScanComplete={(sample) => setActiveSample(sample)}
              onViewReport={() => handleNavigate('forensics')}
            />
          </div>
        )}

        {/* ========================================================================= */}
        {/* PAGE 4: FORENSICS (Explainable AI Dossier, ELA Heatmap, Biometric Metrics)*/}
        {/* ========================================================================= */}
        {currentPage === 'forensics' && (
          <div key="forensics" className="page-transition">
            <ForensicReport sample={activeSample} />
          </div>
        )}

        {/* ========================================================================= */}
        {/* PAGE 5: APPLICATIONS (5 Mission-Critical Enterprise Trust Sectors)        */}
        {/* ========================================================================= */}
        {currentPage === 'applications' && (
          <div key="applications" className="page-transition">
            <Applications />
          </div>
        )}

        {/* ========================================================================= */}
        {/* PAGE 6: CASE STUDIES (Field-Proven Customer Stories & DeepGuard Advantage)*/}
        {/* ========================================================================= */}
        {currentPage === 'case-studies' && (
          <div key="case-studies" className="page-transition">
            <CustomerStories />
            <WhyDeepGuard />
          </div>
        )}

        {/* ========================================================================= */}
        {/* PAGE 7: DASHBOARD (Fleet Command Center, Live Threat Matrix, Final CTA)  */}
        {/* ========================================================================= */}
        {currentPage === 'dashboard' && (
          <div key="dashboard" className="page-transition">
            <DashboardPreview />
            <CTASection
              onLaunchScanner={handleLaunchAnalysis}
              onExploreTech={() => handleNavigate('technology')}
            />
          </div>
        )}
      </main>

      {/* Interactive Bottom Page Tour / Stepper Navigation */}
      <PagePagination currentPage={currentPage} onNavigate={handleNavigate} />

      {/* Global Enterprise Footer */}
      <Footer onNavigate={handleNavigate} onRebootBootScreen={() => setIsLoading(true)} />

      {/* Floating Bottom Navigation */}
      <FloatingQuickNav currentPage={currentPage} onNavigate={handleNavigate} />
    </div>
  );
}

export default App;

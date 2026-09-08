import { useState, useEffect } from 'react';
import { SAMPLE_MEDIA } from './data/mockData';
import type { MediaSample } from './types';
import { Navbar } from './components/Navbar';
import { LoadingScreen } from './components/LoadingScreen';
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
import { Footer } from './components/Footer';
import { PAGES_LIST, type PageId } from './components/PagePagination';

export function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activeSample, setActiveSample] = useState<MediaSample>(SAMPLE_MEDIA[0]);
  const [scannerTriggerCount, setScannerTriggerCount] = useState<number>(0);

  // Always reset to 'home' on reload / initial launch
  useEffect(() => {
    // 1. Prevent browser from remembering previous scroll position on reload
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // 2. Always force Home page on reload / initial launch
    setCurrentPage('home');
    if (window.location.hash && window.location.hash !== '#home') {
      window.history.replaceState(null, '', window.location.pathname + '#home');
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

    // 3. Listen for subsequent user hash changes (navigating via back/forward buttons or links)
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as PageId;
      if (PAGES_LIST.some((p) => p.id === hash)) {
        setCurrentPage(hash);
      } else if (!hash || hash === 'home') {
        setCurrentPage('home');
      }
    };

    // 4. Ensure hash resets to #home if user triggers reload
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
    <div className="min-h-screen bg-white text-slate-900 selection:bg-blue-500/20 selection:text-blue-700 font-sans relative overflow-x-hidden flex flex-col justify-between">
      {/* High-Tech AI Biometric Boot / Loading Screen on Site Open */}
      {isLoading && (
        <LoadingScreen onComplete={() => setIsLoading(false)} />
      )}

      {/* 100% GPU-Accelerated Hardware Composite Background Layer */}
      <div className="fixed inset-0 pointer-events-none -z-10 transform-gpu overflow-hidden will-change-transform">
        <img
          src="/images/bg-cyber-network.jpg"
          alt=""
          className="w-full h-full object-cover opacity-20 transform-gpu"
          loading="eager"
        />
        {/* Soft Radial Gradient Light Wash for Readability & Contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/85 via-white/60 to-white/90" />
      </div>

      {/* Global Navbar */}
      <Navbar
        currentPage={currentPage}
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
          <div className="animate-fade-in">
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
          <div className="animate-fade-in">
            <TechSection />
            <HowItWorks />
          </div>
        )}

        {/* ========================================================================= */}
        {/* PAGE 3: SCANNER (Dedicated Interactive AI Biometric Inspection Lab)      */}
        {/* ========================================================================= */}
        {currentPage === 'scanner' && (
          <div className="animate-fade-in">
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
          <div className="animate-fade-in">
            <ForensicReport sample={activeSample} />
          </div>
        )}

        {/* ========================================================================= */}
        {/* PAGE 5: APPLICATIONS (5 Mission-Critical Enterprise Trust Sectors)        */}
        {/* ========================================================================= */}
        {currentPage === 'applications' && (
          <div className="animate-fade-in">
            <Applications />
          </div>
        )}

        {/* ========================================================================= */}
        {/* PAGE 6: CASE STUDIES (Field-Proven Customer Stories & DeepGuard Advantage)*/}
        {/* ========================================================================= */}
        {currentPage === 'case-studies' && (
          <div className="animate-fade-in">
            <CustomerStories />
            <WhyDeepGuard />
          </div>
        )}

        {/* ========================================================================= */}
        {/* PAGE 7: DASHBOARD (Fleet Command Center, Live Threat Matrix, Final CTA)  */}
        {/* ========================================================================= */}
        {currentPage === 'dashboard' && (
          <div className="animate-fade-in">
            <DashboardPreview />
            <CTASection
              onLaunchScanner={handleLaunchAnalysis}
              onExploreTech={() => handleNavigate('technology')}
            />
          </div>
        )}
      </main>

      {/* Global Enterprise Footer */}
      <Footer onRebootBootScreen={() => setIsLoading(true)} />
    </div>
  );
}

export default App;

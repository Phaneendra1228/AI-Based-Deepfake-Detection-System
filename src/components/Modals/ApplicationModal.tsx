import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, CheckCircle2, ArrowRight, ShieldCheck, Cpu, Lock, Sparkles, FileText, Download } from 'lucide-react';
import { sounds } from '../../utils/soundEffects';

export interface ApplicationData {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  badge: string;
  badgeColor: string;
  metric: string;
  sampleId: string;
  threatModel: string;
  aiDefense: string[];
  compliance: string[];
  specs: { label: string; value: string }[];
}

interface ApplicationModalProps {
  app: ApplicationData | null;
  onClose: () => void;
  onTestInScanner: (sampleId: string) => void;
}

export const ApplicationModal: React.FC<ApplicationModalProps> = ({ app, onClose, onTestInScanner }) => {
  useEffect(() => {
    if (!app) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [app, onClose]);

  if (!app || typeof document === 'undefined') return null;

  const handleClose = () => {
    sounds.playBlip();
    onClose();
  };

  const handleLaunch = () => {
    sounds.playBlip();
    onClose();
    onTestInScanner(app.sampleId);
  };

  const handleExportBrief = () => {
    sounds.playComplete();
    const briefContent = `================================================================================
DEEPGUARD AI • ENTERPRISE SECTOR ARCHITECTURE SPECIFICATION
================================================================================
Sector: ${app.title}
Solution: ${app.subtitle}
Verification Standard: ${app.badge}
Operational Benchmark: ${app.metric}
Generated: ${new Date().toISOString()}
Cryptographic Fingerprint: SHA-256 (FIPS 140-3 Validated)
--------------------------------------------------------------------------------
THREAT VECTOR & ADVERSARIAL MODEL:
${app.threatModel}
--------------------------------------------------------------------------------
DEEPGUARD MULTI-LAYER NEURAL DEFENSE:
${app.aiDefense.map((d, i) => `[${i + 1}] ${d}`).join('\n')}
--------------------------------------------------------------------------------
REGULATORY COMPLIANCE & ACCREDITATIONS:
${app.compliance.map((c) => `• ${c}`).join('\n')}
--------------------------------------------------------------------------------
TECHNICAL SPECIFICATIONS:
${app.specs.map((s) => `${s.label.padEnd(28)}: ${s.value}`).join('\n')}
================================================================================
CONFIDENTIAL • FOR INTERNAL AUDIT AND FORENSIC VERIFICATION USE ONLY
================================================================================`;

    const blob = new Blob([briefContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `DeepGuard_${app.id}_Specification_Brief.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="app-modal-title"
      className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-6 bg-slate-950/75 backdrop-blur-md overflow-y-auto"
      onClick={handleClose}
    >
      <div
        className="relative w-full max-w-3xl my-auto rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden text-slate-800 dark:text-slate-100 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Banner Header Image with Technical HUD */}
        <div className="relative h-48 sm:h-56 w-full bg-slate-950 overflow-hidden shrink-0">
          <img
            src={app.image}
            alt={app.subtitle}
            className="w-full h-full object-cover opacity-60 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-slate-900 via-slate-950/40 to-transparent" />

          {/* Close Button */}
          <button
            onClick={handleClose}
            aria-label="Close dialog"
            className="absolute top-4 right-4 p-2.5 rounded-xl bg-slate-900/80 border border-white/20 text-white hover:bg-slate-800 transition-colors z-20 backdrop-blur-md shadow-lg"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Sector Badge */}
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-blue-600/90 text-white border border-blue-400/50 backdrop-blur-md shadow-md">
              {app.title}
            </span>
            <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-slate-900/80 text-cyan-300 border border-cyan-400/40 backdrop-blur-md">
              {app.badge}
            </span>
          </div>

          {/* Bottom Banner Title */}
          <div className="absolute bottom-3 left-4 right-4 text-white">
            <h2 id="app-modal-title" className="font-display font-bold text-xl sm:text-2xl drop-shadow-md">
              {app.subtitle}
            </h2>
            <p className="text-xs sm:text-sm text-slate-200 mt-1 drop-shadow line-clamp-1">
              {app.description}
            </p>
          </div>
        </div>

        {/* Scrollable Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 flex-1 text-sm">
          
          {/* Performance Highlight KPI Card */}
          <div className="p-4 rounded-2xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800/60 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/30 shrink-0">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-mono text-blue-700 dark:text-cyan-300 font-bold uppercase tracking-wider">
                  Operational Benchmark
                </div>
                <div className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                  {app.metric}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 font-mono text-xs font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Zero-Day Resistant</span>
            </div>
          </div>

          {/* Adversarial Threat Model */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
            <h3 className="text-xs font-mono font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
              Threat Model & Attack Vector
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {app.threatModel}
            </p>
          </div>

          {/* DeepGuard Neural Defense Architecture */}
          <div>
            <h3 className="text-xs font-mono font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-2.5 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-600 dark:text-cyan-400" />
              DeepGuard Multi-Layer Neural Defense
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {app.aiDefense.map((defense) => (
                <div
                  key={defense}
                  className="p-3 rounded-xl bg-white dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 flex items-start gap-2.5 shadow-2xs"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-xs text-slate-700 dark:text-slate-300 font-medium">
                    {defense}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Specifications Grid */}
          <div>
            <h3 className="text-xs font-mono font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-2 flex items-center gap-2">
              <FileText className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              Technical Specifications
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center">
              {app.specs.map((spec) => (
                <div
                  key={spec.label}
                  className="p-3 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-750 shadow-2xs"
                >
                  <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase">
                    {spec.label}
                  </div>
                  <div className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white mt-0.5">
                    {spec.value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Compliance & Certifications */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400">Accreditations:</span>
            {app.compliance.map((c) => (
              <span
                key={c}
                className="px-2.5 py-1 rounded-lg text-xs font-mono bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
              >
                <Lock className="w-3 h-3 inline mr-1 text-slate-400" />
                {c}
              </span>
            ))}
          </div>
        </div>

        {/* Modal Action Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/80 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <button
            onClick={handleExportBrief}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-mono font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shadow-2xs active:scale-95"
          >
            <Download className="w-4 h-4 text-blue-600 dark:text-cyan-400" />
            <span>Download Spec Sheet</span>
          </button>

          <button
            onClick={handleLaunch}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md shadow-blue-500/25 transition-all transform hover:-translate-y-0.5 active:scale-95"
          >
            <span>Test This Vector in Scanner</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

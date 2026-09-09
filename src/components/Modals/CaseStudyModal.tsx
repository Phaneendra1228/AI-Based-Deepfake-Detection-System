import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, ShieldCheck, Quote, ArrowRight, Download, Award, AlertTriangle, CheckCircle2, ShieldAlert } from 'lucide-react';
import { sounds } from '../../utils/soundEffects';

export interface CaseStudyData {
  id: string;
  sector: string;
  institution: string;
  headline: string;
  quote: string;
  officer: string;
  metric: string;
  metricLabel: string;
  verified: string;
  tagColor: string;
  sampleId: string;
  attackVector: string;
  interceptionDetail: string;
  operationalOutcome: string;
  forensicEvidence: string[];
}

interface CaseStudyModalProps {
  story: CaseStudyData | null;
  onClose: () => void;
  onTestInScanner: (sampleId: string) => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({ story, onClose, onTestInScanner }) => {
  useEffect(() => {
    if (!story) return;

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
  }, [story, onClose]);

  if (!story || typeof document === 'undefined') return null;

  const handleClose = () => {
    sounds.playBlip();
    onClose();
  };

  const handleReplicate = () => {
    sounds.playBlip();
    onClose();
    onTestInScanner(story.sampleId);
  };

  const handleExportReport = () => {
    sounds.playComplete();
    const reportContent = `================================================================================
DEEPGUARD AI • ADVERSARIAL INCIDENT AUDIT & CASE STUDY REPORT
================================================================================
Case Reference: ${story.id.toUpperCase()}
Institution: ${story.institution}
Sector: ${story.sector}
Accreditation: ${story.verified}
Generated: ${new Date().toISOString()}
Verification Standard: ISO/IEC 27037 Digital Evidence Admissibility
--------------------------------------------------------------------------------
EXECUTIVE INCIDENT HEADLINE:
${story.headline}
--------------------------------------------------------------------------------
QUANTIFIED OPERATIONAL IMPACT:
${story.metric} • ${story.metricLabel}
--------------------------------------------------------------------------------
INCIDENT TIMELINE & ATTACK RECONSTRUCTION:
[01. INGESTION & ATTACK VECTOR]
${story.attackVector}

[02. REAL-TIME NEURAL INTERCEPTION]
${story.interceptionDetail}

[03. OPERATIONAL MITIGATION & RESOLUTION]
${story.operationalOutcome}
--------------------------------------------------------------------------------
SUBMITTED FORENSIC ARTIFACTS:
${story.forensicEvidence.map((e, i) => `[Artifact ${i + 1}] ${e}`).join('\n')}
--------------------------------------------------------------------------------
VERIFIED STATEMENT:
"${story.quote}"
— ${story.officer}, ${story.institution}
================================================================================
CRYPTOGRAPHIC AUDIT SEAL: SHA-256 (VALIDATED BY DEEPGUARD FORENSIC CORE v4.8)
================================================================================`;

    const blob = new Blob([reportContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `DeepGuard_${story.id}_Incident_Audit_Report.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-modal-title"
      className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-6 bg-slate-950/75 backdrop-blur-md overflow-y-auto"
      onClick={handleClose}
    >
      <div
        className="relative w-full max-w-3xl my-auto rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-8 text-slate-800 dark:text-slate-100 max-h-[92vh] overflow-y-auto flex flex-col justify-between"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors z-20"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className={`px-2.5 py-1 rounded-md text-[10px] font-mono font-bold border ${story.tagColor} dark:bg-slate-800 dark:border-slate-700`}>
              {story.sector}
            </span>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 font-mono text-xs font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{story.verified}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-4 pb-4 border-b border-slate-100 dark:border-slate-800">
            <div>
              <div className="text-xs font-mono text-slate-500 dark:text-slate-400">
                Case Study Brief • {story.institution}
              </div>
              <h2 id="case-modal-title" className="font-display font-bold text-xl sm:text-2xl text-slate-900 dark:text-white mt-1">
                {story.headline}
              </h2>
            </div>
            <div className="text-left sm:text-right shrink-0">
              <div className="font-display font-extrabold text-3xl sm:text-4xl text-blue-600 dark:text-cyan-400">
                {story.metric}
              </div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">
                {story.metricLabel}
              </div>
            </div>
          </div>

          {/* Testimonial Quote Callout */}
          <div className="relative p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 mb-6">
            <Quote className="w-6 h-6 text-blue-500/20 dark:text-cyan-400/20 absolute top-3 left-3 pointer-events-none" />
            <p className="text-sm sm:text-base text-slate-700 dark:text-slate-200 italic leading-relaxed pl-4">
              "{story.quote}"
            </p>
            <div className="mt-3 pl-4 flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-900 dark:text-white">
                — {story.officer}
              </span>
              <span className="font-mono text-slate-500 dark:text-slate-400 text-[11px]">
                {story.institution}
              </span>
            </div>
          </div>

          {/* 3-Step Incident Timeline */}
          <div className="space-y-3 mb-6">
            <h3 className="text-xs font-mono font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-2 flex items-center gap-2">
              <Award className="w-4 h-4 text-blue-600 dark:text-cyan-400" />
              Incident Timeline & Anatomy of Defense
            </h3>

            {/* Step 1 */}
            <div className="p-3.5 rounded-xl bg-white dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 flex items-start gap-3 shadow-2xs">
              <div className="w-6 h-6 rounded-lg bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800 flex items-center justify-center text-xs font-mono font-bold shrink-0 mt-0.5">
                01
              </div>
              <div>
                <div className="text-xs font-mono font-bold text-rose-600 dark:text-rose-400 uppercase">
                  Adversarial Spoof Attempt
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5 leading-relaxed">
                  {story.attackVector}
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="p-3.5 rounded-xl bg-white dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 flex items-start gap-3 shadow-2xs">
              <div className="w-6 h-6 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-cyan-400 border border-blue-200 dark:border-blue-800 flex items-center justify-center text-xs font-mono font-bold shrink-0 mt-0.5">
                02
              </div>
              <div>
                <div className="text-xs font-mono font-bold text-blue-600 dark:text-cyan-400 uppercase">
                  DeepGuard Multi-Layer Neural Interception
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5 leading-relaxed">
                  {story.interceptionDetail}
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="p-3.5 rounded-xl bg-white dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 flex items-start gap-3 shadow-2xs">
              <div className="w-6 h-6 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-xs font-mono font-bold shrink-0 mt-0.5">
                03
              </div>
              <div>
                <div className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase">
                  Institutional Resolution & Impact
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5 leading-relaxed">
                  {story.operationalOutcome}
                </p>
              </div>
            </div>
          </div>

          {/* Forensic Evidence Checklist */}
          <div>
            <h3 className="text-xs font-mono font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-2 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              Verified Cryptographic Evidence Artifacts
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {story.forensicEvidence.map((evidence) => (
                <div
                  key={evidence}
                  className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-750 flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 font-mono shadow-2xs"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span className="truncate">{evidence}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Action Footer */}
        <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={handleExportReport}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-mono font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shadow-2xs active:scale-95"
          >
            <Download className="w-4 h-4 text-blue-600 dark:text-cyan-400" />
            <span>Download Incident Report</span>
          </button>

          <button
            onClick={handleReplicate}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md shadow-blue-500/25 transition-all transform hover:-translate-y-0.5 active:scale-95"
          >
            <span>Replicate Threat in Scanner</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

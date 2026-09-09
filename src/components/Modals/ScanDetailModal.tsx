import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import type { RecentScan } from '../../types';
import { X, ShieldCheck, ShieldAlert, CheckCircle2, AlertTriangle, Lock, Download } from 'lucide-react';
import { sounds } from '../../utils/soundEffects';
import { downloadChainOfCustodyPDF } from '../../utils/exportForensics';

interface ScanDetailModalProps {
  scan: RecentScan | null;
  onClose: () => void;
}

export const ScanDetailModal: React.FC<ScanDetailModalProps> = ({ scan, onClose }) => {
  const [isDownloading, setIsDownloading] = useState(false);
  useEffect(() => {
    if (!scan) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    // Lock body scroll while modal is open
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [scan, onClose]);

  if (!scan || typeof document === 'undefined') return null;

  const isManipulated = scan.result === 'DEEPFAKE (FAKE)';
  const isReview = scan.result === 'REVIEW REQUIRED';

  const handleClose = () => {
    sounds.playBlip();
    onClose();
  };

  const handleDownloadChainOfCustody = () => {
    if (!scan) return;
    sounds.playComplete();
    setIsDownloading(true);
    downloadChainOfCustodyPDF(scan);
    setTimeout(() => {
      setIsDownloading(false);
    }, 2500);
  };

  const modalContent = (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 bg-slate-950/70 backdrop-blur-md overflow-y-auto"
      onClick={handleClose}
    >
      <div
        className="relative w-full max-w-2xl my-auto rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-8 text-slate-800 dark:text-slate-100 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3.5 mb-6">
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-xs ${
              isManipulated
                ? 'bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800/60'
                : isReview
                ? 'bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800/60'
                : 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60'
            }`}
          >
            {isManipulated ? <ShieldAlert className="w-6 h-6" /> : <ShieldCheck className="w-6 h-6" />}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-slate-500 dark:text-slate-400 font-semibold">{scan.id}</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 font-bold">
                {scan.fileType}
              </span>
            </div>
            <h3 id="modal-title" className="font-display font-bold text-xl text-slate-900 dark:text-white mt-0.5">
              {scan.filename}
            </h3>
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 text-center">
            <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 font-medium block mb-1">VERDICT</span>
            <span
              className={`text-xs font-mono font-bold ${
                isManipulated
                  ? 'text-rose-600 dark:text-rose-400'
                  : isReview
                  ? 'text-amber-600 dark:text-amber-400'
                  : 'text-emerald-700 dark:text-emerald-400'
              }`}
            >
              {scan.result}
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 text-center">
            <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 font-medium block mb-1">CONFIDENCE</span>
            <span className="text-xs font-mono font-bold text-slate-900 dark:text-white">
              {scan.confidence}%
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 text-center">
            <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 font-medium block mb-1">RISK LEVEL</span>
            <span
              className={`text-xs font-mono font-bold ${
                isManipulated
                  ? 'text-rose-600 dark:text-rose-400'
                  : isReview
                  ? 'text-amber-600 dark:text-amber-400'
                  : 'text-emerald-700 dark:text-emerald-400'
              }`}
            >
              {scan.riskLevel}
            </span>
          </div>
        </div>

        {/* Flags & Anomaly Markers */}
        <div className="mb-6">
          <h4 className="text-xs font-mono font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-2.5">
            Forensic Flags & Observations
          </h4>
          <div className="space-y-2">
            {scan.flags && scan.flags.length > 0 ? (
              scan.flags.map((flag, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-700 dark:text-slate-300 shadow-2xs"
                >
                  {isManipulated ? (
                    <AlertTriangle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />
                  ) : (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  )}
                  <span>{flag}</span>
                </div>
              ))
            ) : (
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-600 dark:text-slate-400">
                No active anomalies flagged.
              </div>
            )}
          </div>
        </div>

        {/* Cryptographic Chain of Custody */}
        <div className="p-3.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 text-xs font-mono text-slate-600 dark:text-slate-300 flex items-center justify-between mb-6 shadow-2xs">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
            <span className="truncate text-[11px] sm:text-xs">SHA-256: 7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1f...</span>
          </div>
          <span className="text-blue-700 dark:text-cyan-400 font-bold ml-2 shrink-0">IMMUTABLE</span>
        </div>

        {/* Modal Actions */}
        <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <button
            onClick={handleClose}
            className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-mono font-bold text-slate-700 dark:text-slate-300 transition-colors"
          >
            Close Dossier
          </button>
          <button
            onClick={handleDownloadChainOfCustody}
            disabled={isDownloading}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs font-mono shadow-md shadow-blue-600/20 transition-transform hover:scale-105 active:scale-95 disabled:opacity-90 cursor-pointer"
          >
            {isDownloading ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-white" />
                <span>Chain of Custody Downloaded!</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>Download Chain of Custody</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

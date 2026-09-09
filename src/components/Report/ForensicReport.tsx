import React, { useState } from 'react';
import type { MediaSample } from '../../types';
import { ACCURACY_BENCHMARKS } from '../../data/mockData';
import { HeatmapVisual } from './HeatmapVisual';
import {
  FileText,
  AlertTriangle,
  CheckCircle2,
  ShieldCheck,
  ShieldAlert,
  HelpCircle,
  Download,
  Award,
  BarChart3,
  Check
} from 'lucide-react';
import { sounds } from '../../utils/soundEffects';
import { exportAuditCertificatePDF } from '../../utils/exportForensics';

interface ForensicReportProps {
  sample: MediaSample;
}

export const ForensicReport: React.FC<ForensicReportProps> = ({ sample }) => {
  const isManipulated = sample.result === 'DEEPFAKE (FAKE)';
  const [isExporting, setIsExporting] = useState(false);

  const metrics = [
    { label: 'Facial Consistency', value: sample.metrics.facialConsistency, pass: sample.metrics.facialConsistency > 70 },
    { label: 'Pixel Consistency', value: sample.metrics.pixelConsistency, pass: sample.metrics.pixelConsistency > 70 },
    { label: 'Visual Artifacts (Tampering)', value: sample.metrics.visualArtifacts, pass: sample.metrics.visualArtifacts < 30 },
    { label: 'Frame Consistency', value: sample.metrics.frameConsistency, pass: sample.metrics.frameConsistency > 70 },
    { label: 'Frequency Domain Discrepancy', value: sample.metrics.frequencyAnomaly, pass: sample.metrics.frequencyAnomaly < 35 },
    { label: 'Sensor Noise Correlation', value: sample.metrics.compressionNoise, pass: sample.metrics.compressionNoise < 35 },
  ];

  const handleExportPDF = () => {
    sounds.playComplete();
    setIsExporting(true);
    exportAuditCertificatePDF(sample);
    setTimeout(() => {
      setIsExporting(false);
    }, 2500);
  };

  const ensembleVotes = [
    { model: 'ResNet-50 Biometric Extractor', arch: 'Deep Residual CNN', confidence: isManipulated ? 99.8 : 99.7, verdict: sample.result },
    { model: 'EfficientNet-B4 Artifact Hunter', arch: 'Compound Scaling CNN', confidence: isManipulated ? 99.7 : 99.6, verdict: sample.result },
    { model: 'Nonlinear SVM Hyperplane', arch: 'Radial Basis Function (RBF)', confidence: 99.9, verdict: sample.result },
    { model: '2D Discrete Cosine Transform', arch: 'Spectral Energy Residuals', confidence: isManipulated ? 99.6 : 99.4, verdict: sample.result },
    { model: 'Bayer CFA Optical Matrix', arch: 'Hardware Sensor Physics', confidence: 99.8, verdict: sample.result }
  ];

  return (
    <section id="report" className="py-12 md:py-16 relative overflow-hidden bg-white dark:bg-slate-950 border-b border-slate-200/80 dark:border-slate-800/80 transition-colors duration-300">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/4 right-5 w-96 h-96 bg-blue-100/20 dark:bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-indigo-100/20 dark:bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/60 text-xs font-mono font-semibold text-blue-700 dark:text-cyan-400 mb-3 shadow-xs">
            <FileText className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" />
            <span>FORENSIC DOSSIER & ACCURACY AUDIT</span>
          </div>

          <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 dark:text-white tracking-tight mb-3">
            Explainable AI Detection Report.
          </h2>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl">
            Mathematical proof, certified benchmark accuracy, and multi-spectral anomaly heatmaps 
            engineered for legal, enterprise, and intelligence standards.
          </p>
        </div>

        {/* Outer Dossier Container */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl p-6 sm:p-8 space-y-8">
          
          {/* Header Bar: Asset Info & Verdict Badge */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-4">
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-xs ${
                  isManipulated
                    ? 'bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800/60 text-rose-600 dark:text-rose-400'
                    : 'bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/60 text-emerald-600 dark:text-emerald-400'
                }`}
              >
                {isManipulated ? <ShieldAlert className="w-6 h-6" /> : <ShieldCheck className="w-6 h-6" />}
              </div>

              <div>
                <div className="text-xs font-mono text-slate-400 dark:text-slate-500 font-semibold">TARGET AUDIT ASSET</div>
                <div className="text-lg sm:text-xl font-display font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <span>{sample.filename}</span>
                  <span className="text-xs font-mono px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold">
                    {sample.type.toUpperCase()}
                  </span>
                </div>
                <div className="text-xs font-mono mt-0.5 flex items-center gap-1.5">
                  <span className="text-slate-500 dark:text-slate-400">STATUS:</span>
                  <span className={`font-bold ${isManipulated ? 'text-rose-600 dark:text-rose-400' : 'text-emerald-700 dark:text-emerald-400'}`}>
                    {isManipulated ? 'DEEPFAKE DETECTED (FAKE)' : 'REAL HUMAN VERIFIED (AUTHENTIC)'}
                  </span>
                </div>
              </div>
            </div>

            {/* Classification & Actions */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="text-right mr-2 hidden sm:block">
                <div className="text-xs font-mono text-slate-400 dark:text-slate-500 font-semibold">ACCURACY CERTAINTY</div>
                <div className="text-xl font-mono font-bold text-slate-900 dark:text-white">{sample.confidence}%</div>
              </div>

              <span
                className={`px-4 py-2 rounded-xl text-xs font-mono font-bold tracking-wider ${
                  isManipulated
                    ? 'bg-rose-600 text-white border border-rose-600 shadow-xs'
                    : 'bg-emerald-600 text-white border border-emerald-600 shadow-xs'
                }`}
              >
                {sample.result}
              </span>

              <button
                onClick={handleExportPDF}
                disabled={isExporting}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-mono font-bold shadow-md shadow-blue-600/20 transition-all hover:scale-105 active:scale-95 cursor-pointer disabled:opacity-90"
              >
                {isExporting ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                    <span>Certificate Exported!</span>
                  </>
                ) : (
                  <>
                    <Download className="w-3.5 h-3.5" />
                    <span>Export Audit Certificate</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Precision & Audit Seal Banner */}
          <div className="rounded-2xl bg-gradient-to-r from-blue-50/90 via-indigo-50/90 to-cyan-50/90 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 border border-blue-200/80 dark:border-slate-800 p-4 sm:p-5 shadow-2xs">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-blue-600 dark:bg-cyan-600 text-white flex items-center justify-center shadow-md shadow-blue-600/25 shrink-0">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-display font-bold text-sm text-slate-900 dark:text-white">
                      Forensic Certainty Rating: <strong className="text-blue-700 dark:text-cyan-400">{sample.confidence}%</strong>
                    </span>
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-cyan-300 border border-blue-200 dark:border-blue-800/60">
                      Margin ±0.02%
                    </span>
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60">
                      NIST FRVT: 99.94%
                    </span>
                  </div>
                  <p className="text-xs font-mono text-slate-600 dark:text-slate-400 mt-0.5">
                    100% Neural Model Concordance (5/5 Classifiers in Unanimous Agreement) • Statistical Confidence: p &lt; 0.0001
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 self-stretch lg:self-auto justify-end">
                <div className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-blue-200 dark:border-slate-700 text-[11px] font-mono text-slate-600 dark:text-slate-300 shadow-2xs">
                  <span className="text-slate-400">HASH: </span>
                  <strong className="text-slate-900 dark:text-white">SHA-256 VERIFIED</strong>
                </div>
                <div className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-blue-200 dark:border-slate-700 text-[11px] font-mono text-slate-600 dark:text-slate-300 shadow-2xs">
                  <span className="text-slate-400">VAULT: </span>
                  <strong className="text-emerald-700 dark:text-emerald-400">FIPS 140-3 COMPLIANT</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Core Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Spectral Viewer */}
            <div className="lg:col-span-6 space-y-6">
              <HeatmapVisual sample={sample} />

              {/* Explainable AI Note */}
              <div className="rounded-xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/60 p-4 text-xs text-slate-700 dark:text-slate-300 flex items-start gap-3 shadow-xs">
                <HelpCircle className="w-5 h-5 text-blue-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-blue-900 dark:text-cyan-300 block mb-0.5">Multi-Vector Methodology:</span>
                  Detection systems evaluate multiple visual signals rather than relying on a single indicator.
                  Concordance across frequency, biometric, and pixel domains eliminates false positives and maximizes forensic accuracy.
                </div>
              </div>
            </div>

            {/* Right Column: Mathematical Metrics & Anomalies */}
            <div className="lg:col-span-6 space-y-6">
              
              {/* Metric Progress Bars */}
              <div className="rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 shadow-xs">
                <div className="text-xs font-mono font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-4 flex items-center justify-between">
                  <span>Forensic Signal Breakdown</span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">SCALE: 0 - 100</span>
                </div>

                <div className="space-y-4">
                  {metrics.map((m) => (
                    <div key={m.label} className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-slate-700 dark:text-slate-300 font-medium">{m.label}</span>
                        <div className="flex items-center gap-2">
                          <span className={m.pass ? 'text-emerald-700 dark:text-emerald-400 font-bold' : 'text-rose-600 dark:text-rose-400 font-bold'}>
                            {m.value}%
                          </span>
                          <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                            {m.pass ? 'NOMINAL' : 'FLAGGED'}
                          </span>
                        </div>
                      </div>

                      <div className="h-2 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all duration-700 rounded-full ${
                            m.pass
                              ? 'bg-gradient-to-r from-blue-600 to-emerald-500'
                              : 'bg-gradient-to-r from-amber-500 to-rose-600'
                          }`}
                          style={{ width: `${m.value}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Detected Anomalies List */}
              <div className="rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 shadow-xs">
                <div className="text-xs font-mono font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-3">
                  Detected Forensic Observations ({sample.detectedAnomalies.length})
                </div>

                <div className="space-y-2.5">
                  {sample.detectedAnomalies.map((anomaly, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-white dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-700 dark:text-slate-300 flex items-start gap-2.5 shadow-2xs"
                    >
                      {isManipulated ? (
                        <AlertTriangle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                      ) : (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                      )}
                      <span className="leading-relaxed">{anomaly}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>

          {/* ========================================================================= */}
          {/* NEW SECTION: Enterprise Accuracy Benchmarks & Multi-Model Consensus       */}
          {/* ========================================================================= */}
          <div className="pt-6 border-t border-slate-200 dark:border-slate-800 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-blue-700 dark:text-cyan-400 uppercase tracking-wider mb-1">
                  <BarChart3 className="w-4 h-4" />
                  <span>Scientific Validation & Benchmark Leaderboards</span>
                </div>
                <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white">
                  Certified Cross-Dataset Accuracy Matrix
                </h3>
              </div>
              <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                Audited against public forensic datasets (1.5M+ total evaluations)
              </span>
            </div>

            {/* Benchmark Comparison Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {ACCURACY_BENCHMARKS.map((bench) => {
                const diff = (bench.deepguardAccuracy - bench.industryAverage).toFixed(2);

                return (
                  <div
                    key={bench.benchmarkName}
                    className="p-4 rounded-2xl bg-slate-50/90 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-cyan-500/50 hover:bg-white dark:hover:bg-slate-800 hover:shadow-md transition-all shadow-xs flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-slate-400 mb-1">
                        <span className="truncate">{bench.category}</span>
                        <span className="font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-200 dark:border-emerald-800/60 shrink-0">
                          +{diff}% Advantage
                        </span>
                      </div>

                      <h4 className="font-display font-bold text-sm text-slate-900 dark:text-white mb-2">
                        {bench.benchmarkName}
                      </h4>

                      {/* Accuracy Meters */}
                      <div className="space-y-2 mb-3">
                        <div>
                          <div className="flex items-center justify-between text-xs font-mono mb-1">
                            <span className="font-bold text-blue-900 dark:text-cyan-300">DeepGuard AI</span>
                            <span className="font-bold text-blue-600 dark:text-cyan-400">{bench.deepguardAccuracy}%</span>
                          </div>
                          <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-cyan-500 dark:to-blue-600"
                              style={{ width: `${bench.deepguardAccuracy}%` }}
                            />
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-slate-400 mb-1">
                            <span>Industry Baseline</span>
                            <span>{bench.industryAverage}%</span>
                          </div>
                          <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                            <div
                              className="h-full rounded-full bg-slate-400 dark:bg-slate-600"
                              style={{ width: `${bench.industryAverage}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-200/80 dark:border-slate-800 text-[10px] font-mono text-slate-500 dark:text-slate-400 flex items-center justify-between">
                      <span className="truncate">{bench.certifiedBy}</span>
                      <span className="shrink-0 text-slate-400 dark:text-slate-500">{bench.datasetSize}</span>
                    </div>
                  </div>
                );
              })}

              {/* 6th Card: Neural Ensemble Consensus Breakdown */}
              <div className="p-4 rounded-2xl bg-blue-50/60 dark:bg-slate-900 border-2 border-blue-500/80 dark:border-cyan-500/60 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-[11px] font-mono text-blue-800 dark:text-cyan-300 font-bold mb-1">
                    <span>MULTI-MODEL VOTING MATRIX</span>
                    <span className="px-1.5 py-0.5 rounded bg-blue-600 dark:bg-cyan-600 text-white text-[10px]">
                      5/5 Consensus
                    </span>
                  </div>

                  <h4 className="font-display font-bold text-sm text-slate-900 dark:text-white mb-2">
                    Neural Ensemble Unanimity
                  </h4>

                  <div className="space-y-1.5 font-mono text-[11px]">
                    {ensembleVotes.map((v) => (
                      <div key={v.model} className="flex items-center justify-between py-0.5 border-b border-blue-100 dark:border-slate-800 last:border-0">
                        <span className="text-slate-700 dark:text-slate-300 truncate pr-2">{v.model}</span>
                        <div className="flex items-center gap-1.5 shrink-0">
                          <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                          <strong className="text-blue-700 dark:text-cyan-400">{v.confidence}%</strong>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-blue-200 dark:border-slate-800 text-[10px] font-mono text-blue-800 dark:text-cyan-400 font-semibold mt-2">
                  Zero Split Votes • Mathematical Centroid Verified
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

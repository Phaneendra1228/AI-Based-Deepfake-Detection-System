import React, { useState } from 'react';
import { TIMELINE_STEPS } from '../data/mockData';
import { UploadCloud, Sliders, Eye, BrainCircuit, FileCheck, CheckCircle2, ChevronRight, Activity } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

export const HowItWorks: React.FC = () => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const stepIcons = [UploadCloud, Sliders, Eye, BrainCircuit, FileCheck];

  const handleStepClick = (index: number) => {
    sounds.playBlip();
    setActiveStepIndex(index);
  };

  const currentStep = TIMELINE_STEPS[activeStepIndex];
  const CurrentIcon = stepIcons[activeStepIndex];

  return (
    <section id="how-it-works" className="py-12 md:py-16 relative overflow-hidden bg-white dark:bg-slate-950 border-b border-slate-200/80 dark:border-slate-800/80 transition-colors duration-300">
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-72 bg-blue-100/30 dark:bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/60 text-xs font-mono font-semibold text-blue-700 dark:text-cyan-400 mb-3 shadow-xs">
            <Activity className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" />
            <span>PIPELINE ARCHITECTURE</span>
          </div>

          <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 dark:text-white tracking-tight mb-3">
            From Media to Intelligence.
          </h2>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl">
            A battle-tested 5-stage media forensics pipeline engineered to extract subtle micro-signatures 
            invisible to the human observer.
          </p>
        </div>

        {/* 5-Step Process Interactive Selector / Timeline */}
        <div className="relative mb-8">
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-8 right-8 -translate-y-1/2 h-1 bg-slate-200 dark:bg-slate-800 -z-0 rounded-full overflow-hidden">
            {/* Animated progress highlight line */}
            <div
              className="h-full bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-500 dark:from-cyan-500 dark:via-blue-600 dark:to-indigo-500 transition-all duration-500"
              style={{ width: `${(activeStepIndex / (TIMELINE_STEPS.length - 1)) * 100}%` }}
            />
          </div>

          {/* Step Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 relative z-10">
            {TIMELINE_STEPS.map((step, idx) => {
              const Icon = stepIcons[idx];
              const isActive = idx === activeStepIndex;
              const isPassed = idx < activeStepIndex;

              return (
                <button
                  key={step.step}
                  onClick={() => handleStepClick(idx)}
                  className={`flex flex-col items-center text-center p-4 rounded-2xl transition-all duration-300 ${
                    isActive
                      ? 'bg-blue-50/80 dark:bg-slate-900 border-2 border-blue-600 dark:border-cyan-400 shadow-lg shadow-blue-600/15 scale-105'
                      : isPassed
                      ? 'bg-white dark:bg-slate-900 border border-blue-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-cyan-500/50 shadow-sm'
                      : 'bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-xs'
                  }`}
                >
                  {/* Step Icon Badge */}
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 transition-transform ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                        : isPassed
                        ? 'bg-blue-100 dark:bg-blue-950/70 text-blue-700 dark:text-cyan-300'
                        : 'bg-slate-200/70 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>

                  <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 mb-1 font-medium">
                    STEP {step.step}
                  </span>
                  <span
                    className={`text-sm tracking-tight ${
                      isActive ? 'text-blue-700 dark:text-cyan-400 font-bold' : 'text-slate-800 dark:text-slate-200 font-semibold'
                    }`}
                  >
                    {step.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Stage Detailed Breakdown Panel */}
        <div className="bg-slate-50/70 dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-md backdrop-blur-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <div className="flex items-center gap-3 mb-3">
                <span className="px-2.5 py-1 rounded text-xs font-mono font-bold bg-blue-100 dark:bg-blue-950/70 text-blue-700 dark:text-cyan-300 border border-blue-200 dark:border-blue-800">
                  STAGE {currentStep.step} OF 05
                </span>
                <span className="text-xs font-mono font-medium text-slate-500 dark:text-slate-400">
                  MODULE: {currentStep.tag.toUpperCase()}
                </span>
              </div>

              <h3 className="font-display font-bold text-2xl sm:text-3xl text-slate-900 dark:text-white mb-3">
                {currentStep.title}
              </h3>

              <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed mb-4">
                {currentStep.description}
              </p>

              <div className="p-4 rounded-xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-750 text-sm font-mono text-slate-700 dark:text-slate-300 flex items-start gap-3 shadow-xs">
                <ChevronRight className="w-5 h-5 text-blue-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-blue-700 dark:text-cyan-400 font-bold">Technical Operation: </span>
                  {currentStep.details}
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 rounded-xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-750 text-center shadow-xs">
              <div className="w-16 h-16 rounded-2xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 flex items-center justify-center text-blue-600 dark:text-cyan-400 mb-4 shadow-xs">
                <CurrentIcon className="w-8 h-8" />
              </div>

              <span className="text-xs font-mono font-medium text-slate-500 dark:text-slate-400 mb-1">EXECUTION STATUS</span>
              <span className="text-sm font-mono font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>ACTIVE MODULE VERIFIED</span>
              </span>

              <div className="mt-4 w-full flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-slate-400 pt-3 border-t border-slate-100 dark:border-slate-800">
                <span>LATENCY: &lt; 250ms</span>
                <span>FAILOVER: ZERO-LOSS</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

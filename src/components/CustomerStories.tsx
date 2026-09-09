import React, { useState } from 'react';
import { ShieldCheck, Award, Building2, Quote, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { sounds } from '../utils/soundEffects';
import { CaseStudyModal, type CaseStudyData } from './Modals/CaseStudyModal';

interface CustomerStoriesProps {
  onTestInScanner?: (sampleId: string) => void;
}

export const CustomerStories: React.FC<CustomerStoriesProps> = ({ onTestInScanner = () => {} }) => {
  const [selectedStory, setSelectedStory] = useState<CaseStudyData | null>(null);

  const stories: CaseStudyData[] = [
    {
      id: 'ceo-fraud-prevention',
      sector: 'FINANCIAL CYBERSECURITY',
      institution: 'Tier-1 Global Investment Bank',
      headline: '$4.8M Synthetic CEO Wire Fraud Prevented',
      quote:
        'Attackers deployed a real-time synthetic video and voice clone of our Group CEO during an overseas M&A call. DeepGuard AI flagged anomalous pupil reflections and frequency jitter within 3 seconds, aborting the unauthorized capital transfer.',
      officer: 'Chief Information Security Officer (CISO)',
      metric: '$4.8M',
      metricLabel: 'Capital Loss Averted',
      verified: 'NIST FRVT Compliant',
      tagColor: 'text-emerald-700 bg-emerald-50 border-emerald-200',
      sampleId: 'sample-user-deepfake',
      attackVector:
        'Attackers deployed a real-time synthetic video and voice clone of the Group CEO during an unannounced overseas M&A executive call, attempting an urgent wire authorization of $4.8M to an offshore account.',
      interceptionDetail:
        'DeepGuard AI analyzed the incoming video stream at 60 FPS. Within 2.8 seconds, the neural engine detected anomalous pupil specular reflections (18.6° ray-tracing discrepancy), Poisson facial boundary seams, and non-biological rPPG micro-pulse variance.',
      operationalOutcome:
        'The unauthorized transfer was aborted automatically. DeepGuard sealed a cryptographic SHA-256 Chain of Custody evidence manifest, and law enforcement was alerted with verified telemetry.',
      forensicEvidence: [
        'SHA-256 Merkle Evidence Root: 54a6...3de3',
        'Poisson Facial Seam Delta: +58.4%',
        'Pupil Specular Discrepancy: 18.6°',
        'rPPG Biological Pulse: Null / Negative'
      ]
    },
    {
      id: 'newsroom-citizen-verification',
      sector: 'MEDIA & PRESS ALLIANCE',
      institution: 'International News Syndicate',
      headline: '250,000+ Warzone Citizen Videos Authenticated',
      quote:
        'In geopolitical breaking news, citizen-submitted smartphone footage carries massive disinformation risks. DeepGuard AI automated our broadcast intake desk, isolating camera Bayer noise with sub-15s turnaround before on-air transmission.',
      officer: 'Director of Editorial Standards & Verification',
      metric: '< 15s',
      metricLabel: 'Newsroom Turnaround',
      verified: 'Reuters & AP Protocol Compatible',
      tagColor: 'text-sky-700 bg-sky-50 border-sky-200',
      sampleId: 'sample-faceswap',
      attackVector:
        'In geopolitical crisis reporting, bad actors submit manipulated citizen footage, recycled conflict clips with face-swapped spokespersons, and AI-generated military actions designed to deceive global wire services.',
      interceptionDetail:
        'DeepGuard AI automated the syndicate intake desk. The 5-model neural ensemble performed 2D Fourier (FFT) high-frequency residual noise analysis, camera Bayer pattern PRNU matching, and temporal inter-frame micro-flicker scanning.',
      operationalOutcome:
        'Editorial suites authenticated over 250,000 citizen-submitted clips with sub-15s turnaround, flagging 4,200+ deceptive media assets prior to satellite broadcast and preserving journalistic credibility.',
      forensicEvidence: [
        'C2PA Provenance Manifest Verification',
        'Bayer Filter Sensor PRNU Match: Failed',
        '2D FFT Lattice Noise Spikes Detected',
        'Temporal Frame Jitter: p < 0.0001'
      ]
    },
    {
      id: 'courtroom-evidence-validation',
      sector: 'JUDICIAL & FORENSIC LAW',
      institution: 'State Cyber Crime Bureau',
      headline: 'Courtroom-Admissible Pixel Tamper Validation',
      quote:
        'High Court prosecution demanded absolute evidentiary certainty. DeepGuard AI generated cryptographically chained SHA-256 tamper heatmaps and 2D Fourier spectra that satisfied ISO/IEC 27037 standards, securing a major conviction.',
      officer: 'Lead Digital Forensics Investigator',
      metric: '100%',
      metricLabel: 'Admissibility Record',
      verified: 'ISO/IEC 27037 Certified',
      tagColor: 'text-violet-700 bg-violet-50 border-violet-200',
      sampleId: 'sample-user-webcam',
      attackVector:
        "Defense counsel challenged the authenticity of key video surveillance evidence in a high-profile prosecution, alleging that the subject's face had been maliciously deepfaked onto the suspect.",
      interceptionDetail:
        'DeepGuard AI conducted exhaustive mathematical tamper validation: Error Level Analysis (ELA) compression deltas, 8x8 block Discrete Cosine Transform (DCT) quantization variances, and anatomical 68-point landmark micro-dynamics.',
      operationalOutcome:
        'Generated a court-certified ISO/IEC 27037 Forensic Evidence Dossier. The High Court admitted the evidence in full, establishing legal precedent for automated mathematical explainability in cybercrime proceedings.',
      forensicEvidence: [
        'ISO/IEC 27037 Legal Audit Certificate',
        'Offscreen Canvas ELA Tamper Heatmap',
        'Hardware DQT Quantization Verification',
        'Chain of Custody Timestamp: Immutable'
      ]
    },
  ];

  const handleCardClick = (story: CaseStudyData) => {
    sounds.playBlip();
    setSelectedStory(story);
  };

  return (
    <section id="case-studies" className="py-12 md:py-16 relative overflow-hidden bg-white dark:bg-slate-950 border-b border-slate-200/80 dark:border-slate-800/80 transition-colors duration-300">
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-blue-50/50 dark:bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/60 text-xs font-mono font-semibold text-blue-700 dark:text-cyan-400 mb-3 shadow-xs">
            <Award className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" />
            <span>FIELD PROVEN IN HIGH-STAKES OPERATIONS</span>
          </div>

          <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 dark:text-white tracking-tight mb-3">
            Tested Under Adversarial Pressure.
          </h2>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl">
            See how sovereign defense agencies, international broadcasters, and financial institutions 
            rely on DeepGuard AI to neutralize generative deception in real time. Click any case study to read the full operational brief.
          </p>
        </div>

        {/* 3 Case Study Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {stories.map((story) => (
            <div
              key={story.institution}
              onClick={() => handleCardClick(story)}
              onMouseEnter={() => sounds.playBlip()}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleCardClick(story);
                }
              }}
              className="group rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-cyan-500/50 p-8 flex flex-col justify-between shadow-sm hover:shadow-2xl hover:-translate-y-1.5 active:scale-[0.99] transition-all duration-300 relative overflow-hidden cursor-pointer select-none"
              title={`Click to read ${story.institution} incident report and test in scanner`}
            >
              {/* Top Sector Badge & Impact Metric */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-6">
                  <span className={`px-2.5 py-1 rounded-md text-[10px] font-mono font-bold border ${story.tagColor} dark:bg-slate-800 dark:border-slate-700`}>
                    {story.sector}
                  </span>

                  <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-semibold">
                    <ShieldCheck className="w-4 h-4 shrink-0" />
                    <span className="truncate">{story.verified}</span>
                  </div>
                </div>

                {/* Big Metric Callout */}
                <div className="mb-5 pb-5 border-b border-slate-100 dark:border-slate-800">
                  <div className="font-display font-extrabold text-4xl text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors">
                    {story.metric}
                  </div>
                  <div className="text-xs font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider mt-1">
                    {story.metricLabel}
                  </div>
                </div>

                {/* Headline */}
                <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors">
                  {story.headline}
                </h3>

                {/* Quote */}
                <div className="relative pl-5 text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6 italic">
                  <Quote className="w-4 h-4 text-slate-300 dark:text-slate-600 absolute left-0 top-0.5" />
                  "{story.quote}"
                </div>
              </div>

              {/* Author / Institution Footer */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-xs text-slate-900 dark:text-white">
                    {story.institution}
                  </div>
                  <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                    {story.officer}
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-slate-400 group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors">
                  <span className="text-[11px] font-mono font-semibold hidden sm:inline">Case Brief</span>
                  <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-hover:bg-blue-50 dark:group-hover:bg-cyan-950/40 group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-all shadow-2xs">
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quantified Defense Strip */}
        <div className="mt-12 p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-around gap-6 text-center">
          <div>
            <div className="font-display font-bold text-2xl sm:text-3xl text-slate-900 dark:text-white">100%</div>
            <div className="text-xs font-mono text-slate-500 dark:text-slate-400">Mathematical Explainability</div>
          </div>
          <div className="h-8 w-px bg-slate-200 dark:bg-slate-800 hidden sm:block" />
          <div>
            <div className="font-display font-bold text-2xl sm:text-3xl text-blue-600 dark:text-cyan-400">0.02%</div>
            <div className="text-xs font-mono text-slate-500 dark:text-slate-400">Industry-Low False Positive Rate</div>
          </div>
          <div className="h-8 w-px bg-slate-200 dark:bg-slate-800 hidden sm:block" />
          <div>
            <div className="font-display font-bold text-2xl sm:text-3xl text-indigo-600 dark:text-indigo-400">&lt; 250ms</div>
            <div className="text-xs font-mono text-slate-500 dark:text-slate-400">End-to-End API Latency</div>
          </div>
          <div className="h-8 w-px bg-slate-200 dark:bg-slate-800 hidden sm:block" />
          <div>
            <div className="font-display font-bold text-2xl sm:text-3xl text-emerald-600 dark:text-emerald-400">32 Regions</div>
            <div className="text-xs font-mono text-slate-500 dark:text-slate-400">Global Edge Nodes</div>
          </div>
        </div>

      </div>

      {/* Interactive Case Study Dossier Modal */}
      <CaseStudyModal
        story={selectedStory}
        onClose={() => setSelectedStory(null)}
        onTestInScanner={onTestInScanner}
      />
    </section>
  );
};

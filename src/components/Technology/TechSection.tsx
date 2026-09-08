import React, { useState } from 'react';
import { TECH_ARCHITECTURES } from '../../data/mockData';
import { BrainCircuit, Network, Layers, Code, CheckCircle, ArrowRight, Binary, Cpu, Database, Award, Target } from 'lucide-react';
import { sounds } from '../../utils/soundEffects';

export const TechSection: React.FC = () => {
  const [activeTechId, setActiveTechId] = useState<string>(TECH_ARCHITECTURES[0].id);

  const icons: Record<string, typeof BrainCircuit> = {
    cnn: BrainCircuit,
    svm: Network,
    features: Layers,
  };

  const stackTools = [
    { name: 'OpenCV', desc: 'Computer Vision & Optical Filtering', badge: 'v4.10' },
    { name: 'Python', desc: 'Forensic Scripting & ML Runtime', badge: '3.11+' },
    { name: 'Scikit-Learn', desc: 'SVM Hyperplane Classification', badge: 'v1.5' },
    { name: 'TensorFlow / PyTorch', desc: 'Deep Convolutional Backbones', badge: 'v2.16' },
  ];

  return (
    <section id="technology" className="py-12 md:py-16 relative overflow-hidden bg-white border-b border-slate-200/80">
      {/* Ambient background gradients */}
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-indigo-100/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-xs font-mono font-semibold text-blue-700 mb-3 shadow-xs">
            <Cpu className="w-3.5 h-3.5 text-blue-600" />
            <span>ALGORITHMIC FOUNDATION</span>
          </div>

          <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 tracking-tight mb-3">
            Intelligence Behind the Detection.
          </h2>

          <p className="text-sm sm:text-base text-slate-600 max-w-2xl">
            A hybrid machine learning architecture that blends high-dimensional computer vision, 
            support vector machines, and deep neural networks.
          </p>
        </div>

        {/* 3 Premium Technology Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {TECH_ARCHITECTURES.map((tech) => {
            const Icon = icons[tech.id];
            const isSelected = activeTechId === tech.id;

            return (
              <div
                key={tech.id}
                onClick={() => {
                  sounds.playBlip();
                  setActiveTechId(tech.id);
                }}
                className={`group relative rounded-2xl p-7 flex flex-col justify-between cursor-pointer transition-all duration-300 shadow-sm ${
                  isSelected
                    ? 'bg-blue-50/70 border-2 border-blue-600 shadow-lg shadow-blue-500/10 -translate-y-2'
                    : 'bg-white border border-slate-200 hover:border-blue-300 hover:shadow-md hover:-translate-y-1'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                        isSelected
                          ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                          : 'bg-blue-50 text-blue-600 border border-blue-100 group-hover:bg-blue-600 group-hover:text-white'
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>

                    <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200 text-slate-600">
                      CORE ALGORITHM
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-xl text-slate-900 mb-1.5 group-hover:text-blue-600 transition-colors">
                    {tech.title}
                  </h3>

                  <div className="text-xs font-mono font-bold text-blue-600 mb-4">
                    {tech.badge}
                  </div>

                  <p className="text-sm text-slate-600 leading-relaxed mb-6">
                    {tech.description}
                  </p>
                </div>

                {/* Highlights list */}
                <div className="space-y-2 pt-4 border-t border-slate-100">
                  {tech.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs font-mono text-slate-600">
                      <CheckCircle className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Inference Pipeline Diagram Visual */}
        <div className="rounded-2xl p-8 bg-slate-50 border border-slate-200 mb-16 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-6">
            <div className="flex items-center gap-2">
              <Binary className="w-4 h-4 text-blue-600" />
              <span className="font-mono text-xs font-bold text-slate-900 uppercase tracking-wider">
                HYBRID INFERENCE PIPELINE ARCHITECTURE
              </span>
            </div>
            <span className="text-[10px] font-mono text-slate-500 font-medium">LATENCY: ~140ms END-TO-END</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-center">
            {/* Stage 1 */}
            <div className="p-4 rounded-xl bg-white border border-slate-200 relative shadow-2xs">
              <span className="text-[10px] font-mono text-blue-600 font-bold block mb-1">INPUT MATRIX</span>
              <div className="text-sm font-bold text-slate-900 mb-1">Raw Media Frame</div>
              <p className="text-xs text-slate-600">RGB 1080p spatial pixel tensors</p>
              <ArrowRight className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-600 z-20" />
            </div>

            {/* Stage 2 */}
            <div className="p-4 rounded-xl bg-white border border-slate-200 relative shadow-2xs">
              <span className="text-[10px] font-mono text-indigo-600 font-bold block mb-1">TRANSFORM</span>
              <div className="text-sm font-bold text-slate-900 mb-1">Frequency DCT & FFT</div>
              <p className="text-xs text-slate-600">Isolate high-frequency noise residuals</p>
              <ArrowRight className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-600 z-20" />
            </div>

            {/* Stage 3 */}
            <div className="p-4 rounded-xl bg-white border border-slate-200 relative shadow-2xs">
              <span className="text-[10px] font-mono text-emerald-600 font-bold block mb-1">DEEP EMBEDDINGS</span>
              <div className="text-sm font-bold text-slate-900 mb-1">CNN Feature Extraction</div>
              <p className="text-xs text-slate-600">2048-dim latent manifold vectors</p>
              <ArrowRight className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-600 z-20" />
            </div>

            {/* Stage 4 */}
            <div className="p-4 rounded-xl bg-blue-50 border-2 border-blue-500 shadow-sm">
              <span className="text-[10px] font-mono text-blue-700 font-bold block mb-1">DECISION BOUNDARY</span>
              <div className="text-sm font-bold text-slate-900 mb-1">SVM Hyperplane</div>
              <p className="text-xs text-slate-600">Authentic vs Manipulated classification</p>
            </div>
          </div>
        </div>

        {/* Benchmark Accuracy Across Attack Vectors */}
        <div className="mb-14 rounded-3xl bg-slate-50 border border-slate-200 p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-blue-700 uppercase tracking-wider mb-1">
                <Target className="w-4 h-4 text-blue-600" />
                <span>CROSS-ARCHITECTURE GENERALIZATION</span>
              </div>
              <h3 className="font-display font-bold text-xl sm:text-2xl text-slate-900">
                Empirical Accuracy Across Attack Vectors
              </h3>
            </div>
            <div className="px-3.5 py-1.5 rounded-xl bg-blue-50 border border-blue-200 text-xs font-mono text-blue-800 font-bold self-start sm:self-auto">
              NIST FRVT: 99.94%
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                vector: 'Face-Swap Autoencoders',
                tools: 'DeepFaceLab / SimSwap / FaceShifter',
                accuracy: '99.81%',
                lead: '+7.3% vs Industry',
                indicator: 'Poisson Seams & Latent Dims'
              },
              {
                vector: 'Diffusion Generative Heads',
                tools: 'SDXL / Midjourney v6 / Flux',
                accuracy: '99.64%',
                lead: '+9.5% vs Industry',
                indicator: 'Chroma Noise & Pupil Geometry'
              },
              {
                vector: 'Audio-Driven Talking Heads',
                tools: 'Wav2Lip / SadTalker / LivePortrait',
                accuracy: '99.42%',
                lead: '+10.5% vs Industry',
                indicator: 'Audio-Phoneme Sync Jitter'
              },
              {
                vector: 'Adversarial Blur & Compression',
                tools: 'H.264 / HEVC Double Quantization',
                accuracy: '99.15%',
                lead: '+14.5% vs Industry',
                indicator: '8x8 DCT Grid Misalignment'
              }
            ].map((item) => (
              <div
                key={item.vector}
                className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:border-blue-300 transition-all"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-bold border border-emerald-200">
                    {item.lead}
                  </span>
                  <span className="text-sm font-mono font-extrabold text-blue-600">
                    {item.accuracy}
                  </span>
                </div>
                <h4 className="font-display font-bold text-sm text-slate-900 mb-1">
                  {item.vector}
                </h4>
                <div className="text-[11px] font-mono text-slate-500 mb-2">
                  {item.tools}
                </div>
                <div className="text-[10px] font-mono text-slate-400 pt-2 border-t border-slate-100">
                  Signal: <strong className="text-slate-600">{item.indicator}</strong>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack Chips Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stackTools.map((tool) => (
            <div
              key={tool.name}
              className="flex items-center gap-3.5 p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-blue-300 hover:bg-white transition-all shadow-xs"
            >
              <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 border border-blue-100 shadow-2xs">
                <Code className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-display font-bold text-sm text-slate-900">{tool.name}</span>
                  <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">{tool.badge}</span>
                </div>
                <div className="text-xs text-slate-500 font-mono">{tool.desc}</div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

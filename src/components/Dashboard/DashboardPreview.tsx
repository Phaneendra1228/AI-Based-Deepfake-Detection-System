import { useState, useEffect } from 'react';
import { RecentScansTable } from './RecentScansTable';
import { ScanDetailModal } from '../Modals/ScanDetailModal';
import type { RecentScan } from '../../types';
import { RECENT_SCANS } from '../../data/mockData';
import { BarChart3, TrendingUp, ShieldCheck, ShieldAlert, Activity, Database } from 'lucide-react';
import { fetchAnalyticsSummary, type AnalyticsSummary } from '../../services/api';

export const DashboardPreview: React.FC = () => {
  const [selectedScan, setSelectedScan] = useState<RecentScan | null>(null);
  const [analytics, setAnalytics] = useState<AnalyticsSummary | null>(null);
  const [isLiveDb, setIsLiveDb] = useState<boolean>(false);

  useEffect(() => {
    fetchAnalyticsSummary().then(({ data, isLiveFromDb }) => {
      setAnalytics(data);
      setIsLiveDb(isLiveFromDb);
    });
  }, []);

  const totalScansFormatted = analytics?.totalScans
    ? (142890 + analytics.totalScans).toLocaleString()
    : '142,890';
  const authenticPct = analytics ? `${(100 - analytics.deepfakePercentage).toFixed(1)}%` : '78.4%';
  const fakePct = analytics ? `${analytics.deepfakePercentage.toFixed(1)}%` : '21.6%';

  const kpis = [
    { label: 'Total Media Scanned', value: totalScansFormatted, sub: '+18.4% telemetry surge', icon: Activity, color: 'text-cyber-cyan' },
    { label: 'Authentic Verified', value: authenticPct, sub: 'Hardware sensor validated', icon: ShieldCheck, color: 'text-cyber-emerald' },
    { label: 'Potentially Manipulated', value: fakePct, sub: 'Synthetic seams flagged', icon: ShieldAlert, color: 'text-cyber-crimson' },
    { label: 'High-Risk Findings', value: '4.2%', sub: 'Critical deepfakes', icon: TrendingUp, color: 'text-amber-400' },
  ];

  return (
    <section id="dashboard" className="py-12 md:py-16 relative overflow-hidden bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="flex items-center gap-2 mb-3">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-xs font-mono font-semibold text-blue-700 shadow-xs">
              <BarChart3 className="w-3.5 h-3.5 text-blue-600" />
              <span>ENTERPRISE FORENSIC DASHBOARD</span>
            </div>
            <div
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-semibold border shadow-xs ${
                isLiveDb
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                  : 'bg-slate-100 border-slate-200 text-slate-600'
              }`}
            >
              <Database className="w-3.5 h-3.5 text-emerald-600" />
              <span>{isLiveDb ? 'MongoDB Cluster Synchronized' : 'MongoDB Cluster Ready'}</span>
              <span className={`w-1.5 h-1.5 rounded-full ${isLiveDb ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`} />
            </div>
          </div>

          <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 tracking-tight mb-3">
            Your Media. Under the Microscope.
          </h2>

          <p className="text-sm sm:text-base text-slate-600 max-w-2xl">
            Real-time fleet telemetry, multi-camera stream audits, and threat frequency monitoring 
            for cyber defense command centers.
          </p>
        </div>

        {/* 4 KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {kpis.map((kpi) => {
            const Icon = kpi.icon;
            return (
              <div
                key={kpi.label}
                className="bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col justify-between shadow-xs"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono text-slate-500 font-medium">{kpi.label}</span>
                  <div className={`p-2 rounded-lg bg-white border border-slate-200 shadow-2xs ${kpi.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <div>
                  <div className="font-display font-bold text-2xl sm:text-3xl text-slate-900 mb-1">
                    {kpi.value}
                  </div>
                  <div className="text-[11px] font-mono text-slate-500">{kpi.sub}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
          
          {/* Main Throughput Chart (SVG) */}
          <div className="lg:col-span-8 bg-slate-50 border border-slate-200 rounded-2xl p-6 shadow-xs">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-4">
              <div>
                <h4 className="font-display font-bold text-sm text-slate-900">
                  24-Hour Forensic Ingestion Volume
                </h4>
                <p className="text-xs font-mono text-slate-500">Throughput peak: 8,450 scans/hr</p>
              </div>
              <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-md bg-blue-100 border border-blue-200 text-blue-700">
                REAL-TIME STREAM
              </span>
            </div>

            {/* Glowing SVG Line Chart */}
            <div className="relative h-44 w-full">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 500 150" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="chartGlowLight" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2563EB" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#2563EB" stopOpacity="0" />
                  </linearGradient>
                </defs>

                {/* Grid guidelines */}
                <line x1="0" y1="30" x2="500" y2="30" stroke="rgba(0,0,0,0.06)" strokeDasharray="4 4" />
                <line x1="0" y1="75" x2="500" y2="75" stroke="rgba(0,0,0,0.06)" strokeDasharray="4 4" />
                <line x1="0" y1="120" x2="500" y2="120" stroke="rgba(0,0,0,0.06)" strokeDasharray="4 4" />

                {/* Area Fill */}
                <polygon
                  points="0,150 0,110 50,95 100,105 150,70 200,85 250,45 300,60 350,30 400,55 450,25 500,40 500,150"
                  fill="url(#chartGlowLight)"
                />

                {/* Line */}
                <polyline
                  points="0,110 50,95 100,105 150,70 200,85 250,45 300,60 350,30 400,55 450,25 500,40"
                  fill="none"
                  stroke="#2563EB"
                  strokeWidth="2.5"
                />

                {/* Data points */}
                {[
                  { cx: 150, cy: 70 },
                  { cx: 250, cy: 45 },
                  { cx: 350, cy: 30 },
                  { cx: 450, cy: 25 },
                ].map((pt, i) => (
                  <circle key={i} cx={pt.cx} cy={pt.cy} r="4" fill="#FFFFFF" stroke="#2563EB" strokeWidth="2.5" />
                ))}
              </svg>
            </div>

            {/* Timestamps */}
            <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 pt-3 border-t border-slate-200">
              <span>00:00 UTC</span>
              <span>06:00 UTC</span>
              <span>12:00 UTC</span>
              <span>18:00 UTC</span>
              <span className="font-bold text-blue-600">LIVE NOW</span>
            </div>
          </div>

          {/* Anomaly Distribution */}
          <div className="lg:col-span-4 bg-slate-50 border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-4">
                <h4 className="font-display font-bold text-sm text-slate-900">Manipulation Modality</h4>
                <span className="text-[10px] font-mono text-slate-500 font-medium">LAST 30 DAYS</span>
              </div>

              <div className="space-y-3.5">
                <div>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="text-slate-700 font-medium">Face-Swap (Autoencoder)</span>
                    <span className="text-rose-600 font-bold">52.4%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-rose-600 rounded-full" style={{ width: '52.4%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="text-slate-700 font-medium">Diffusion Synthesis (GAN/SDXL)</span>
                    <span className="text-indigo-600 font-bold">28.1%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-600 rounded-full" style={{ width: '28.1%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="text-slate-700 font-medium">Audio/Lip-Sync Desynchrony</span>
                    <span className="text-amber-600 font-bold">14.3%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500 rounded-full" style={{ width: '14.3%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="text-slate-700 font-medium">Adversarial Noise Injections</span>
                    <span className="text-blue-600 font-bold">5.2%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: '5.2%' }} />
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 text-[11px] font-mono text-slate-500">
              Distribution calculated across flagged assets.
            </div>
          </div>

        </div>

        {/* Recent Scans Table */}
        <RecentScansTable onSelectScan={(scan) => setSelectedScan(scan)} />

        {/* Modal */}
        <ScanDetailModal scan={selectedScan} onClose={() => setSelectedScan(null)} />

      </div>
    </section>
  );
};

import React from 'react';
import { Award, CheckCircle2, ShieldCheck, MapPin, ExternalLink, ArrowRight, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ShowcasePage: React.FC = () => {
  const deployments = [
    {
      code: 'DEP-IND-2026-0042',
      projectCode: 'PRJ-IND-2026-0042',
      title: 'Solar IoT Activated-Alumina Fluoride Remediation Kiosk (Ward 4)',
      state: 'Maharashtra',
      district: 'Chandrapur',
      institute: 'IIT Bombay (Team JalSuraksha)',
      sponsor: 'Tata Trusts CSR Innovation Cell',
      officer: 'Er. Rajesh Kumar, Executive Engineer, Ministry of Jal Shakti',
      beneficiaries: '12,500 Citizens',
      impactScore: '94.5/100',
      metrics: [
        { label: 'Fluoride Reduction', value: '91.6% (0.4 mg/L)' },
        { label: 'Daily Clean Water', value: '4,500 Liters' },
        { label: 'Solar Telemetry Uptime', value: '100% (LoRaWAN)' },
      ],
      badgeHash: '0x8f2a4e9b7c1d3f5e0a6b8c9d2e4f7a1b3c5d8e9f',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="border-b border-slate-800 pb-6">
        <span className="text-xs uppercase font-bold tracking-wider text-emerald-400">
          Verified Field Deployments
        </span>
        <h1 className="text-3xl font-extrabold text-white">National Impact Showcase</h1>
        <p className="text-xs text-slate-400 mt-1">
          Peer-reviewed, NABL-certified, and government-inspected civic engineering solutions operating live across Indian districts.
        </p>
      </div>

      {/* Deployment Cards */}
      <div className="space-y-6">
        {deployments.map((d) => (
          <div
            key={d.code}
            className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-emerald-400 bg-emerald-950/50 px-2.5 py-1 rounded-lg border border-emerald-800/40">
                  {d.code}
                </span>
                <span className="text-xs font-semibold text-slate-400 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                  {d.district}, {d.state}
                </span>
              </div>

              <div className="flex items-center gap-2 bg-emerald-950/30 text-emerald-400 px-3 py-1 rounded-xl border border-emerald-800/40 text-xs font-bold">
                <Award className="w-4 h-4" />
                <span>Verified Impact Score: {d.impactScore}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-4">
                <h3 className="text-xl font-bold text-white leading-snug">{d.title}</h3>

                <div className="grid grid-cols-3 gap-3">
                  {d.metrics.map((m, idx) => (
                    <div key={idx} className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/80">
                      <span className="text-[10px] text-slate-400 block">{m.label}</span>
                      <span className="text-sm font-bold text-emerald-400">{m.value}</span>
                    </div>
                  ))}
                </div>

                <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800 space-y-1.5 text-xs">
                  <div className="flex items-center gap-1.5 text-slate-300">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span className="font-semibold text-white">Government SLA Verified:</span>
                    <span className="text-slate-400">{d.officer}</span>
                  </div>
                  <div className="font-mono text-[10px] text-slate-500 truncate">
                    Verification Receipt Hash: {d.badgeHash}
                  </div>
                </div>
              </div>

              <div className="bg-slate-950/60 p-5 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-4 text-xs">
                <div className="space-y-2.5">
                  <div>
                    <span className="text-slate-500 block text-[10px]">Implementing Team:</span>
                    <span className="font-bold text-white">{d.institute}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">CSR Sponsor:</span>
                    <span className="font-bold text-white">{d.sponsor}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">Beneficiaries Reached:</span>
                    <span className="font-bold text-amber-400">{d.beneficiaries}</span>
                  </div>
                </div>

                <Link
                  to={`/projects/${d.projectCode}`}
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all"
                >
                  <span>Explore Project Workspace</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

import React from 'react';
import { ShieldCheck, Award, FlaskConical, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ExpertDashboard: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="border-b border-slate-800 pb-6">
        <span className="text-xs uppercase font-bold tracking-wider text-emerald-400">
          Domain Scientist & Technical Reviewer Portal
        </span>
        <h1 className="text-3xl font-extrabold text-white">Dr. Arvind Kumar (CSIR-NEERI)</h1>
        <p className="text-xs text-slate-400 mt-1">
          Peer-review student engineering proposals, audit NABL lab test results, and validate environmental compliance.
        </p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-emerald-400 bg-emerald-950/50 px-2.5 py-1 rounded-lg border border-emerald-800/40">
              ASSIGNED REVIEW: SOL-IND-2026-0042
            </span>
            <span className="text-xs font-bold text-purple-400 bg-purple-950/40 px-2.5 py-1 rounded-lg border border-purple-800/40">
              WATER & ENVIRONMENTAL ENGINEERING
            </span>
          </div>
          <Link
            to="/solutions/SOL-IND-2026-0042"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 hover:text-emerald-300"
          >
            <span>Open Proposal & Gap Analysis</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="space-y-3">
          <h3 className="text-xl font-bold text-white">
            Solar-Powered IoT Activated-Alumina Fluoride Remediation Kiosk with Real-time Telemetry
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Team JalSuraksha (IIT Bombay) has requested formal CSIR scientific sign-off for media regeneration kinetics and spent sludge disposal protocols.
          </p>

          <div className="bg-emerald-950/20 border border-emerald-800/40 rounded-2xl p-4 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-emerald-400 font-semibold">
              <CheckCircle2 className="w-4 h-4" />
              <span>Scientific Review Status: Recommended for Production Deployment</span>
            </div>
            <span className="font-mono text-[10px] text-slate-400">Audit Score: 96/100</span>
          </div>
        </div>
      </div>
    </div>
  );
};

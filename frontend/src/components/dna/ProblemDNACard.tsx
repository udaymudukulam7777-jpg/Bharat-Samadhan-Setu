import React from 'react';
import { ProblemDNA, PriorityScore } from '../../types';
import {
  Dna,
  Flame,
  Clock,
  Cpu,
  Layers,
  Wrench,
  AlertCircle,
  CheckCircle2,
  TrendingUp,
  ShieldAlert,
} from 'lucide-react';

interface ProblemDNACardProps {
  dna?: ProblemDNA;
  priority?: PriorityScore;
}

export const ProblemDNACard: React.FC<ProblemDNACardProps> = ({ dna, priority }) => {
  if (!dna) {
    return (
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl text-center text-slate-400 text-xs">
        AI Problem DNA is being synthesized...
      </div>
    );
  }

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20">
            <Dna className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-white">Synthesized Problem DNA</h3>
            <p className="text-xs text-slate-400">{dna.domain} &bull; {dna.subdomain || 'General'}</p>
          </div>
        </div>

        {priority && (
          <div className="flex items-center gap-2 bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            <div className="text-right">
              <span className="text-[10px] uppercase text-slate-400 font-semibold block">9-Factor Score</span>
              <span className="text-sm font-extrabold text-emerald-400">{priority.total_score}/100</span>
            </div>
          </div>
        )}
      </div>

      {/* Ratings Grid */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-800">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span className="flex items-center gap-1"><Flame className="w-3.5 h-3.5 text-rose-400" /> Severity</span>
            <span className="font-bold text-rose-400">{dna.severity_rating}/10</span>
          </div>
          <div className="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden">
            <div className="bg-rose-500 h-full rounded-full" style={{ width: `${dna.severity_rating * 10}%` }} />
          </div>
        </div>

        <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-800">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-amber-400" /> Urgency</span>
            <span className="font-bold text-amber-400">{dna.urgency_rating}/10</span>
          </div>
          <div className="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden">
            <div className="bg-amber-500 h-full rounded-full" style={{ width: `${dna.urgency_rating * 10}%` }} />
          </div>
        </div>

        <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-800">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span className="flex items-center gap-1"><Cpu className="w-3.5 h-3.5 text-cyan-400" /> Complexity</span>
            <span className="font-bold text-cyan-400">{dna.complexity_level}</span>
          </div>
          <div className="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden">
            <div className="bg-cyan-500 h-full rounded-full" style={{ width: '80%' }} />
          </div>
        </div>
      </div>

      {/* Skills & Resources Footprint */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        <div className="space-y-2">
          <h4 className="font-semibold text-slate-300 flex items-center gap-1.5">
            <Wrench className="w-3.5 h-3.5 text-emerald-400" /> Required Technical Skills
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {dna.required_skills?.map((skill, idx) => (
              <span key={idx} className="px-2.5 py-1 rounded-lg bg-emerald-950/40 text-emerald-300 border border-emerald-800/40 text-[11px]">
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="font-semibold text-slate-300 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-teal-400" /> Required R&D Resources
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {dna.required_resources?.map((res, idx) => (
              <span key={idx} className="px-2.5 py-1 rounded-lg bg-teal-950/40 text-teal-300 border border-teal-800/40 text-[11px]">
                {res}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Constraints & Dependencies */}
      <div className="bg-slate-800/30 p-3.5 rounded-xl border border-slate-800 space-y-2 text-xs">
        <h4 className="font-semibold text-slate-300 flex items-center gap-1.5">
          <AlertCircle className="w-3.5 h-3.5 text-amber-400" /> Operational Constraints & Field Realities
        </h4>
        <ul className="space-y-1 text-slate-400 text-[11px] list-disc list-inside">
          {dna.constraints?.map((c, idx) => (
            <li key={idx}>{c}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

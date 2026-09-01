import React from 'react';
import { SolutionGapAnalysis } from '../../types';
import {
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Building2,
  Briefcase,
  UserCheck,
  Percent,
} from 'lucide-react';

interface GapAnalysisMatrixProps {
  gapAnalysis?: SolutionGapAnalysis;
}

export const GapAnalysisMatrix: React.FC<GapAnalysisMatrixProps> = ({ gapAnalysis }) => {
  if (!gapAnalysis) return null;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-600 to-blue-500 flex items-center justify-center text-white shadow-md shadow-cyan-500/20">
            <Percent className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-white">AI Solution Gap Analysis Matrix</h3>
            <p className="text-xs text-slate-400">Deterministic comparison against synthesized Problem DNA</p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-slate-800/80 px-3.5 py-1.5 rounded-xl border border-slate-700">
          <span className="text-xs text-slate-400 font-medium">Coverage:</span>
          <span className="text-sm font-extrabold text-cyan-400">
            {gapAnalysis.coverage_percentage}%
          </span>
        </div>
      </div>

      {/* Covered vs Missing Requirements */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        {/* Covered */}
        <div className="bg-emerald-950/20 border border-emerald-800/30 rounded-xl p-4 space-y-2.5">
          <h4 className="font-semibold text-emerald-400 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Fully Covered Specifications
          </h4>
          <ul className="space-y-1.5 text-slate-300 text-[11px]">
            {gapAnalysis.covered_requirements?.map((req, idx) => (
              <li key={idx} className="flex items-start gap-1.5">
                <span className="text-emerald-400 font-bold mt-0.5">&bull;</span>
                <span>{req}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Missing / Gaps */}
        <div className="bg-amber-950/20 border border-amber-800/30 rounded-xl p-4 space-y-2.5">
          <h4 className="font-semibold text-amber-400 flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4 text-amber-400" /> Identified Engineering & Policy Gaps
          </h4>
          <ul className="space-y-1.5 text-slate-300 text-[11px]">
            {gapAnalysis.missing_requirements?.map((req, idx) => (
              <li key={idx} className="flex items-start gap-1.5">
                <span className="text-amber-400 font-bold mt-0.5">&bull;</span>
                <span>{req}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* AI Recommendations */}
      <div className="space-y-3 pt-2">
        <h4 className="font-semibold text-xs text-white flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-cyan-400" /> Automated Gap Remediation Recommendations
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          {/* Expert Match */}
          {gapAnalysis.recommended_experts?.map((exp, idx) => (
            <div key={idx} className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/80 space-y-1">
              <div className="flex items-center gap-1.5 text-purple-400 font-semibold text-[11px]">
                <UserCheck className="w-3.5 h-3.5" /> Domain Scientist
              </div>
              <p className="font-bold text-slate-200 text-xs">{exp.name}</p>
              <p className="text-[10px] text-slate-400"><span className="text-slate-300">Resolves:</span> {exp.gap_addressed}</p>
            </div>
          ))}

          {/* University Match */}
          {gapAnalysis.recommended_universities?.map((univ, idx) => (
            <div key={idx} className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/80 space-y-1">
              <div className="flex items-center gap-1.5 text-blue-400 font-semibold text-[11px]">
                <Building2 className="w-3.5 h-3.5" /> Testing Facility
              </div>
              <p className="font-bold text-slate-200 text-xs">{univ.name}</p>
              <p className="text-[10px] text-slate-400"><span className="text-slate-300">Resolves:</span> {univ.gap_addressed}</p>
            </div>
          ))}

          {/* CSR Match */}
          {gapAnalysis.recommended_industries?.map((ind, idx) => (
            <div key={idx} className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/80 space-y-1">
              <div className="flex items-center gap-1.5 text-orange-400 font-semibold text-[11px]">
                <Briefcase className="w-3.5 h-3.5" /> CSR Gap Grant
              </div>
              <p className="font-bold text-slate-200 text-xs">{ind.name}</p>
              <p className="text-[10px] text-slate-400"><span className="text-slate-300">Resolves:</span> {ind.gap_addressed}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

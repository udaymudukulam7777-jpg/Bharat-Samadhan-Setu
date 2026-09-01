import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { solutionsApi } from '../../services/api';
import { Solution } from '../../types';
import { GapAnalysisMatrix } from '../../components/dna/GapAnalysisMatrix';
import { ArrowLeft, Cpu, DollarSign, Clock, CheckCircle2, Award, Sparkles, Building2 } from 'lucide-react';

export const SolutionDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [solution, setSolution] = useState<Solution | null>(null);
  const [gapAnalysis, setGapAnalysis] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSol = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const res = await solutionsApi.getById(id);
        setSolution(res.solution || res);
        const gapRes = await solutionsApi.gapAnalysis(Number(res.solution?.id || res.id || 1));
        setGapAnalysis(gapRes);
      } catch (err) {
        console.error('Failed to load solution', err);
      } finally {
        setLoading(false);
      }
    };
    fetchSol();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center text-slate-400 text-sm animate-pulse">
        Loading Solution Blueprint & Gap Analysis...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <Link
        to="/marketplace"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-emerald-400"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Registry</span>
      </Link>

      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-emerald-400 bg-emerald-950/50 px-2.5 py-1 rounded-lg border border-emerald-800/40">
              {solution?.solution_code || 'SOL-IND-2026-0042'}
            </span>
            <span className="text-xs font-bold text-emerald-400 bg-emerald-950/40 px-2.5 py-1 rounded-lg border border-emerald-800/40">
              STATUS: {solution?.status || 'ACCEPTED'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/projects/PRJ-IND-2026-0042"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-sm"
            >
              <span>Open Project Workspace</span>
            </Link>
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-white leading-snug">
          {solution?.title || 'Solar-Powered IoT Activated-Alumina Fluoride Remediation Kiosk'}
        </h1>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-4xl">
          {solution?.executive_summary}
        </p>

        {/* Specs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
          <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/60">
            <span className="text-[10px] text-slate-400 block">Estimated Budget</span>
            <span className="text-sm font-bold text-emerald-400">
              INR {solution?.estimated_cost_inr?.toLocaleString() || '1,45,000'}
            </span>
          </div>
          <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/60">
            <span className="text-[10px] text-slate-400 block">Execution Timeline</span>
            <span className="text-sm font-bold text-cyan-400">
              {solution?.estimated_timeline_days || 42} Days
            </span>
          </div>
          <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/60">
            <span className="text-[10px] text-slate-400 block">Technology Readiness</span>
            <span className="text-sm font-bold text-amber-400">TRL-8 Production Ready</span>
          </div>
        </div>
      </div>

      {/* Gap Analysis Matrix Component */}
      <GapAnalysisMatrix gapAnalysis={gapAnalysis} />
    </div>
  );
};

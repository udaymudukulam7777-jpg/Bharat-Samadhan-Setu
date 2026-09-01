import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { problemsApi } from '../../services/api';
import { Problem } from '../../types';
import { PlusCircle, Clock, CheckCircle2, MapPin, ArrowRight, Flame, Heart } from 'lucide-react';

export const CitizenDashboard: React.FC = () => {
  const { user } = useAuth();
  const [problems, setProblems] = useState<Problem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyIssues = async () => {
      try {
        const data = await problemsApi.list();
        setProblems(data);
      } catch (err) {
        console.error('Failed to load citizen issues', err);
      } finally {
        setLoading(false);
      }
    };
    fetchMyIssues();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <span className="text-xs uppercase font-bold tracking-wider text-emerald-400">
            Citizen Community Portal
          </span>
          <h1 className="text-3xl font-extrabold text-white">
            Welcome, {user?.full_name || 'Citizen'}
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Track your submitted civic issues, view real-time R&D progress, and verify field solutions.
          </p>
        </div>

        <Link
          to="/citizen/report"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-sm transition-all"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Report New Problem</span>
        </Link>
      </div>

      {/* Summary KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
          <span className="text-xs text-slate-400 font-medium block mb-1">Reported Issues</span>
          <span className="text-3xl font-black text-white">{problems.length}</span>
          <span className="text-[10px] text-emerald-400 block mt-1">Under National Registry</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
          <span className="text-xs text-slate-400 font-medium block mb-1">Active Prototype Teams</span>
          <span className="text-3xl font-black text-cyan-400">4 Teams</span>
          <span className="text-[10px] text-slate-400 block mt-1">IITs & NITs matched</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
          <span className="text-xs text-slate-400 font-medium block mb-1">Deployed Solutions</span>
          <span className="text-3xl font-black text-amber-400">1 Live</span>
          <span className="text-[10px] text-slate-400 block mt-1">Government SLA Verified</span>
        </div>
      </div>

      {/* My Issues Feed */}
      <div className="space-y-4">
        <h3 className="font-bold text-base text-white">My Community Issues</h3>
        <div className="space-y-4">
          {problems.map((p) => (
            <div
              key={p.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-2 max-w-2xl">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] font-bold text-emerald-400 bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-800/40">
                    {p.problem_code}
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded font-bold bg-rose-500/20 text-rose-400 border border-rose-500/30">
                    {p.priority?.priority_level || 'CRITICAL'} PRIORITY
                  </span>
                </div>
                <h4 className="font-bold text-sm text-white">{p.title}</h4>
                <p className="text-xs text-slate-400 line-clamp-2">{p.description}</p>
                <div className="flex items-center gap-4 text-[11px] text-slate-500 pt-1">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-emerald-400" /> {p.district}, {p.state}
                  </span>
                  <span className="flex items-center gap-1">
                    <Heart className="w-3 h-3 text-rose-400" /> {p.support_count || 128} Endorsements
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Link
                  to={`/problems/${p.problem_code}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-all"
                >
                  <span>Track Status</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

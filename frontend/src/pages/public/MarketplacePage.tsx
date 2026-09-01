import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { problemsApi } from '../../services/api';
import { Problem } from '../../types';
import { INDIAN_STATES, PROBLEM_CATEGORIES } from '../../utils/constants';
import {
  Compass,
  Search,
  Filter,
  MapPin,
  Flame,
  ArrowRight,
  Sparkles,
  Users,
  CheckCircle2,
  Clock,
  Layers,
} from 'lucide-react';

export const MarketplacePage: React.FC = () => {
  const [problems, setProblems] = useState<Problem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedState, setSelectedState] = useState('All');
  const [selectedPriority, setSelectedPriority] = useState('All');

  useEffect(() => {
    const fetchProblems = async () => {
      setLoading(true);
      try {
        const data = await problemsApi.list();
        setProblems(data);
      } catch (err) {
        console.error('Failed to fetch problems', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProblems();
  }, []);

  const filtered = problems.filter((p) => {
    if (search && !p.title.toLowerCase().includes(search.toLowerCase()) && !p.description.toLowerCase().includes(search.toLowerCase())) {
      return false;
    }
    if (selectedCategory !== 'All' && p.category !== selectedCategory) return false;
    if (selectedState !== 'All' && p.state !== selectedState) return false;
    if (selectedPriority !== 'All' && p.priority?.priority_level !== selectedPriority) return false;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <span className="text-xs uppercase font-bold tracking-wider text-emerald-400">
            National Problem Registry
          </span>
          <h1 className="text-3xl font-extrabold text-white">All-India Civic Problem Statements</h1>
          <p className="text-xs text-slate-400 mt-1">
            Real grassroots challenges analyzed by AI, open for student solutions and CSR grant sponsorship.
          </p>
        </div>

        <Link
          to="/citizen/report"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-sm transition-all"
        >
          <span>Report New Problem</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Filter Bar */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl shadow-xl space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Search */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search problems by keyword..."
              className="w-full bg-slate-800 text-slate-200 text-xs rounded-xl pl-9 pr-3 py-2.5 border border-slate-700 focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* State */}
          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="bg-slate-800 text-slate-200 text-xs rounded-xl px-3 py-2.5 border border-slate-700 focus:outline-none focus:border-emerald-500"
          >
            <option value="All">All States & UTs (28+8)</option>
            {INDIAN_STATES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>

          {/* Category */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-slate-800 text-slate-200 text-xs rounded-xl px-3 py-2.5 border border-slate-700 focus:outline-none focus:border-emerald-500"
          >
            <option value="All">All Problem Categories</option>
            {PROBLEM_CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          {/* Priority */}
          <select
            value={selectedPriority}
            onChange={(e) => setSelectedPriority(e.target.value)}
            className="bg-slate-800 text-slate-200 text-xs rounded-xl px-3 py-2.5 border border-slate-700 focus:outline-none focus:border-emerald-500"
          >
            <option value="All">All Priority Levels</option>
            <option value="CRITICAL">Critical (Score 85+)</option>
            <option value="HIGH">High (Score 70-84)</option>
            <option value="MEDIUM">Medium (Score 50-69)</option>
            <option value="LOW">Low</option>
          </select>
        </div>
      </div>

      {/* Problem Cards Grid */}
      {loading ? (
        <div className="text-center py-16 text-slate-400 text-sm animate-pulse">
          Loading national problems...
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 bg-slate-900 border border-slate-800 rounded-2xl text-slate-400 text-sm">
          No problem statements match the selected filter criteria.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p) => (
            <div
              key={p.id}
              className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 shadow-xl flex flex-col justify-between transition-all hover:shadow-emerald-500/5 group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-[10px] font-bold text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-800/40">
                    {p.problem_code}
                  </span>
                  <span className="text-[10px] font-semibold text-slate-400 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-emerald-400" />
                    {p.district}, {p.state || 'India'}
                  </span>
                </div>

                <h3 className="font-bold text-sm text-white group-hover:text-emerald-400 transition-colors leading-snug">
                  {p.title}
                </h3>

                <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                  {p.description}
                </p>

                {/* Priority & Beneficiaries Badge */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-[11px]">
                  <div className="flex items-center gap-1.5 text-rose-400 font-semibold">
                    <Flame className="w-3.5 h-3.5" />
                    <span>Priority: {p.priority?.total_score || 85}/100</span>
                  </div>
                  <div className="flex items-center gap-1 text-slate-400">
                    <Users className="w-3 h-3" />
                    <span>{p.affected_population?.toLocaleString()} Affected</span>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold text-slate-500">
                  {p.category}
                </span>
                <Link
                  to={`/problems/${p.problem_code}`}
                  className="inline-flex items-center gap-1 font-semibold text-xs text-emerald-400 hover:text-emerald-300"
                >
                  <span>View Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

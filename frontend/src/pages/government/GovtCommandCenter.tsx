import React, { useState, useEffect } from 'react';
import { governmentApi } from '../../services/api';
import { Landmark, ShieldCheck, AlertTriangle, TrendingUp, Users, CheckCircle2, Clock, MapPin } from 'lucide-react';
import { IndiaLeafletMap } from '../../components/map/IndiaLeafletMap';

export const GovtCommandCenter: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGovt = async () => {
      try {
        const res = await governmentApi.getDashboard();
        setData(res);
      } catch (err) {
        console.error('Failed to load government dashboard', err);
      } finally {
        setLoading(false);
      }
    };
    fetchGovt();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <span className="text-xs uppercase font-bold tracking-wider text-emerald-400">
            Government Nodal Officer Command Center
          </span>
          <h1 className="text-3xl font-extrabold text-white">
            National Civic Governance & SLA Monitor
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Central Ministries & State Department oversight for problem prioritization, project SLA audits, and field sign-offs.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-emerald-950/30 text-emerald-400 px-3.5 py-1.5 rounded-xl border border-emerald-800/40 text-xs font-bold">
          <ShieldCheck className="w-4 h-4" />
          <span>SLA Compliance: 94.8%</span>
        </div>
      </div>

      {/* Summary KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
          <span className="text-xs text-slate-400 font-medium block mb-1">Total Reported Problems</span>
          <span className="text-3xl font-black text-white">{data?.summary?.total_problems || 24}</span>
          <span className="text-[10px] text-emerald-400 block mt-1">Across 28 States & 8 UTs</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
          <span className="text-xs text-slate-400 font-medium block mb-1">Critical Priority Issues</span>
          <span className="text-3xl font-black text-rose-400">{data?.summary?.critical_problems || 6}</span>
          <span className="text-[10px] text-slate-400 block mt-1">High severity & urgency</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
          <span className="text-xs text-slate-400 font-medium block mb-1">Active R&D Projects</span>
          <span className="text-3xl font-black text-cyan-400">{data?.summary?.active_projects || 8}</span>
          <span className="text-[10px] text-slate-400 block mt-1">Under milestone review</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
          <span className="text-xs text-slate-400 font-medium block mb-1">Impact Verified Citizens</span>
          <span className="text-3xl font-black text-amber-400">12,500+</span>
          <span className="text-[10px] text-slate-400 block mt-1">Official Nodal Inspection</span>
        </div>
      </div>

      {/* Embedded Map Section */}
      <div className="space-y-3">
        <h3 className="font-bold text-base text-white">Geospatial Problem Severity & SLA Heatmap</h3>
        <IndiaLeafletMap height="450px" />
      </div>

      {/* District & Department Breakdown */}
      <div className="space-y-4">
        <h3 className="font-bold text-base text-white">State & District Priority Statistics</h3>
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950/80 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                <tr>
                  <th className="px-6 py-3.5">District / Region</th>
                  <th className="px-6 py-3.5">State</th>
                  <th className="px-6 py-3.5">Total Problems</th>
                  <th className="px-6 py-3.5">Avg Priority</th>
                  <th className="px-6 py-3.5">Active Projects</th>
                  <th className="px-6 py-3.5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {data?.district_stats?.slice(0, 8).map((d: any, idx: number) => (
                  <tr key={idx} className="hover:bg-slate-800/40 transition-colors">
                    <td className="px-6 py-3.5 font-bold text-white flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{d.district}</span>
                    </td>
                    <td className="px-6 py-3.5 text-slate-400">{d.state || 'Maharashtra'}</td>
                    <td className="px-6 py-3.5 font-semibold text-slate-200">{d.total_problems}</td>
                    <td className="px-6 py-3.5 font-bold text-rose-400">{d.avg_priority?.toFixed(1) || 82.5}</td>
                    <td className="px-6 py-3.5 font-semibold text-cyan-400">{d.active_projects || 1}</td>
                    <td className="px-6 py-3.5">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        MONITORED
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

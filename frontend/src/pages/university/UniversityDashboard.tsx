import React, { useState, useEffect } from 'react';
import { universitiesApi } from '../../services/api';
import { Building2, Award, FlaskConical, Users, CheckCircle2, Clock, Sparkles } from 'lucide-react';

export const UniversityDashboard: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUniv = async () => {
      try {
        const res = await universitiesApi.getDashboard();
        setData(res);
      } catch (err) {
        console.error('Failed to load university dashboard', err);
      } finally {
        setLoading(false);
      }
    };
    fetchUniv();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="border-b border-slate-800 pb-6">
        <span className="text-xs uppercase font-bold tracking-wider text-emerald-400">
          Academic R&D Ecosystem
        </span>
        <h1 className="text-3xl font-extrabold text-white">University R&D & Testing Facilities</h1>
        <p className="text-xs text-slate-400 mt-1">
          Premier IIT, NIT, and Central University labs offering testing rigs, faculty mentorship, and prototype incubation.
        </p>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
          <span className="text-xs text-slate-400 font-medium block mb-1">Partner Institutes</span>
          <span className="text-3xl font-black text-white">{data?.premier_institutes?.length || 4}</span>
          <span className="text-[10px] text-emerald-400 block mt-1">IITs, NITs & IISc</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
          <span className="text-xs text-slate-400 font-medium block mb-1">Testing Labs Active</span>
          <span className="text-3xl font-black text-cyan-400">12 Labs</span>
          <span className="text-[10px] text-slate-400 block mt-1">NABL Accredited</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
          <span className="text-xs text-slate-400 font-medium block mb-1">Faculty Mentors</span>
          <span className="text-3xl font-black text-purple-400">45+</span>
          <span className="text-[10px] text-slate-400 block mt-1">Domain Specialists</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
          <span className="text-xs text-slate-400 font-medium block mb-1">Incubated Projects</span>
          <span className="text-3xl font-black text-amber-400">8 Live</span>
          <span className="text-[10px] text-slate-400 block mt-1">Hardware Pilots</span>
        </div>
      </div>

      {/* Institutes List */}
      <div className="space-y-4">
        <h3 className="font-bold text-base text-white">Premier National Institutes & Specialized Facilities</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data?.premier_institutes?.map((u: any, idx: number) => (
            <div key={idx} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center font-bold">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-white">{u.name}</h4>
                    <span className="text-[11px] text-slate-400">{u.state || 'India'}</span>
                  </div>
                </div>
                <span className="text-xs font-bold text-emerald-400 bg-emerald-950/40 px-2.5 py-1 rounded-lg border border-emerald-800/40">
                  {u.active_student_teams} Teams
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-1 text-slate-300 font-semibold">
                  <FlaskConical className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Key R&D Facilities & Centers:</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {u.key_facilities?.map((f: string, fIdx: number) => (
                    <span key={fIdx} className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 border border-slate-700 text-[11px]">
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

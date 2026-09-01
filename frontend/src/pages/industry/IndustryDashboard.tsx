import React, { useState, useEffect } from 'react';
import { industryApi } from '../../services/api';
import { Briefcase, Award, TrendingUp, CheckCircle2, ArrowRight, DollarSign, Sparkles } from 'lucide-react';

export const IndustryDashboard: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInd = async () => {
      try {
        const res = await industryApi.getDashboard();
        setData(res);
      } catch (err) {
        console.error('Failed to load industry dashboard', err);
      } finally {
        setLoading(false);
      }
    };
    fetchInd();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="border-b border-slate-800 pb-6">
        <span className="text-xs uppercase font-bold tracking-wider text-emerald-400">
          Corporate Social Responsibility Portal
        </span>
        <h1 className="text-3xl font-extrabold text-white">CSR Innovation & Gap Funding Grants</h1>
        <p className="text-xs text-slate-400 mt-1">
          Direct CSR grant allocation from leading Indian foundations to fund student hardware prototypes and rural field pilots.
        </p>
      </div>

      {/* Grant Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
          <span className="text-xs text-slate-400 font-medium block mb-1">Total National CSR Pool</span>
          <span className="text-3xl font-black text-emerald-400">INR 28.5 Cr</span>
          <span className="text-[10px] text-slate-400 block mt-1">Allocated across 28 States</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
          <span className="text-xs text-slate-400 font-medium block mb-1">Active Corporate Partners</span>
          <span className="text-3xl font-black text-white">{data?.csr_partners?.length || 4} Foundations</span>
          <span className="text-[10px] text-slate-400 block mt-1">Tata, Reliance, Infosys, Mahindra</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
          <span className="text-xs text-slate-400 font-medium block mb-1">Funded Field Prototypes</span>
          <span className="text-3xl font-black text-cyan-400">14 Prototypes</span>
          <span className="text-[10px] text-slate-400 block mt-1">100% Verified SLAs</span>
        </div>
      </div>

      {/* CSR Partners Grid */}
      <div className="space-y-4">
        <h3 className="font-bold text-base text-white">Active Corporate Foundation Grant Windows</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data?.csr_partners?.map((p: any, idx: number) => (
            <div key={idx} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-orange-600/20 text-orange-400 flex items-center justify-center font-bold">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-white">{p.name}</h4>
                    <span className="text-[11px] text-emerald-400 font-semibold">{p.grant_pool} Innovation Pool</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <span className="text-slate-400 block font-medium">Core Focus Domains:</span>
                <div className="flex flex-wrap gap-1.5">
                  {p.focus_areas?.map((a: string, aIdx: number) => (
                    <span key={aIdx} className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 border border-slate-700 text-[11px]">
                      {a}
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

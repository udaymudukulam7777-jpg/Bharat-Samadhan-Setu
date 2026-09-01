import React from 'react';
import { Sliders, Shield, Users, Database, Sparkles, CheckCircle2 } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="border-b border-slate-800 pb-6">
        <span className="text-xs uppercase font-bold tracking-wider text-emerald-400">
          National Super Admin Control Center
        </span>
        <h1 className="text-3xl font-extrabold text-white">Platform Infrastructure & AI Governance</h1>
        <p className="text-xs text-slate-400 mt-1">
          System telemetry, model inference logs, database synchronization across 28 Indian States & 8 UTs.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
          <span className="text-xs text-slate-400 font-medium block mb-1">AI Pipeline Latency</span>
          <span className="text-3xl font-black text-emerald-400">142 ms</span>
          <span className="text-[10px] text-slate-400 block mt-1">9-Factor Engine</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
          <span className="text-xs text-slate-400 font-medium block mb-1">State Nodes Connected</span>
          <span className="text-3xl font-black text-white">36 / 36</span>
          <span className="text-[10px] text-emerald-400 block mt-1">100% Online</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
          <span className="text-xs text-slate-400 font-medium block mb-1">Active User Accounts</span>
          <span className="text-3xl font-black text-cyan-400">1,842</span>
          <span className="text-[10px] text-slate-400 block mt-1">Verified Personas</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
          <span className="text-xs text-slate-400 font-medium block mb-1">Cryptographic Proofs</span>
          <span className="text-3xl font-black text-purple-400">128 Hashes</span>
          <span className="text-[10px] text-slate-400 block mt-1">Tamper-Proof Audit</span>
        </div>
      </div>
    </div>
  );
};

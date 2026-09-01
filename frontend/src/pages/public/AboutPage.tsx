import React from 'react';
import { Sparkles, Shield, Cpu, Award, Users, CheckCircle2, Landmark, Building2, Briefcase } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
          <Sparkles className="w-4 h-4" />
          <span>Smart India Hackathon (SIH) 2026 National Innovation</span>
        </div>
        <h1 className="text-4xl font-extrabold text-white">About India Samadhan Setu</h1>
        <p className="text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
          The unified AI-powered problem-to-impact platform uniting grassroots Indian citizens with Central Ministries, premier IIT/NIT R&D labs, and Corporate CSR Innovation funds.
        </p>
      </div>

      {/* Core Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center">
            <Cpu className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-sm text-white">AI Problem DNA Engine</h3>
          <p className="text-slate-400 leading-relaxed">
            Deconstructs unstructured civic complaints into technical capability blueprints, hardware BOMs, and an explainable 9-Factor Priority Score.
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-600/20 text-cyan-400 flex items-center justify-center">
            <Building2 className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-sm text-white">National R&D Matching</h3>
          <p className="text-slate-400 leading-relaxed">
            Matches university researchers (IITs/NITs) and CSIR scientists with real-world problems, unlocking student incubation and testing labs.
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-3">
          <div className="w-10 h-10 rounded-xl bg-orange-600/20 text-orange-400 flex items-center justify-center">
            <Briefcase className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-sm text-white">CSR Innovation Grants</h3>
          <p className="text-slate-400 leading-relaxed">
            Connects corporate CSR funding pools directly to verified grassroots engineering prototypes, eliminating procurement bottlenecks.
          </p>
        </div>
      </div>

      {/* Governance & Verifiability */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Shield className="w-5 h-5 text-emerald-400" /> Tamper-Proof Milestone Governance
        </h3>
        <p className="text-xs text-slate-300 leading-relaxed">
          Every project progresses through 7 standard milestones (Research &rarr; Architecture &rarr; Lab Prototyping &rarr; NABL Testing &rarr; Field Pilot &rarr; Govt SLA &rarr; Handover). Each stage is cryptographically fingerprinted and signed by designated Central Ministry nodal officers.
        </p>
      </div>
    </div>
  );
};

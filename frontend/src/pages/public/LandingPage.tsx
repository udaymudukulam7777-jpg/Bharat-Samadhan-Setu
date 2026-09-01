import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Compass,
  MapPin,
  Award,
  Users,
  Building2,
  Briefcase,
  TrendingUp,
  Cpu,
  CheckCircle2,
  ChevronRight,
  Layers,
  Zap,
} from 'lucide-react';
import { IndiaLeafletMap } from '../../components/map/IndiaLeafletMap';
import { problemsApi, impactApi } from '../../services/api';
import { Problem } from '../../types';

export const LandingPage: React.FC = () => {
  const [featuredProblems, setFeaturedProblems] = useState<Problem[]>([]);
  const [impactStats, setImpactStats] = useState<any>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const pList = await problemsApi.list();
        setFeaturedProblems(pList.slice(0, 3));
        const imp = await impactApi.getDashboard();
        setImpactStats(imp);
      } catch (err) {
        console.error('Failed to load landing data', err);
      }
    };
    loadData();
  }, []);

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative pt-12 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center overflow-hidden">
        {/* Glow effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-emerald-500/15 blur-[120px] rounded-full pointer-events-none" />

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-6 shadow-sm">
          <Zap className="w-3.5 h-3.5 fill-emerald-400" />
          <span>Smart India Hackathon (SIH) 2026 Production-Ready Platform</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight max-w-4xl mx-auto">
          From Grassroots Problems to{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
            Verified National Impact
          </span>
        </h1>

        <p className="mt-5 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
          India's unified GovTech innovation platform connecting 28 States & 8 Union Territories with Central Ministries, premier IIT/NIT R&D labs, and CSR innovation funding.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/citizen/report"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm shadow-lg shadow-emerald-600/30 hover:scale-105 transition-all"
          >
            <span>Report a Civic Issue</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            to="/marketplace"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-800/90 hover:bg-slate-700/90 text-slate-200 font-semibold text-sm border border-slate-700 hover:border-slate-600 transition-all"
          >
            <Compass className="w-4 h-4 text-emerald-400" />
            <span>Explore National Problems</span>
          </Link>
        </div>

        {/* Live Ticker KPI Grid */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
          <div className="bg-slate-900/80 backdrop-blur-md border border-slate-800 p-4 rounded-2xl shadow-xl">
            <span className="text-xs text-slate-400 font-medium block mb-1">States Covered</span>
            <span className="text-2xl font-black text-white">28 States + 8 UTs</span>
            <span className="text-[10px] text-emerald-400 block mt-1">Pan-India Geographic Scope</span>
          </div>

          <div className="bg-slate-900/80 backdrop-blur-md border border-slate-800 p-4 rounded-2xl shadow-xl">
            <span className="text-xs text-slate-400 font-medium block mb-1">Active CSR Pool</span>
            <span className="text-2xl font-black text-emerald-400">INR 28.5 Cr</span>
            <span className="text-[10px] text-slate-400 block mt-1">Tata, Reliance & Infosys</span>
          </div>

          <div className="bg-slate-900/80 backdrop-blur-md border border-slate-800 p-4 rounded-2xl shadow-xl">
            <span className="text-xs text-slate-400 font-medium block mb-1">Premier Institutes</span>
            <span className="text-2xl font-black text-cyan-400">18+ IITs & NITs</span>
            <span className="text-[10px] text-slate-400 block mt-1">NABL Certified Labs</span>
          </div>

          <div className="bg-slate-900/80 backdrop-blur-md border border-slate-800 p-4 rounded-2xl shadow-xl">
            <span className="text-xs text-slate-400 font-medium block mb-1">Beneficiaries Served</span>
            <span className="text-2xl font-black text-amber-400">1.45M+</span>
            <span className="text-[10px] text-slate-400 block mt-1">Verified Field Deployments</span>
          </div>
        </div>
      </section>

      {/* Interactive Pan-India Leaflet GIS Heatmap */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
          <div>
            <span className="text-xs uppercase font-bold tracking-wider text-emerald-400">
              Interactive National GIS Grid
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Pan-India Innovation Heatmap
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Explore state-level problem density, priority clusters, and active hardware deployments across India.
            </p>
          </div>
          <Link
            to="/map"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300"
          >
            <span>Fullscreen National Map</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <IndiaLeafletMap height="520px" />
      </section>

      {/* 4-Tier Problem-to-Impact Architecture */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase font-bold tracking-wider text-emerald-400">
            Engineered Workflow
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            4-Tier Problem-to-Impact Lifecycle
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl relative group hover:border-slate-700 transition-colors">
            <span className="text-xs font-black text-emerald-500/80 mb-2 block">STAGE 01</span>
            <div className="w-10 h-10 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center mb-4">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-white mb-2">Multimodal Problem Intake</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Citizens submit geotagged reports with English voice transcription, photo evidence, and QR code facility presets.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl relative group hover:border-slate-700 transition-colors">
            <span className="text-xs font-black text-cyan-500/80 mb-2 block">STAGE 02</span>
            <div className="w-10 h-10 rounded-xl bg-cyan-600/20 text-cyan-400 flex items-center justify-center mb-4">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-white mb-2">AI Problem DNA Synthesis</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Extracts required R&D domains, hardware BOM footprints, constraints, and computes a 9-factor transparent priority score.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl relative group hover:border-slate-700 transition-colors">
            <span className="text-xs font-black text-purple-500/80 mb-2 block">STAGE 03</span>
            <div className="w-10 h-10 rounded-xl bg-purple-600/20 text-purple-400 flex items-center justify-center mb-4">
              <Building2 className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-white mb-2">IIT Labs & CSR Matching</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Auto-matches problems with student innovation teams, NABL testing labs (IITs/CSIR), and corporate CSR grants.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl relative group hover:border-slate-700 transition-colors">
            <span className="text-xs font-black text-amber-500/80 mb-2 block">STAGE 04</span>
            <div className="w-10 h-10 rounded-xl bg-amber-600/20 text-amber-400 flex items-center justify-center mb-4">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-white mb-2">Verified Field Impact</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Tracks 7 standard milestones with tamper-proof cryptographic proofs, government sign-off, and verified SDG impact scores.
            </p>
          </div>
        </div>
      </section>

      {/* Featured National Problem Spotlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-rose-500/20 text-rose-400 border border-rose-500/30">
                CRITICAL PRIORITY &bull; 94.5/100
              </span>
              <span className="text-xs text-slate-400 font-mono">P-JH-2026-001042</span>
            </div>
            <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" /> Deployed & Verified Impact
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              <h3 className="text-xl sm:text-2xl font-bold text-white leading-tight">
                High Groundwater Fluoride & Heavy Metal Contamination in Rural Aquifers
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Severe fluoride contamination (4.8 mg/L vs safe limit 1.0 mg/L) affecting over 12,500 villagers across 14 hamlets. Successfully solved via an off-grid 2kW solar activated-alumina filtration kiosk with live IoT telemetry by IIT Bombay & Tata Trusts.
              </p>

              <div className="grid grid-cols-3 gap-3 pt-2">
                <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/80">
                  <span className="text-[10px] text-slate-400 block">Fluoride Reduction</span>
                  <span className="text-base font-bold text-emerald-400">91.6% (0.4 mg/L)</span>
                </div>
                <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/80">
                  <span className="text-[10px] text-slate-400 block">Daily Output</span>
                  <span className="text-base font-bold text-cyan-400">4,500 L/day</span>
                </div>
                <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/80">
                  <span className="text-[10px] text-slate-400 block">Solar Uptime</span>
                  <span className="text-base font-bold text-amber-400">100% Off-Grid</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-950/60 p-5 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-4">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-2">
                  Matching Ecosystem
                </span>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between text-slate-300">
                    <span>Institute:</span>
                    <span className="font-semibold text-white">IIT Bombay</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-300">
                    <span>CSR Sponsor:</span>
                    <span className="font-semibold text-white">Tata Trusts</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-300">
                    <span>Nodal Ministry:</span>
                    <span className="font-semibold text-white">Ministry of Jal Shakti</span>
                  </div>
                </div>
              </div>

              <Link
                to="/problems/P-JH-2026-001042"
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md shadow-emerald-600/20"
              >
                <span>View Full Problem DNA</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Users, PlusCircle, Award, CheckCircle2, ArrowRight, Sparkles, Building2 } from 'lucide-react';

export const StudentDashboard: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <span className="text-xs uppercase font-bold tracking-wider text-emerald-400">
            Student Innovator Workspace
          </span>
          <h1 className="text-3xl font-extrabold text-white">Team JalSuraksha (IIT Bombay)</h1>
          <p className="text-xs text-slate-400 mt-1">
            Build cross-functional hackathon teams, propose engineering blueprints, and track 7 project milestones.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/student/team-builder"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700"
          >
            <Users className="w-4 h-4 text-emerald-400" />
            <span>Manage Team Members</span>
          </Link>
          <Link
            to="/solutions/propose"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-sm shadow-emerald-600/20"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Propose New Solution</span>
          </Link>
        </div>
      </div>

      {/* Active Project Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-emerald-400 bg-emerald-950/50 px-2.5 py-1 rounded-lg border border-emerald-800/40">
              PRJ-IND-2026-0042
            </span>
            <span className="text-xs font-bold text-amber-400 bg-amber-950/40 px-2.5 py-1 rounded-lg border border-amber-800/40">
              STAGE 7: COMMUNITY HANDOVER (100% COMPLETE)
            </span>
          </div>
          <Link
            to="/projects/PRJ-IND-2026-0042"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 hover:text-emerald-300"
          >
            <span>Open 7-Milestone Workspace</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-xl font-bold text-white leading-snug">
              Field Deployment: Solar IoT Fluoride Remediation Unit (Ward 4)
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Autonomous 2kW off-grid solar filtration kiosk with real-time LoRaWAN water quality telemetry. All 7 milestones validated by Ministry of Jal Shakti.
            </p>

            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/60">
                <span className="text-[10px] text-slate-400 block">Health Score</span>
                <span className="text-base font-bold text-emerald-400">98.5/100</span>
              </div>
              <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/60">
                <span className="text-[10px] text-slate-400 block">Milestones Completed</span>
                <span className="text-base font-bold text-cyan-400">7 of 7 Verified</span>
              </div>
              <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/60">
                <span className="text-[10px] text-slate-400 block">SLA Verification</span>
                <span className="text-base font-bold text-amber-400">Approved</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-950/60 p-5 rounded-2xl border border-slate-800 space-y-3 text-xs">
            <h4 className="font-bold text-white uppercase text-[11px] tracking-wider">
              Assigned Lab & Mentors
            </h4>
            <div className="space-y-2 text-slate-300">
              <div>
                <span className="text-slate-500 block text-[10px]">Testing Facility:</span>
                <span className="font-semibold text-white">IIT Bombay Environmental Lab</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">Scientific Advisor:</span>
                <span className="font-semibold text-white">Dr. Arvind Kumar (CSIR-NEERI)</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">CSR Sponsor:</span>
                <span className="font-semibold text-emerald-400">Tata Trusts Innovation Fund</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

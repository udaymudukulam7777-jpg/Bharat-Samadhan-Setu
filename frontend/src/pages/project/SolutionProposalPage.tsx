import React, { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { solutionsApi } from '../../services/api';
import { Send, Sparkles, ArrowLeft, Plus, Cpu, DollarSign, Clock } from 'lucide-react';

export const SolutionProposalPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const problemId = searchParams.get('problem_id') || '1';

  const [formData, setFormData] = useState({
    problem_id: Number(problemId),
    team_id: 1,
    title: '',
    executive_summary: '',
    architecture_description: '',
    tech_stack: 'ESP32, LoRaWAN, Activated Alumina Filter, FastAPI, React',
    implementation_plan: 'Phase 1: Lab Bench Testing. Phase 2: Pilot Fabrication. Phase 3: Field Deployment.',
    estimated_cost_inr: 75000,
    estimated_timeline_days: 45,
  });

  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await solutionsApi.create({
        ...formData,
        tech_stack: formData.tech_stack.split(',').map((s) => s.trim()).filter(Boolean),
      });
      navigate(`/solutions/${res.solution_code || res.id}`);
    } catch (err) {
      console.error('Failed to submit solution', err);
      alert('Failed to submit engineering blueprint.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <Link
        to={`/problems/P-JH-2026-001042`}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-emerald-400"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Problem Statement</span>
      </Link>

      <div className="border-b border-slate-800 pb-6">
        <span className="text-xs uppercase font-bold tracking-wider text-emerald-400">
          Engineering Proposal Studio
        </span>
        <h1 className="text-3xl font-extrabold text-white">Submit Solution Blueprint</h1>
        <p className="text-xs text-slate-400 mt-1">
          Propose technical architecture, Bill of Materials, and milestone roadmap for automated AI Gap Analysis.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            Solution Title / System Name *
          </label>
          <input
            type="text"
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="e.g. Solar-Powered IoT Activated-Alumina Fluoride Remediation Kiosk"
            className="w-full bg-slate-800 text-slate-200 text-xs rounded-xl px-4 py-3 border border-slate-700 focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            Executive Summary & Value Proposition *
          </label>
          <textarea
            rows={4}
            required
            value={formData.executive_summary}
            onChange={(e) => setFormData({ ...formData, executive_summary: e.target.value })}
            placeholder="Describe the engineering mechanism, filtration chemistry, off-grid power architecture, and expected output..."
            className="w-full bg-slate-800 text-slate-200 text-xs rounded-xl px-4 py-3 border border-slate-700 focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            Technical Architecture & Engineering Schematics
          </label>
          <textarea
            rows={4}
            value={formData.architecture_description}
            onChange={(e) => setFormData({ ...formData, architecture_description: e.target.value })}
            placeholder="Dual-column adsorption kinetics, pump flow rates (24V DC), MPPT solar charge controller specs..."
            className="w-full bg-slate-800 text-slate-200 text-xs rounded-xl px-4 py-3 border border-slate-700 focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-300 mb-1.5">Tech Stack & Components</label>
            <input
              type="text"
              value={formData.tech_stack}
              onChange={(e) => setFormData({ ...formData, tech_stack: e.target.value })}
              className="w-full bg-slate-800 text-slate-200 rounded-xl px-3.5 py-3 border border-slate-700 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-300 mb-1.5">Estimated Cost (INR)</label>
            <input
              type="number"
              value={formData.estimated_cost_inr}
              onChange={(e) => setFormData({ ...formData, estimated_cost_inr: Number(e.target.value) })}
              className="w-full bg-slate-800 text-slate-200 rounded-xl px-3.5 py-3 border border-slate-700 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-300 mb-1.5">Timeline (Days)</label>
            <input
              type="number"
              value={formData.estimated_timeline_days}
              onChange={(e) => setFormData({ ...formData, estimated_timeline_days: Number(e.target.value) })}
              className="w-full bg-slate-800 text-slate-200 rounded-xl px-3.5 py-3 border border-slate-700 focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/30 transition-all flex items-center justify-center gap-2"
        >
          <Send className="w-4 h-4" />
          <span>{submitting ? 'Synthesizing Solution DNA & Gap Analysis...' : 'Submit Engineering Blueprint'}</span>
        </button>
      </form>
    </div>
  );
};
